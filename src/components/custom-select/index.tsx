import { Select } from 'antd';
import { get, isFunction, truncate } from 'lodash';
import { ControlError } from '..';
import { useState } from 'react';
import { httpClient } from '@/utils';

const { Option } = Select;

interface MainSelectProps {
  label: string;
  field: any;
  form: any;
  placeholder: string;
  options: { value: string; label: string }[];
  size?: 'large' | 'small' | 'middle';
  labelClass?: string;
  url: string;
  params?: any;
}

export const MainSelect = (props: MainSelectProps) => {
  const { url, params, label, field, form, placeholder, options, size = 'large', labelClass } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [focused, setFocused] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await httpClient({
        method: "GET",
        url,
        params: params
          ? { page: 1, pageSize: 1000, ...params }
          : { page: 1, pageSize: 1000 },
      });
      if (data) {
        if(url === 'locker/simcard/'){
          const newData = data?.simcards?.map((item) => ({
            value: item.id,
            label: truncate(item?.simcard || item?.simcard, {
              length: 30,
              omission: "...",
            }),
          }));
          setData(newData);
        }else{
          const newData = data.map((item) => ({
            value: item.id,
            label: truncate(item?.name || item?.simcard, {
              length: 30,
              omission: "...",
            }),
          }));
          setData(newData);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleFocus = () => {
    setFocused(true);
    if (!data.length && url) {
      fetchData();
    }
  };
  const handleChange = (option) => {
    form?.setFieldValue(field?.name, option);
    console.log("sefsef",option);
    // isFunction(getSelected) && getSelected(option || field?.value);
  };

  console.log(data);

  return (
    <div style={{ marginTop: '8px', width: '100%' }}>
      <label className={`label ${labelClass} ${get(form.touched, field.name) && get(form.errors, field.name) ? 'invalid_style' : ''}`}>{label}</label>
      <div style={{ marginTop: '5px' }} className={`input-container ${get(form.touched, field.name) && get(form.errors, field.name) ? 'shake' : ''}`}>
        <Select
          {...field}
          value={field?.value}
          loading={loading}
          size={size}
          allowClear
          onBlur={() => setFocused(false)}
          fieldNames={field?.name}
          placeholder={placeholder}
          onFocus={handleFocus}
          style={{
            borderColor: `${get(form.touched, field.name) && get(form.errors, field.name) && 'red'}`,
            width: '100%'
          }}
          onChange={handleChange}
          options={data}
        />

      </div>
      <ControlError form={form} field={field} />
    </div>
  );
};