import { useFetchQuery } from "@/hooks";
import { httpClient } from "@/utils";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import axios from "axios";
import { useState } from "react"

export const useRegionsProps = () => {
    const [selectedPlace, setSelectedPlace] = useState<number[] | null>(null);
    const [location, setLocation] = useState('');
    const [open, setOpen] = useState(false);
    const [showSlectedRegions, setShowSlectedRegions] = useState(false);
    const [values, setValues] = useState({
        name: '',
        isActive: true,
        lat: 0,
        long: 0,
    })
    const handlePlaceClick = async (e: any) => {
        const coordinates = e.get('coords');
        setSelectedPlace(coordinates);
        setValues({ ...values, lat: coordinates[0], long: coordinates[1] })

        const geocodeUrl = 'https://geocode-maps.yandex.ru/1.x/';
        const params = {
            format: 'json',
            apikey: import.meta.env.VITE_APP_YANDEX_KEY,
            sco: 'latlong',
            lang: 'ru-RU',
            results: 1,
            ll: coordinates.join(','),
            geocode: coordinates.join(','),
        };

        try {
            const response = await axios.get(geocodeUrl, { params });
            const placeName = response.data.response.GeoObjectCollection['featureMember'][0].GeoObject.name;
            setLocation(placeName);
            setValues({ ...values, name: placeName, lat: coordinates[0], long: coordinates[1] });
            message.success(`Ты выбираешь ${placeName}!`);
            setOpen(true);
        } catch (error) {
            message.error('Error fetching place name:');
        }
    };
    
    const { data, isLoading, refetch } = useFetchQuery({
        url: 'region',
        params: {
            all: true,
            withDelete: true,
        }
    })
    const onEdit = (values: any) => {
        setValues(values);
        setOpen(true);
    }
    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this region ?',
            icon: <DeleteOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await httpClient.delete(`region/${id}`);
                    message.success('Regioin deleted successfully');
                    refetch();
                } catch (error) {
                    message.error('Failed to delete regioin');
                }
            },
        });
    };

    return {
        data,
        selectedPlace,
        location,
        handlePlaceClick,
        values,
        setValues,
        open,
        setOpen,
        isLoading,
        showSlectedRegions,
        setShowSlectedRegions,
        handleDelete,
        onEdit,
        refetch,
    }
}