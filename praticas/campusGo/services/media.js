import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

function showPermissionAlert(message) {
  Alert.alert('Permissão necessária', message, [
    { text: 'Agora não', style: 'cancel' },
    {
      text: 'Abrir ajustes',
      onPress: () => Linking.openSettings().catch((error) => {
        console.error('Não foi possível abrir os ajustes do dispositivo.', error);
        Alert.alert('Ajustes indisponíveis', 'Abra as configurações do dispositivo manualmente.');
      }),
    },
  ]);
}

export async function pickImage() {
  try {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      showPermissionAlert('Permita o acesso à galeria para escolher uma foto de perfil.');
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    return result.canceled ? null : result.assets[0]?.uri ?? null;
  } catch (error) {
    console.error('Não foi possível selecionar uma imagem da galeria.', error);
    Alert.alert('Erro', 'Não foi possível abrir a galeria. Tente novamente.');
    return null;
  }
}

export async function takePhoto() {
  try {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      showPermissionAlert('Permita o acesso à câmera para tirar uma foto de perfil.');
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    return result.canceled ? null : result.assets[0]?.uri ?? null;
  } catch (error) {
    console.error('Não foi possível tirar uma foto.', error);
    Alert.alert('Erro', 'Não foi possível abrir a câmera. Tente novamente.');
    return null;
  }
}
