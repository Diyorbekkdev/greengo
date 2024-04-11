import { hoc } from "@/utils";
import { useAvailableAreasProps } from "./available-areas.props";
import { GeoObject, Map, Placemark, Polygon, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import { Header } from "@/components";
import { EditOutlined, FundOutlined } from "@ant-design/icons";



export const AvailableAreas = hoc(useAvailableAreasProps, ({ draw, isDrawingPolygon,
    setIsDrawingPolygon, selectOptions, isLoading, selectedLocationCordinates }) => {


    return (
        <div>
            <Header title="Available Areas" isSelect={true} placeholder={'Select region'} options={selectOptions} isLoading={isLoading} buttonText="Start Draw polygon" icon={isDrawingPolygon ? <FundOutlined /> : <EditOutlined />} onAdd={() => setIsDrawingPolygon(!isDrawingPolygon)} type="primary" />
            <div className="w-full h-full shadow-md mt-2">
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
                                height: "88vh",
                            }}
                            state={{ center: selectedLocationCordinates ?? [41.2995, 69.2401], zoom: 13 }}
                            defaultState={{ center: [41.2995, 69.2401], zoom: 10 }}
                            modules={['control.ZoomControl', 'control.SearchControl', "geoObject.addon.editor"]}
                            className="main__map"
                        >
                            {isDrawingPolygon && <Polygon
                                instanceRef={(ref) => ref && draw(ref)}

                                geometry={{
                                  type: 'Polygon',
                                  coordinates: [[
                                    [41.33465829343607, 69.23117089814596],
                                    [41.32171857468269, 69.2593233639663],
                                    [41.30579916959414, 69.24009728974754],
                                    [41.31524774432625, 69.21348977631982],
                                    [41.33465829343607, 69.23117089814596]
                                  ]]
                                }}

                                options={{
                                    editorDrawingCursor: "crosshair",
                                    editorMaxPoints: 5,
                                    openHintOnHover: true,
                                    fillColor: "rgba(255, 0, 0, 0.149)",
                                    strokeColor: "#FF0000",
                                    strokeOpacity: 0.8,
                                    strokeWidth: 3,
                                    draggable: true
                                }}
                            />}
                            <GeoObject
                                geometry={{
                                    type: 'Point',
                                    coordinates: selectedLocationCordinates,
                                }}
                                options={{
                                    preset: 'islands#blueDotIcon'
                                }}

                            />
                            <ZoomControl />
                            {selectedLocationCordinates ?? <Placemark geometry={selectedLocationCordinates} />}
                        </Map>
                    </div>
                </YMaps>
            </div>
        </div>
    )
})