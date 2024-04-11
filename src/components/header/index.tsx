import { Button, Select } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons';
import { ReactNode } from "react";
import { useRouterQuery } from "@/hooks";

interface IHeader {
    title: string;
    buttonText?: string;
    onAdd?: () => void;
    icon?: ReactNode;
    type: 'primary' | 'default' | 'dashed' | 'link' | 'text' | undefined;
    isSelect?: boolean;
    options?: any[];
    isLoading?: boolean;
    isButton?: boolean;
    placeholder?: string;
    filterType?: string;
}

export const Header = (props: IHeader) => {
    const { title, isSelect, options, isLoading, buttonText, type, icon, placeholder, filterType = <PlusCircleOutlined />, onAdd, isButton=true } = props;
    const {GetRouterQuery, SetRouterQuery} = useRouterQuery();
    return (
        <div className="flex items-center justify-between shadow-lg p-4 rounded-md">
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="flex items-center gap-3">
                {isSelect && <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder={placeholder}
                    optionFilterProp="children"
                    allowClear
                    loading={isLoading}
                    onChange={(value) => {
                        if(value){
                            filterType ?  SetRouterQuery({...GetRouterQuery, userId: value}) :  SetRouterQuery({...GetRouterQuery, region: value})

                        }else{
                            filterType ? SetRouterQuery({...GetRouterQuery, userId: ''}) : SetRouterQuery({...GetRouterQuery, region: ''})

                        }
                    }}
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    options={options || []}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    } />}

                {isButton && <Button onClick={onAdd} icon={icon} type={type}>{buttonText}</Button>}
            </div>
        </div >
    )
}