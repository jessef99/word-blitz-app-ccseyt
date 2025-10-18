
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, Platform, useColorScheme } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import React from "react";
import { GlassView } from "expo-glass-effect";
import { useThemeColors } from "@/styles/commonStyles";

export default function ProfileScreen() {
  const theme = useTheme();
  const colors = useThemeColors();
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 100,
    },
    header: {
      alignItems: 'center',
      marginBottom: 32,
      marginTop: 20,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      borderWidth: 4,
      borderColor: colors.card,
      boxShadow: `0px 4px 12px ${colors.shadow}`,
      elevation: 4,
    },
    name: {
      fontSize: 28,
      fontWeight: '800',
      color: colors.text,
      marginBottom: 4,
    },
    username: {
      fontSize: 16,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 12,
      paddingLeft: 4,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      boxShadow: `0px 2px 8px ${colors.shadow}`,
      elevation: 2,
      borderWidth: 1,
      borderColor: colors.border,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    cardSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    themeIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.highlight,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    themeText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginLeft: 6,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatar}>
            <IconSymbol name="person.fill" size={50} color="#FFFFFF" />
          </View>
          <Text style={styles.name}>Word Master</Text>
          <Text style={styles.username}>@wordgamer</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme</Text>
          <View style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <IconSymbol 
                name={colorScheme === 'dark' ? 'moon.fill' : 'sun.max.fill'} 
                size={24} 
                color={colors.primary} 
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Appearance</Text>
              <Text style={styles.cardSubtitle}>Automatically adapts to your system settings</Text>
            </View>
            <View style={styles.themeIndicator}>
              <IconSymbol 
                name={colorScheme === 'dark' ? 'moon.stars.fill' : 'sun.max.fill'} 
                size={16} 
                color={colors.text} 
              />
              <Text style={styles.themeText}>
                {colorScheme === 'dark' ? 'Dark' : 'Light'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Stats</Text>
          <View style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: colors.success + '20' }]}>
              <IconSymbol name="chart.bar.fill" size={24} color={colors.success} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Statistics</Text>
              <Text style={styles.cardSubtitle}>View your game statistics</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </View>

          <View style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: colors.warning + '20' }]}>
              <IconSymbol name="trophy.fill" size={24} color={colors.warning} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Achievements</Text>
              <Text style={styles.cardSubtitle}>Track your progress</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <IconSymbol name="bell.fill" size={24} color={colors.primary} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Notifications</Text>
              <Text style={styles.cardSubtitle}>Manage your notifications</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </View>

          <View style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '20' }]}>
              <IconSymbol name="gear" size={24} color={colors.secondary} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Preferences</Text>
              <Text style={styles.cardSubtitle}>Customize your experience</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
