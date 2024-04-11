import { useState } from "react";

export const useStationsProps = () => {
    const [data, setData] = useState()

  const dashboardProps = {
    data,
    setData,
  };

  return dashboardProps;
}