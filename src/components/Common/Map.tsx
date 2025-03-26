import React from "react"
import { Box } from "@chakra-ui/react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useQuery } from "@tanstack/react-query"
import { DropOffPointsService } from "@/client"

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

const Map = ({ height = "400px", width = "100%" }: MapProps) => {
  const { data } = useQuery({
    queryKey: ["drop-off-points"],
    queryFn: () => DropOffPointsService.readDropOffPoints({ skip: 0, limit: 100 }),
  })

  const points = data?.data || []

  return (
    <Box height={height} width={width}>
      <MapContainer
        center={[48.8566, 2.3522]} // Paris coordinates
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((point) => {
          if (!point.latitude || !point.longitude) return null
          return (
            <Marker
              key={point.id}
              position={[point.latitude, point.longitude]}
            >
              <Popup>
                <div>
                  <h3>{point.title}</h3>
                  {point.description && <p>{point.description}</p>}
                  {point.address && <p>{point.address}</p>}
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </Box>
  )
}

export default Map 