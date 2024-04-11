import { hoc } from "@/utils";
import { useOffertaProps } from "./public-offerta.props";
import { Header } from "@/components";

export const PublicOfferta = hoc(useOffertaProps, ({data})=> {
    return (
        <div>
            <Header title="Public Offerta" buttonText="Add Offerta" type="primary"/>
        </div>
    )
})