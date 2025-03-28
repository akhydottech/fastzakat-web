import { Box } from "@chakra-ui/react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { DropOffPointsService, UserPublic } from "@/client"
import { DropOffPointPublic } from "@/client"
import { LatLngExpression } from "leaflet"
import { useEffect } from "react"
import DeleteDropOffPoint from "../drop-off-points/DeleteDropOffPoint"
import EditDropOffPoint from "../drop-off-points/EditDropOffPoint"

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/assets/images/marker-icon-2x.png",
  iconUrl: "/assets/images/marker-icon.png",
  shadowUrl: "/assets/images/marker-shadow.png",
})

interface MapProps {
  height?: string
  width?: string
}

function getCenter(items: DropOffPointPublic[]): LatLngExpression {
  const defaultCenter: LatLngExpression = [48.859, 2.347] // Paris coordinates as fallback
  
  const validItems = items.filter(item => 
    typeof item.latitude === 'number' && 
    !isNaN(item.latitude) && 
    typeof item.longitude === 'number' && 
    !isNaN(item.longitude)
  )
  
  if (validItems.length === 0) {
    return defaultCenter
  }
  
  const sum = validItems.reduce((acc, item) => {
    return {
      latitude: acc.latitude + (item.latitude || 0),
      longitude: acc.longitude + (item.longitude || 0),
    }
  }, { latitude: 0, longitude: 0 })
  
  return [sum.latitude / validItems.length, sum.longitude / validItems.length]
}

function MapUpdater({ center, markers }: { center: LatLngExpression, markers: DropOffPointPublic[] }) {
  const map = useMap()
  
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = markers
        .filter(marker => typeof marker.latitude === 'number' && typeof marker.longitude === 'number')
        .map(marker => [marker.latitude, marker.longitude] as [number, number])
      map.fitBounds(bounds, { padding: [50, 50] })
    } else {
      map.setView(center)
    }
  }, [center, map, markers])
  
  return null
}

const Map = ({ height = "400px", width = "100%" }: MapProps) => {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])

  const { data } = useQuery({
    queryKey: ["drop-off-points"],
    queryFn: () => DropOffPointsService.readDropOffPoints({ usePagination: false }),
  })

  const points = data?.data || []
  const validMarkers = points.filter(item => 
    typeof item.latitude === 'number' && 
    !isNaN(item.latitude) && 
    typeof item.longitude === 'number' && 
    !isNaN(item.longitude)
  )

  const mapCenter = points.length > 0 ? getCenter(points) : [48.859, 2.347] as LatLngExpression

  return (
    <Box height={height} width={width}>
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <MapUpdater center={mapCenter} markers={validMarkers} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {validMarkers.map((point) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
          >
            <Popup>
              <div>
                <h3>{point.title}</h3>
                {point.description && <p>{point.description}</p>}
                {point.address && <p>{point.address}</p>}
                {
                  currentUser?.id === point.owner_id && (
                    <>
                      <EditDropOffPoint item={point} />
                      <DeleteDropOffPoint id={point.id} />
                    </>
                  )
                }
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  )
}

export default Map 