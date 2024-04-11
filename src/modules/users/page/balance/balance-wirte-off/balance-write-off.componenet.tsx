import { hoc } from "@/utils";
import {useBalanceWriteOffProps } from "./balance-write-off.props";

export const BalanceWriteOff= hoc(useBalanceWriteOffProps, ({ data }) => {
    return (
        <div>
            BalanceWriteOff {data}
        </div>
    )
})