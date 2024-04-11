import { Header } from "@/components"
import { hoc } from "@/utils"
import { useRegionsProps } from "./regions.props"
import { GeoObject, Map, Placemark, YMaps, ZoomControl } from "@pbe/react-yandex-maps"
import { RegionModal } from "../../components/region-modal"
import { Drawer, Empty } from "antd"
import RegionCards from "../../components/region-cards"
import { EyeOutlined } from "@ant-design/icons"

const Regions = hoc(useRegionsProps, ({ data, handlePlaceClick, selectedPlace, values, open, setOpen, showSlectedRegions,
    setShowSlectedRegions, handleDelete,
    }) => {

    return (
        <div>
            <Header title="Region" icon={<EyeOutlined />} buttonText="See selected locations" type="primary" onAdd={() => setShowSlectedRegions(true)} />
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
                                height: "78vh",
                            }}
                            defaultState={{ center: [41.2995, 69.2401], zoom: 9 }}
                            modules={['control.ZoomControl', 'control.SearchControl']}
                            onClick={handlePlaceClick}
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
                            {selectedPlace && <Placemark geometry={selectedPlace} />}
                            <RegionModal modalTitle="Create Region" values={values} url="/region/" open={open} onClose={() => setOpen(false)} />
                            <Drawer
                                title="Selected Locations"
                                placement="right"
                                closable={true}
                                onClose={() => setShowSlectedRegions(false)}
                                visible={showSlectedRegions}
                                key="right"
                            >
                                {data?.map((el: any) => (
                                    <RegionCards key={el?.id} {...el} handleDelete={handleDelete} />
                                ))}
                                {data?.length === 0 && <div className="text-center"><Empty /></div>}
                            </Drawer>
                        </Map>
                    </div>
                </YMaps>
            </div>
        </div>
    )
})

export default Regions