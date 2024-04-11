import { useAvailableAreasProps } from "@/modules/region/page/available-areas/available-areas.props.tsx";
import { useFetchQuery, useRouterQuery } from "@/hooks";
import { useLocation,  } from "react-router-dom";

export const useDashboardProps = () => {
  const {GetRouterQuery, SetRouterQuery} = useRouterQuery();
  const {search} = useLocation();
  console.log(search?.split('=')?.[1]);
  const { data: regionsData, isLoading, refetch } = useFetchQuery({
    url: 'region',
    params: {
      all: true,
      withDelete: true
    }
  })
  const selectOptions = regionsData?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  })
  const {data } = useFetchQuery({
    url: '/bicycle/report/',
    params: {
      regionId: search?.split('=')?.[1] ?? regionsData?.[0]?.id,
      ...GetRouterQuery()
    }
  })
  console.log(data);
  return {
      selectOptions,
      GetRouterQuery,
      SetRouterQuery,
      data
  };
}