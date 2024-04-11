import {
    AppstoreOutlined
} from '@ant-design/icons';
import { BikeAlarmHistory, BikeCommands, BikeStatus } from './page';

export const bikesMonitoringRoutes = [
    {
        key: "/bikes-location",
        Element: BikeStatus,
        label: "Bikes Location",
        icon: AppstoreOutlined,
        children: [
            {
                key: "/bikes-status",
                Element: BikeStatus,
                label: "Bikes Stat",
                icon: AppstoreOutlined,
                children: [],
                visible: true,
                access: "main",
            },
            {
                key: "/bikes-commands",
                Element: BikeCommands,
                label: "Bikes Commands",
                icon: AppstoreOutlined,
                children: [],
                visible: true,
                access: "main",
            },
            {
                key: "/bikes-alarm-history",
                Element: BikeAlarmHistory,
                label: "Bikes Alarm History",
                icon: AppstoreOutlined,
                children: [],
                visible: true,
                access: "main",
            },
        ],
        visible: true,
        access: "main",
    },
];
