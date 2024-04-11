import { useFetchQuery, useRouterQuery } from "@/hooks";
import { Avatar, Modal, TableProps, Tag, message } from "antd";
import { AntDesignOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

import { httpClient } from "@/utils";
import { useState } from "react";
import { CustomDropdown } from "../components";
import { ICategory } from "../model";
import { useNavigate } from "react-router-dom";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export const useCategoryProps = () => {
  const { GetRouterQuery, SetRouterQuery } = useRouterQuery();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useFetchQuery({
    url: 'category',
    params: {
      pageSize: 8,
      ...GetRouterQuery(),
    }
  })
  const [open, setOpen] = useState(false);
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
      title: 'Category Image',
      dataIndex: 'image',
      key: 'image',
      render: () => {
        return <Avatar size="large" icon={<AntDesignOutlined />} />
      }

    },
    {
      title: 'Category Name',
      dataIndex: 'nameUz',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
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
  return {
    columns,
    data,
    isLoading,
    refetch,
    open,
    setOpen,
    values,
    onAdd,
    GetRouterQuery,
    SetRouterQuery
  };
}