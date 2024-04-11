import { useFetchQuery, useRouterQuery } from "@/hooks";
import { Modal, TableProps, Tag, message } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  DeleteOutlined } from '@ant-design/icons';
import { ICategory } from "../../model";
import { httpClient } from "@/utils";
import { CustomDropdown } from "../../components";
import dayjs from "dayjs";


interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}
export const useBicycleProps = () => {
    const { GetRouterQuery, SetRouterQuery } = useRouterQuery();
    const {slug} = useParams();
    const navigate = useNavigate();
    console.log(slug);
    
    const { data, isLoading, refetch } = useFetchQuery({
        url: 'bicycle',
        params: {
            categoryId: slug,
            pageSize: 8,
            ...GetRouterQuery(),
        }
    })
    const [open, setOpen] = useState<boolean>(false);
    const [values, setValues] = useState<ICategory>();
    const onEdit = (values: ICategory) => {
        setValues(values);
        setOpen(true);
    }
    const handleDelete = (categoryId: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this category ?',
            icon: <DeleteOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await httpClient.delete(`category/${categoryId}`);
                    message.success('Category deleted successfully');
                    refetch();
                } catch (error) {
                    message.error('Failed to delete category');
                }
            },
        });
    };
    const onAdd = () => {
        setOpen(true);
        setValues(undefined)

       
    }
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Bicycle number',
            dataIndex: 'number',
            key: 'number',
            render: (data) => {
                return <Tag color="green">{data}</Tag>
            }
        },
        {
            title: 'Region',
            dataIndex: 'region',
            key: 'region',
            render: (data)=> {
                return <span>{data?.name}</span>
            }
        },
        {
            title: 'Locker',
            dataIndex: 'locker',
            key: 'locker',
        },
        {
            title: 'Status',
            key: 'status',
            render: (data) => {
                return (
                    <div>
                        <Tag color={data?.isActive ? 'green' : 'red'}>{data?.isActive ? 'Active' : "Deleted"}</Tag>
                    </div>
                )
            }
        },
        {
            title: 'Created Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => {
                return dayjs(date).format('YYYY-MM-DD, HH:mm')
            }
        },
        {
            title: 'Updated Date',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (date) => {
                return date ? dayjs(date).format('YYYY-MM-DD, HH:mm') : 'Not updated yet'
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (data) => {
                return (
                    <div>
                        <div style={{ textAlign: "center" }}>
                            <CustomDropdown
                                onClickEdit={() => onEdit(data)}
                                onClickDelete={() => handleDelete(data?.id)}
                                onClickInfo={() => navigate(`/category/${data?.id}`)}
                            />
                        </div>
                    </div>
                )
            }
        },
    ]

    const {data: regions, isLoading:regioinLoading} = useFetchQuery({
        url: 'region'
    })
    const regionsData = regions?.map((el: any)=> {
        return {
            values: el?.id,
            lable: el?.name
        }
    })
    console.log(regionsData, isLoading);
    
    return {
        data,
        isLoading,
        refetch,
        open,
        setOpen,
        values,
        onAdd,
        SetRouterQuery,
        GetRouterQuery,
        columns,
        slug,
        regionsData,
        regioinLoading
    }
}