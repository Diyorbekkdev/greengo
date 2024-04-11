import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import dayjs from "dayjs";
interface IRegionCards {
    id: number;
    name: string;
    location: {
        "longitude": number,
        "latitude": number,
    };
    createdAt: string,
    handleDelete: (id: number) => void;
}
const RegionCards = ({ id, name, location, createdAt, handleDelete }: IRegionCards) => {
    return (
        <Card
            className="w-full shadow-md mt-2"
            actions={[
                <DeleteOutlined key="setting" onClick={() => handleDelete(id)} />,
                <EditOutlined key="edit" />,
            ]}
        >
            <h3 className="text-lg">{name}</h3>
            <div className="flex items-center  justify-between mt-4">
                <span className="font-semibold">Cordinates:</span>
                <span className="text-blue">{location?.longitude}, {location?.latitude}</span>
            </div>
            <div className="flex items-center  justify-between mt-4">
                <span className="font-semibold">Created At:</span>
                <span className="text-dark-blue italic">{dayjs(createdAt).format('YYYY-MM-DD, HH:mm')}</span>
            </div>
        </Card>
    )
}

export default RegionCards;