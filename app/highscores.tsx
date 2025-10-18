
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter, Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

interface ScoreEntry {
  id: string;
  score: number;
  wordsCompleted: number;
  date: string;
}

export default function HighScoresScreen() {
  const router = useRouter();
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    // In a real app, you would load scores from AsyncStorage or a database
    // For now, we'll show placeholder data
    const placeholderScores: ScoreEntry[] = [
      {
        id: '1',
        score: 0,
        wordsCompleted: 0,
        date: new Date().toLocaleDateString(),
      }
    ];
    setScores(placeholderScores);
    console.log("High scores loaded");
  }, []);

  const getBadgeColor = (index: number) => {
    switch (index) {
      case 0:
        return colors.accent; // Gold
      case 1:
        return colors.textSecondary; // Silver
      case 2:
        return '#CD7F32'; // Bronze
      default:
        return colors.primary;
    }
  };

  const getBadgeIcon = (index: number) => {
    switch (index) {
      case 0:
        return 'trophy.fill';
      case 1:
        return 'medal.fill';
      case 2:
        return 'medal.fill';
      default:
        return 'star.fill';
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "High Scores",
          headerBackTitle: "Back",
          headerTintColor: colors.primary,
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <IconSymbol name="trophy.fill" size={64} color={colors.accent} />
            <Text style={styles.headerTitle}>High Scores</Text>
            <Text style={styles.headerSubtitle}>
              Your best performances
            </Text>
          </View>

          {scores.length === 0 || scores[0].score === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol name="gamecontroller" size={80} color={colors.textSecondary} />
              <Text style={styles.emptyTitle}>No Scores Yet</Text>
              <Text style={styles.emptyText}>
                Play your first game to see your scores here!
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.playButton,
                  pressed && styles.buttonPressed
                ]}
                onPress={() => router.push("/game")}
              >
                <Text style={styles.playButtonText}>Play Now</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.scoresContainer}>
              {scores.map((entry, index) => (
                <View key={entry.id} style={styles.scoreCard}>
                  <View style={[styles.rankBadge, { backgroundColor: getBadgeColor(index) }]}>
                    <IconSymbol 
                      name={getBadgeIcon(index) as any} 
                      size={24} 
                      color={colors.card} 
                    />
                    <Text style={styles.rankNumber}>#{index + 1}</Text>
                  </View>
                  <View style={styles.scoreContent}>
                    <View style={styles.scoreRow}>
                      <Text style={styles.scoreLabel}>Score</Text>
                      <Text style={styles.scoreValue}>{entry.score}</Text>
                    </View>
                    <View style={styles.scoreRow}>
                      <Text style={styles.scoreLabel}>Words</Text>
                      <Text style={styles.scoreSecondary}>{entry.wordsCompleted}</Text>
                    </View>
                    <View style={styles.scoreRow}>
                      <Text style={styles.scoreLabel}>Date</Text>
                      <Text style={styles.scoreSecondary}>{entry.date}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Overall Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Total Games</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Total Words</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Best Streak</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Avg Score</Text>
              </View>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.buttonPressed
            ]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Back to Menu</Text>
          </Pressable>
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
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 24,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 40,
  },
  playButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    boxShadow: '0px 4px 12px rgba(0, 123, 255, 0.3)',
    elevation: 4,
  },
  playButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '700',
  },
  scoresContainer: {
    marginBottom: 24,
  },
  scoreCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  rankBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.card,
    marginTop: 4,
  },
  scoreContent: {
    flex: 1,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  scoreLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  scoreSecondary: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '48%',
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    boxShadow: '0px 4px 12px rgba(108, 117, 125, 0.3)',
    elevation: 4,
  },
  backButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});
