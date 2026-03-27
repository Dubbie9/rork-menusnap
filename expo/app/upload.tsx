import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator, SafeAreaView, Image } from 'react-native';
import { router } from 'expo-router';
import { Upload, Calendar, User, Camera, ChevronLeft, X, Edit3, Trash2 } from 'lucide-react-native';
import { useMenuUpload } from '@/providers/MenuUploadProvider';
import { airtableService } from '@/services/airtable';
import { colors } from '@/constants/colors';

export default function UploadScreen() {
  const [notes, setNotes] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const { selectedRestaurant, agentName, photos, clearUpload, removePhoto } = useMenuUpload();

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleUpload = async () => {
    if (photos.length === 0) {
      Alert.alert('Error', 'No photos to upload');
      return;
    }

    try {
      setUploading(true);
      
      await airtableService.createMenuUpload({
        restaurantId: selectedRestaurant!.id,
        uploadedBy: agentName,
        uploadDate: new Date().toISOString(),
        notes: notes.trim(),
        photos: photos,
      });

      router.push('/success');
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Upload Failed', 'Failed to upload menu. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const addMorePhotos = () => {
    router.back();
  };

  const changeRestaurant = () => {
    router.push('/restaurants');
  };

  const deletePhoto = (index: number) => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => removePhoto(index)
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={20} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Upload Details</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Restaurant</Text>
            <TouchableOpacity style={styles.editButton} onPress={changeRestaurant}>
              <Edit3 size={14} color={colors.primary} />
              <Text style={styles.editButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.restaurantCard}>
            <Text style={styles.restaurantName}>{selectedRestaurant?.name}</Text>
            <Text style={styles.restaurantLocation}>{selectedRestaurant?.location}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Photos ({photos.length})</Text>
            <TouchableOpacity style={styles.addButton} onPress={addMorePhotos}>
              <Camera size={14} color={colors.primary} />
              <Text style={styles.addButtonText}>Add More</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosContainer}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image source={{ uri: photo }} style={styles.photoThumbnail} />
                <TouchableOpacity 
                  style={styles.deletePhotoButton} 
                  onPress={() => deletePhoto(index)}
                >
                  <X size={12} color={colors.background} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Upload Information</Text>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <User size={16} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Agent</Text>
                <Text style={styles.infoValue}>{agentName}</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Calendar size={16} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>{currentDate}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes (Optional)</Text>
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add any notes about the menu..."
            placeholderTextColor={colors.textLight}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            testID="notes-input"
          />
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={[styles.uploadButton, uploading && styles.uploadButtonDisabled]} 
          onPress={handleUpload}
          disabled={uploading}
          testID="upload-button"
        >
          {uploading ? (
            <ActivityIndicator size="small" color={colors.background} />
          ) : (
            <Upload size={18} color={colors.background} />
          )}
          <Text style={styles.uploadButtonText}>
            {uploading ? 'Uploading...' : 'Upload Menu'}
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: 12,
    padding: 8,
    borderRadius: 6,
    backgroundColor: colors.surface,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  infoSection: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary,
  },
  restaurantCard: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  restaurantLocation: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  photosContainer: {
    paddingVertical: 8,
  },
  photoContainer: {
    position: 'relative',
    marginRight: 8,
  },
  photoThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  deletePhotoButton: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  infoCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 6,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  notesInput: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    color: colors.text,
    minHeight: 60,
    borderWidth: 1,
    borderColor: colors.border,
    textAlignVertical: 'top',
    marginTop: 8,
  },
  bottomActions: {
    padding: 20,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  uploadButton: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    gap: 6,
  },
  uploadButtonDisabled: {
    opacity: 0.7,
  },
  uploadButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});