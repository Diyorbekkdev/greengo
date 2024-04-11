import { useState } from "react";

export const useProhibitedAreasProps = () => {
    const [data, setData] = useState()

  const dashboardProps = {
    data,
    setData,
  };

  return dashboardProps;
}