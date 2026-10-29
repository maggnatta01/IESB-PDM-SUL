import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { pickImage, takePhoto } from '../../services/media';

const PROFILE_PHOTO_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    let active = true;

    AsyncStorage.getItem(PROFILE_PHOTO_KEY)
      .then((savedUri) => {
        if (active && savedUri) setProfileImage(savedUri);
      })
      .catch((error) => {
        console.error('Não foi possível carregar a foto de perfil salva.', error);
        Alert.alert('Perfil', 'Não foi possível restaurar a foto salva.');
      });

    return () => {
      active = false;
    };
  }, []);

  const saveProfileImage = async (imageUri) => {
    if (!imageUri) return;

    setProfileImage(imageUri);
    try {
      await AsyncStorage.setItem(PROFILE_PHOTO_KEY, imageUri);
    } catch (error) {
      console.error('Não foi possível salvar a foto de perfil.', error);
      Alert.alert('Perfil', 'A foto foi selecionada, mas não pôde ser salva.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.profileCard}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar}>
            <Text style={styles.placeholderText}>CG</Text>
          </View>
        )}

        <Text style={styles.name}>CampusGo</Text>
        <Text style={styles.subtitle}>Aluno do IESB</Text>
      </View>

      <Pressable style={styles.actionButton} onPress={async () => saveProfileImage(await pickImage())}>
        <Text style={styles.buttonText}>Escolher foto</Text>
      </Pressable>

      <Pressable style={styles.actionButton} onPress={async () => saveProfileImage(await takePhoto())}>
        <Text style={styles.buttonText}>Tirar foto</Text>
      </Pressable>

      <Text style={styles.locationText}>Faça check-in pela aba Tarefas.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 20,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  placeholderAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  actionButton: {
    backgroundColor: '#1d4ed8',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  locationText: {
    marginTop: 12,
    fontSize: 14,
    color: '#334155',
  },
});
