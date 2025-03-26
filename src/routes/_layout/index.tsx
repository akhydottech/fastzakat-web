import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import useAuth from "@/hooks/useAuth"
import 'leaflet/dist/leaflet.css'
import { DropOffPointsService } from "@/client/sdk.gen"
import { useQuery } from "@tanstack/react-query"
import { DropOffPointPublic } from "@/client"
import { LatLngExpression } from "leaflet"
import { useEffect } from "react"
import { ItemActionsMenu } from "@/components/Common/ItemActionsMenu"
import AddDropOffPoint from "@/components/drop-off-points/AddDropOffPoint"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})


function getItemsQueryOptions() {
  return {
    queryFn: () =>
      DropOffPointsService.readDropOffPoints({ use_pagination: false }),
    queryKey: ["items"],
  }
}

function getCenter(items: DropOffPointPublic[]): LatLngExpression {
  // Default center if no valid items
  const defaultCenter: LatLngExpression = [48.859, 2.347]; // Paris coordinates as fallback
  
  console.log("Items received:", items);
  
  // Filter items with valid coordinates
  const validItems = items.filter(item => 
    typeof item.latitude === 'number' && 
    !isNaN(item.latitude) && 
    typeof item.longitude === 'number' && 
    !isNaN(item.longitude)
  );
  
  console.log("Valid items:", validItems);
  
  if (validItems.length === 0) {
    console.log("No valid items found, using default center");
    return defaultCenter;
  }
  
  // Calculate the average of valid coordinates
  const sum = validItems.reduce((acc, item) => {
    return {
      latitude: acc.latitude + item.latitude,
      longitude: acc.longitude + item.longitude,
    };
  }, { latitude: 0, longitude: 0 });
  
  const center: LatLngExpression = [sum.latitude / validItems.length, sum.longitude / validItems.length];
  console.log("Calculated center:", center);
  return center;
}

// New component to handle center updates
function MapUpdater({ center, markers }: { center: LatLngExpression, markers: DropOffPointPublic[] }) {
  const map = useMap()
  
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = markers.map(marker => [marker.latitude, marker.longitude] as [number, number])
      map.fitBounds(bounds, { padding: [50, 50] })
    } else {
      map.setView(center)
    }
  }, [center, map, markers])
  
  return null
}

function Dashboard() {
  const { user: currentUser } = useAuth()
  const { data, isLoading } = useQuery({
    ...getItemsQueryOptions(),
    placeholderData: (prevData) => prevData,
  })

  // Safely get map center
  const mapCenter = data?.data && data.data.length > 0 
    ? getCenter(data.data) 
    : [48.859, 2.347] as LatLngExpression;

  // Filter valid markers
  const validMarkers = data?.data?.filter(item => 
    typeof item.latitude === 'number' && 
    !isNaN(item.latitude) && 
    typeof item.longitude === 'number' && 
    !isNaN(item.longitude)
  ) || [];

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontSize="2xl" truncate maxW="sm">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text>Welcome back, nice to see you again!</Text>
        </Box>

        <AddDropOffPoint />
        <Box height="600px" width="100%">
          <MapContainer 
            center={mapCenter} 
            zoom={13} 
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <MapUpdater center={mapCenter} markers={validMarkers} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {validMarkers.map(item => (
              <Marker key={item.id} position={[item.latitude, item.longitude]}>
                <Popup>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Text>{item.title}</Text>
                    <ItemActionsMenu item={item} />
                  </Box>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>

      </Container>
    </>
  )
}
