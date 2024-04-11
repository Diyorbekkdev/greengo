import { useState } from "react";

export const useBalanceWriteOffProps = () => {
    const [data, setData] = useState()

  const dashboardProps = {
    data,
    setData,
  };

  return dashboardProps;
}