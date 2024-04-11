import { hoc } from "@/utils";
import {useStationsProps } from "./stations.props";

export const Stations = hoc(useStationsProps, ({ data }) => {
    return (
        <div>
            Stations {data}
        </div>
    )
})