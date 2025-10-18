
import { Stack, Link, useRouter } from "expo-router";
import { useTheme } from "@react-navigation/native";
import { useThemeColors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import React from "react";
import { ScrollView, Pressable, StyleSheet, View, Text, Platform, useColorScheme } from "react-native";

const menuItems = [
  {
    title: "Play Game",
    description: "Start a new word scramble challenge",
    icon: "gamecontroller.fill" as const,
    route: "/game",
    color: "#007BFF",
    darkColor: "#1E90FF",
  },
  {
    title: "Voice Recorder",
    description: "Record and play back audio",
    icon: "mic.fill" as const,
    route: "/voice-recorder",
    color: "#FF3B30",
    darkColor: "#FF453A",
  },
  {
    title: "Instructions",
    description: "Learn how to play",
    icon: "info.circle.fill" as const,
    route: "/instructions",
    color: "#28A745",
    darkColor: "#32D74B",
  },
  {
    title: "High Scores",
    description: "View your best scores",
    icon: "trophy.fill" as const,
    route: "/highscores",
    color: "#FFC107",
    darkColor: "#FFD60A",
  },
];

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
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
      marginTop: 20,
      marginBottom: 32,
      alignItems: 'center',
    },
    title: {
      fontSize: 42,
      fontWeight: '900',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: colors.textSecondary,
      textAlign: 'center',
      fontWeight: '500',
    },
    menuItem: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 24,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
      boxShadow: `0px 4px 12px ${colors.shadow}`,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    menuItemPressed: {
      opacity: 0.7,
      transform: [{ scale: 0.98 }],
    },
    iconContainer: {
      width: 60,
      height: 60,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    menuContent: {
      flex: 1,
    },
    menuTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    menuDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '400',
    },
    chevron: {
      marginLeft: 8,
    },
  });

  const renderMenuItem = (item: typeof menuItems[0]) => {
    const itemColor = colorScheme === 'dark' ? item.darkColor : item.color;
    
    return (
      <Pressable
        key={item.route}
        style={({ pressed }) => [
          styles.menuItem,
          pressed && styles.menuItemPressed,
        ]}
        onPress={() => router.push(item.route as any)}
      >
        <View style={[styles.iconContainer, { backgroundColor: itemColor + '20' }]}>
          <IconSymbol name={item.icon} size={32} color={itemColor} />
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>{item.title}</Text>
          <Text style={styles.menuDescription}>{item.description}</Text>
        </View>
        <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} style={styles.chevron} />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Word Scramble",
          headerShown: false,
        }}
      />
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>🎮 Word Scramble</Text>
          <Text style={styles.subtitle}>Challenge your word skills!</Text>
        </View>

        {menuItems.map(renderMenuItem)}
      </ScrollView>
    </View>
  );
}
