import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform, Image, SafeAreaView, ScrollView } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { Camera, RotateCcw, Check, X, Plus, ArrowRight } from 'lucide-react-native';
import { useMenuUpload } from '@/providers/MenuUploadProvider';
import { colors } from '@/constants/colors';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const { selectedRestaurant, photos, addPhoto } = useMenuUpload();

  if (!permission) {
    return <SafeAreaView style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <View style={styles.permissionContent}>
          <View style={styles.permissionIconContainer}>
            <Camera size={40} color={colors.primary} />
          </View>
          <Text style={styles.permissionTitle}>Camera Permission Required</Text>
          <Text style={styles.permissionText}>
            We need access to your camera to capture menu photos
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      
      if (photo) {
        setCapturedPhoto(photo.uri);
      }
    } catch (error) {
      console.error('Failed to take picture:', error);
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
  };

  const confirmPhoto = () => {
    if (capturedPhoto) {
      addPhoto(capturedPhoto);
      setCapturedPhoto(null);
    }
  };

  const continueToUpload = () => {
    if (photos.length > 0) {
      router.push('/upload');
    } else {
      Alert.alert('No Photos', 'Please take at least one photo before continuing.');
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (capturedPhoto) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.previewHeader}>
          <Text style={styles.previewTitle}>Photo Preview</Text>
        </View>
        
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedPhoto }} style={styles.previewImage} resizeMode="contain" />
        </View>

        <View style={styles.previewActions}>
          <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
            <X size={20} color={colors.error} />
            <Text style={styles.retakeButtonText}>Retake</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.confirmButton} onPress={confirmPhoto}>
            <Check size={20} color={colors.background} />
            <Text style={styles.confirmButtonText}>Add Photo</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.restaurantName}>{selectedRestaurant?.name}</Text>
        <Text style={styles.instructionText}>
          {photos.length === 0 
            ? 'Position the menu in the camera frame and tap to capture' 
            : `${photos.length} photo${photos.length !== 1 ? 's' : ''} captured`
          }
        </Text>
      </View>

      {photos.length > 0 && (
        <View style={styles.photosPreview}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosScroll}>
            {photos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={styles.thumbnailImage} />
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.continueButton} onPress={continueToUpload}>
            <Text style={styles.continueButtonText}>Continue</Text>
            <ArrowRight size={18} color={colors.background} />
          </TouchableOpacity>
        </View>
      )}

      {Platform.OS !== 'web' ? (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
      ) : (
        <View style={styles.webCameraPlaceholder}>
          <Camera size={48} color={colors.textLight} />
          <Text style={styles.webCameraText}>Camera not available on web</Text>
          <Text style={styles.webCameraSubtext}>Use mobile device for camera functionality</Text>
        </View>
      )}

      <View style={styles.cameraControls}>
        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
          <RotateCcw size={20} color={colors.background} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureButtonOuter}>
            <View style={styles.captureButtonInner}>
              <Plus size={24} color={colors.background} />
            </View>
          </View>
        </TouchableOpacity>
        
        <View style={styles.placeholder} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContent: {
    alignItems: 'center',
    padding: 32,
  },
  permissionIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  permissionButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.background,
    marginBottom: 4,
  },
  instructionText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
  },
  photosPreview: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 12,
  },
  photosScroll: {
    paddingHorizontal: 20,
  },
  thumbnailImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 8,
  },
  continueButton: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 6,
  },
  continueButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  webCameraPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  webCameraText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
    fontWeight: '500',
  },
  webCameraSubtext: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
  },
  cameraControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  flipButton: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    borderRadius: 6,
  },
  captureButtonOuter: {
    width: 64,
    height: 64,
    backgroundColor: colors.background,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  previewHeader: {
    padding: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.background,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 20,
  },
  previewImage: {
    flex: 1,
    borderRadius: 6,
  },
  previewActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  retakeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: 6,
    padding: 12,
    gap: 6,
  },
  retakeButtonText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.success,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 6,
  },
  confirmButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '600',
  },
});