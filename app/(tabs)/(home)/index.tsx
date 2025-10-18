
import React from "react";
import { Stack, Link, useRouter } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { colors, commonStyles } from "@/styles/commonStyles";

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  const menuItems = [
    {
      title: "New Game",
      description: "Start a new word challenge",
      route: "/game",
      icon: "play.fill",
      color: colors.primary,
    },
    {
      title: "Instructions",
      description: "Learn how to play",
      route: "/instructions",
      icon: "info.circle.fill",
      color: colors.secondary,
    },
    {
      title: "High Scores",
      description: "View your best scores",
      route: "/highscores",
      icon: "trophy.fill",
      color: colors.accent,
    }
  ];

  const renderMenuItem = (item: typeof menuItems[0]) => (
    <Pressable
      key={item.route}
      onPress={() => router.push(item.route as any)}
      style={({ pressed }) => [
        styles.menuCard,
        pressed && styles.menuCardPressed
      ]}
    >
      <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
        <IconSymbol name={item.icon as any} color={colors.card} size={32} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
      </View>
      <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Word Challenge",
            headerLargeTitle: true,
          }}
        />
      )}
      <View style={[commonStyles.container]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Word Challenge</Text>
            <Text style={styles.headerSubtitle}>Test your vocabulary against the clock!</Text>
          </View>

          <View style={styles.menuContainer}>
            {menuItems.map(renderMenuItem)}
          </View>

          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Quick Stats</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Games Played</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Best Score</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Words Solved</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  scrollContentWithTabBar: {
    paddingBottom: 120,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  menuContainer: {
    marginBottom: 24,
  },
  menuCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  menuCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  menuIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.highlight,
  },
});
