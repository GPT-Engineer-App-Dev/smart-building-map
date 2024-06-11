import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Text } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Function to generate random coordinates within Oslo's approximate bounding box
const getRandomCoordinates = () => {
  const minLat = 59.8;
  const maxLat = 59.95;
  const minLng = 10.6;
  const maxLng = 10.9;
  const lat = Math.random() * (maxLat - minLat) + minLat;
  const lng = Math.random() * (maxLng - minLng) + minLng;
  return [lat, lng];
};

// Generate 10 random building locations
const buildings = Array.from({ length: 10 }, () => ({
  position: getRandomCoordinates(),
  sensorData: {
    temperature: Math.floor(Math.random() * 30),
    humidity: Math.floor(Math.random() * 100),
    occupancy: Math.floor(Math.random() * 500),
  },
}));

// Custom pin icon
const pinIcon = new L.Icon({
  iconUrl: require('../assets/pin-icon.png'),
  iconRetinaUrl: require('../assets/pin-icon.png'),
  iconSize: new L.Point(30, 30),
  className: 'leaflet-div-icon',
});

const Index = () => {
  return (
    <MapContainer center={[59.9139, 10.7522]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {buildings.map((building, index) => (
        <Marker key={index} position={building.position} icon={pinIcon}>
          <Popup>
            <Box>
              <Text fontWeight="bold">Building {index + 1}</Text>
              <Text>Temperature: {building.sensorData.temperature}°C</Text>
              <Text>Humidity: {building.sensorData.humidity}%</Text>
              <Text>Occupancy: {building.sensorData.occupancy} people</Text>
            </Box>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Index;