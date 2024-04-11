import { hoc } from "@/utils";
import { useBalanceReplenishmentProps } from "./balance-replenishment.props";

export const BalanceReplenishement = hoc(useBalanceReplenishmentProps, ({ data }) => {
    return (
        <div>
            BalanceReplenishement {data}
        </div>
    )
})