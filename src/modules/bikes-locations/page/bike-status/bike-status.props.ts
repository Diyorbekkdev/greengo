import { useState } from "react";

export const useBikeStatusProps = () => {
    const [data, setData] = useState()

  const dashboardProps = {
    data,
    setData,
  };

  return dashboardProps;
}