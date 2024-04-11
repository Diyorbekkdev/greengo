
import { useFetchQuery } from "@/hooks";
import { httpClient } from "@/utils";
import { PushpinOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useAvailableAreasProps = () => {
  const [isDrawingPolygon, setIsDrawingPolygon] = useState(false);
  const [selectedLocationCordinates, setSelectedLocationCordinates] = useState<any>();
  const [selectedLocation, setSelectedLocation] = useState<any>([])
  const loation = useLocation()
  const { data, isLoading, refetch } = useFetchQuery({
    url: 'region',
    params: {
      all: true,
      withDelete: true,
    }
  })
  console.log(selectedLocation);
  const formattedCoordinatesArray = selectedLocation.map(function(coordinates) {
    return coordinates.map(function(coord) {
      return '(' + coord[1] + ',' + coord[0] + ')';
    }).join(',');
  });
  const handleAdd = () => {
    Modal.confirm({
      title: 'Are you sure you want to select this region ?',
      icon: <PushpinOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await httpClient.post(`region/available/`, {
            "coordinates": [
              ...formattedCoordinatesArray
            ],
            "isActive": true,
            "regionId": 4
          });
          message.success('Region selected  successfully');
          refetch();
        } catch (error) {
          message.error('Failed to selecting region');
        }
      },
    });
  }

  const draw = (ref: any) => {
    const coordinates: any[] = [];
    ref.editor.startDrawing();
    // ref.editor.events.add(["vertexadd", "vertexdragend", "vertexdraw", "dragend"], (event: any) => {
    //   console.log("sdsd", event.originalEvent.target.geometry.getCoordinates()[0]);
    // });
    ref.editor.events.add("vertexadd", (event: any) => {
      const vertexCoordinates = event.originalEvent.target.geometry.getCoordinates()[0];
      coordinates.push(vertexCoordinates);
    });
    ref.editor.events.add("drawingstop", () => {
      setSelectedLocation(coordinates);
      if (selectedLocation?.length >= 5) {
        handleAdd()
      }
    });
  };

  const selectOptions = data?.map((item: any) => {
    return {
      value: item?.location?.longitude + '-' + item?.location?.latitude,
      label: item?.name,
    };
  })

  useEffect(() => {
    const selectedLocationCordinates = loation?.search?.split('=')?.[1]?.split('-')?.map((item: any) => {
      return parseFloat(item);
    });
    setSelectedLocationCordinates(selectedLocationCordinates)
  }, [loation?.search])


  const dashboardProps = {
    data,
    draw,
    isDrawingPolygon,
    setIsDrawingPolygon,
    isLoading,
    refetch,
    selectOptions,
    selectedLocationCordinates,
  };

  return dashboardProps;
}