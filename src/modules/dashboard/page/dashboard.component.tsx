import { hoc } from "@/utils";
import { useDashboardProps } from "./dashboard.props";
import { Card, Image, Select, Tag } from "antd";
import { bicycle, settings } from "@/assets";
import { GeoObject, Map, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import CountUp from "react-countup";

export const Dashboard = hoc(useDashboardProps, ({selectOptions, SetRouterQuery, GetRouterQuery, data})=> {

    return (
        <div>
            <div className='content_wrapper'>
                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between gap-2 items-center'>
                    <div className='w-full border rounded-md p-4 gap-4 flex flex-col justify-center  items-center'>
                         <span className='font-bold'>
                            Active
                         </span>
                        <div className='rounded-full w-10 h-10 flex items-center bg-green justify-center'>
                          <Image  src={bicycle} alt='icons'/>
                        </div>
                      <span className='font-bold text-lg'><CountUp duration={5} end={data?.activeCount}/></span>
                      </div>
                    <div className='w-full border rounded-md p-4 gap-4 flex flex-col justify-center  items-center'>
                         <span className='font-bold'>
                            On repair
                         </span>
                      <div className='rounded-full w-10 h-10 flex items-center bg-amber-400 justify-center'>
                        <Image  src={settings} alt='icons'/>
                      </div>
                      <span className='font-bold text-lg'><CountUp duration={5} end={data?.onRepair}/></span>
                    </div>
                    <div className='w-full border rounded-md p-4 gap-4 flex flex-col justify-center  items-center'>
                         <span className='font-bold'>
                            In trip
                         </span>
                      <div className='rounded-full w-10 h-10 flex items-center bg-purple-600 justify-center'>
                        <Image  src={bicycle} alt='icons'/>
                      </div>
                      <span className='font-bold text-lg'><CountUp duration={5} end={data?.inTrip}/></span>
                    </div>
                    <div className='w-full border rounded-md p-4 gap-4 flex flex-col justify-center  items-center'>
                         <span className='font-bold'>
                            Maintenance
                         </span>
                      <div className='rounded-full w-10 h-10 flex items-center bg-green justify-center'>
                        <Image  src={bicycle} alt='icons'/>
                      </div>
                      <span className='font-bold text-lg'><CountUp duration={5} end={data?.maintenance}/></span>
                    </div>
                    <div className='w-full border rounded-md p-4 gap-4 flex flex-col justify-center  items-center'>
                         <span className='font-bold'>
                            Out of zone
                         </span>
                      <div className='rounded-full w-10 h-10 flex items-center bg-cyan-400 justify-center'>
                        <Image  src={bicycle} alt='icons'/>
                      </div>
                      <span className='font-bold text-lg'><CountUp duration={5} end={data?.outOfZone}/></span>
                    </div>
                  </div>
                  <div>
                    <YMaps
                      query={{
                        load: "package.full",
                        apikey: import.meta.env.VITE_APP_YANDEX_KEY
                      }}
                    >
                      <div className="w-full shadow-md rounded-md">
                        <Map
                          style={{
                            width: "100%",
                            height: "64vh",
                          }}
                          defaultState={{ center: [41.2995, 69.2401], zoom: 9 }}
                          modules={['control.ZoomControl', 'control.SearchControl']}
                          // onClick={handlePlaceClick}
                          className="main__map"

                        >
                          <GeoObject
                            geometry={{
                              type: 'Point',
                              coordinates: [59.22, 39.89]
                            }}
                            options={{
                              preset: 'islands#blueDotIcon'
                            }}
                          />

                          <ZoomControl />
                          {/*{selectedPlace && <Placemark geometry={selectedPlace} />}*/}
                        </Map>
                      </div>
                    </YMaps>
                  </div>
                </div>
                 <div className='flex flex-col gap-2'>
                    <div className='w-full shadow p-4 rounded'>
                        <Select showSearch={true} className='w-full'
                                onChange={(value) => {
                          if(value){
                              SetRouterQuery({...GetRouterQuery, regionId: value})

                          }else{
                             SetRouterQuery({...GetRouterQuery, regionId: ''})

                          }
                        }} defaultValue={selectOptions?.[0]} options={selectOptions}/>
                    </div>
                    <div className='shadow p-4 flex flex-col gap-2 overflow-y-scroll forscroll max-h-[76vh]'>
                      <span className='font-semibold'>Bicycles QR codes</span>
                      {
                        data?.bicycles?.map((el: any)=> (
                          <Card className='p-0 flex justify-between'>
                            <Tag color='green'>{el?.number}</Tag>
                            <Tag color='green'>{el?.qrCode}</Tag>
                          </Card>
                        ))
                      }
                    </div>
                 </div>
            </div>

        </div>
    )
})