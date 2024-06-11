import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Text } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Function to generate random coordinates within Oslo's latitude and longitude boundaries
const generateRandomCoordinates = () => {
  const minLat = 59.8;
  const maxLat = 60.1;
  const minLng = 10.5;
  const maxLng = 10.9;
  const lat = Math.random() * (maxLat - minLat) + minLat;
  const lng = Math.random() * (maxLng - minLng) + minLng;
  return [lat, lng];
};

// Generate 10 random building locations
const buildingLocations = Array.from({ length: 10 }, generateRandomCoordinates);

// Custom pin icon
const pinIcon = new L.Icon({
  iconUrl: require('../assets/pin-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Index = () => {
  return (
    <MapContainer center={[59.9139, 10.7522]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {buildingLocations.map((position, idx) => (
        <Marker key={idx} position={position} icon={pinIcon}>
          <Popup>
            <Box>
              <Text fontWeight="bold">Building {idx + 1}</Text>
              <Text>Temperature: {Math.random() * 10 + 18}°C</Text>
              <Text>Humidity: {Math.random() * 50 + 30}%</Text>
              <Text>Energy Consumption: {Math.random() * 100 + 500}kWh</Text>
            </Box>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Index;