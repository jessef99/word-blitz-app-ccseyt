
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  background: '#F0F4F7',
  text: '#2D3436',
  textSecondary: '#747A7C',
  primary: '#007BFF',
  secondary: '#6C757D',
  accent: '#FFC107',
  card: '#FFFFFF',
  highlight: '#E2EBF3',
  success: '#28A745',
  danger: '#DC3545',
  warning: '#FFC107',
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 6px rgba(0, 123, 255, 0.2)',
    elevation: 3,
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 6px rgba(108, 117, 125, 0.2)',
    elevation: 3,
  },
  accent: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 6px rgba(255, 193, 7, 0.2)',
    elevation: 3,
  },
  text: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '600',
  },
});

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  section: {
    marginBottom: 24,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
