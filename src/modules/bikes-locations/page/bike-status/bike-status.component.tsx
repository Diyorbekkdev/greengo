import { hoc } from "@/utils";
import { useBikeStatusProps } from "./bike-status.props";

export const BikeStatus = hoc(useBikeStatusProps, ({data})=> {
    return (
        <div>
            BikeStatus {data}
        </div>
    )
})