import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { CheckCircle, RotateCcw, Home } from 'lucide-react-native';
import { useMenuUpload } from '@/providers/MenuUploadProvider';
import { colors } from '@/constants/colors';

export default function SuccessScreen() {
  const { selectedRestaurant, clearUpload, photos } = useMenuUpload();

  const handleNewUpload = () => {
    clearUpload();
    router.push('/restaurants');
  };

  const handleGoHome = () => {
    clearUpload();
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckCircle size={48} color={colors.success} />
        </View>

        <Text style={styles.title}>Upload Successful!</Text>
        <Text style={styles.message}>
          {photos.length} menu photo{photos.length !== 1 ? 's' : ''} for{' '}
          <Text style={styles.restaurantName}>{selectedRestaurant?.name}</Text>{' '}
          {photos.length === 1 ? 'has' : 'have'} been uploaded successfully.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>What happens next?</Text>
          <Text style={styles.infoText}>
            • Your photos are being processed with OCR technology{'\n'}
            • Menu items and prices will be extracted automatically{'\n'}
            • The data will be linked to the restaurant profile{'\n'}
            • You'll receive a notification when processing is complete
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.newUploadButton} 
          onPress={handleNewUpload}
          testID="new-upload-button"
        >
          <RotateCcw size={18} color={colors.primary} />
          <Text style={styles.newUploadButtonText}>Upload Another Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.homeButton} 
          onPress={handleGoHome}
          testID="home-button"
        >
          <Home size={18} color={colors.textSecondary} />
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    fontWeight: '400',
  },
  restaurantName: {
    fontWeight: '600',
    color: colors.text,
  },
  infoBox: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    fontWeight: '400',
  },
  actions: {
    padding: 24,
    gap: 12,
  },
  newUploadButton: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    gap: 6,
  },
  newUploadButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  homeButton: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  homeButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
});