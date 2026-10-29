import * as Location from 'expo-location';

export async function getCurrentPlace() {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return null;

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    const [address] = await Location.reverseGeocodeAsync(location.coords);
    const addressLabel = address
      ? [
          address.name,
          address.street,
          address.district,
          address.city,
          address.region,
        ].filter(Boolean).join(', ')
      : '';

    return {
      label: addressLabel || `Localização: ${location.coords.latitude.toFixed(5)}, ${location.coords.longitude.toFixed(5)}`,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Não foi possível obter a localização atual.', error);
    return null;
  }
}
