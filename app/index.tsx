import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { User, ArrowRight, Camera } from 'lucide-react-native';
import { useMenuUpload } from '@/providers/MenuUploadProvider';
import { colors } from '@/constants/colors';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [agentName, setAgentName] = useState<string>('');
  const { setAgentName: setContextAgentName } = useMenuUpload();

  const handleLogin = () => {
    if (!agentName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    
    setContextAgentName(agentName.trim());
    router.push('/restaurants');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Camera size={32} color={colors.primary} />
          </View>
          <Text style={styles.title}>MenuSnap</Text>
          <Text style={styles.subtitle}>Field Agent Portal</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Text style={styles.label}>Agent Name</Text>
            <TextInput
              style={styles.input}
              value={agentName}
              onChangeText={setAgentName}
              placeholder="Enter your full name"
              placeholderTextColor={colors.textLight}
              autoCapitalize="words"
              testID="agent-name-input"
            />

            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
              testID="login-button"
            >
              <Text style={styles.loginButtonText}>Continue</Text>
              <ArrowRight size={18} color={colors.background} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Capture restaurant menus quickly and efficiently
          </Text>
        </View>
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
    paddingHorizontal: 24,
    justifyContent: 'center',
    maxWidth: Math.min(width * 0.85, 400),
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  formContainer: {
    marginBottom: 32,
  },
  form: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    gap: 8,
  },
  loginButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '400',
  },
});