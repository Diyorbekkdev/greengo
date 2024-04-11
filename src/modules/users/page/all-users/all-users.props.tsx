import { useFetchQuery, useRouterQuery } from "@/hooks";
import { Avatar, Button, message, Modal, Select, TableProps, Tag } from "antd";
import dayjs from "dayjs";
import { AntDesignOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { IAnswerCategories } from "@/modules/answer-category/model/answer-categories.model.ts";
import { httpClient } from "@/utils";
import { useState } from "react";
import { Typography } from 'antd';
import { priceFormat } from "@/utils/price-format";
const { Option } = Select;
const { Paragraph,  } = Typography;
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const useAllUserProps = () => {
  const {GetRouterQuery, SetRouterQuery} = useRouterQuery();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<IAnswerCategories>();
  const {data, isLoading, refetch} = useFetchQuery({
    url: 'user'
  });
  const onAdd = () => {
    setOpen(true);
    setValues(undefined)
  }
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      icon: <DeleteOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await httpClient.delete(`user/${id}`);
          message.success('User deleted successfully');
          setOpen(false);
          refetch();
        } catch (error) {
          message.error('Failed to delete user');
        }finally {
          setOpen(false);
        }
      },
    });
  };
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (data)=> {
        return <Paragraph copyable className='font-bold'>{data}</Paragraph>
      }
    },
    {
      title: 'User Image',
      dataIndex: 'image',
      key: 'image',
      render: () => {
        return <Avatar size="large" icon={<AntDesignOutlined />} />
      }

    },
    {
      title: 'User name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (data)=> {
        return <Tag color='green'>{priceFormat(data)} som</Tag>
      }
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Booked Count',
      dataIndex: 'bookedCount',
      key: 'bookedCount',
    },
    {
      title: 'User Banned',
      dataIndex: '',
      key: 'isBanned',
      render: (data)=> {
        const handleChange = async (value: boolean | string) => {
              try {
                  if(value){
                    await httpClient.put(`user/ban/${data?.id}`);
                    message.success('User banned')
                  }else{
                    await httpClient.put(`user/deban/${data?.id}`)
                    message.success('User debanned')
                  }
                refetch()
              }catch (err) {
                console.log(err)
              }
        };

        return (
          <Select  defaultValue={data?.isBanned ? "Banned" : "Not banned"} style={{ width: 120, }} onChange={handleChange}>
            <Option value={true}>Banned</Option>
            <Option value={false}>Not Banned</Option>
          </Select>
        );
      }
    },
    {
      title: 'Status',
      key: 'status',
      render: (data) => {
        return (
          <div>
            <Tag color={data?.isActive ? 'green' : 'red'}>{data?.isActive ? 'Active' : "No Active"}</Tag>
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
            <div className='flex items-center gap-2'>
              {/*<CustomDropdown*/}
              {/*  onClickEdit={() =>{}}*/}
              {/*  onClickDelete={() => {}}*/}
              {/*  onClickInfo={() => {}}*/}
              {/*/>*/}
              <Button onClick={() => {}} icon={<EyeOutlined/>}>See rides histroy</Button>
              <Button onClick={() => handleDelete(data?.id)} danger icon={<DeleteOutlined/>}>Delete</Button>
            </div>
          </div>
        )
      }
    },
  ];
  return {
    data,
    isLoading,
    GetRouterQuery,
    SetRouterQuery,
    columns,
    refetch,
    open,
    setOpen,
    values,
    setValues,
    onAdd,
    handleDelete,
  }
}

export  default  useAllUserProps;