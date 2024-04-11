import { useState } from "react";

export const useBalanceReplenishmentProps = () => {
    const [data, setData] = useState()

  const dashboardProps = {
    data,
    setData,
  };

  return dashboardProps;
}