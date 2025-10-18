
import { View, Text, StyleSheet, ScrollView, Pressable, useColorScheme } from "react-native";
import { useThemeColors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import React, { useState, useEffect } from "react";
import { useRouter, Stack } from "expo-router";

interface ScoreEntry {
  id: string;
  score: number;
  wordsCompleted: number;
  date: string;
}

export default function HighScoresScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const colorScheme = useColorScheme();
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('wordScrambleScores') || '[]');
    setScores(savedScores);
  }, []);

  const getBadgeColor = (index: number) => {
    if (colorScheme === 'dark') {
      switch (index) {
        case 0: return '#FFD700';
        case 1: return '#C0C0C0';
        case 2: return '#CD7F32';
        default: return colors.primary;
      }
    } else {
      switch (index) {
        case 0: return '#FFD700';
        case 1: return '#C0C0C0';
        case 2: return '#CD7F32';
        default: return colors.primary;
      }
    }
  };

  const getBadgeIcon = (index: number) => {
    switch (index) {
      case 0: return 'trophy.fill';
      case 1: return 'medal.fill';
      case 2: return 'medal.fill';
      default: return 'star.fill';
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 40,
    },
    header: {
      marginTop: 20,
      marginBottom: 32,
      alignItems: 'center',
    },
    title: {
      fontSize: 36,
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
    scoreCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      boxShadow: `0px 4px 12px ${colors.shadow}`,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    rankBadge: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    rankText: {
      fontSize: 20,
      fontWeight: '900',
      color: '#FFFFFF',
    },
    scoreContent: {
      flex: 1,
    },
    scoreValue: {
      fontSize: 24,
      fontWeight: '800',
      color: colors.text,
      marginBottom: 4,
    },
    scoreDetails: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    scoreDate: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    emptyState: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 40,
      alignItems: 'center',
      boxShadow: `0px 4px 12px ${colors.shadow}`,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    emptyText: {
      fontSize: 18,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 16,
      fontWeight: '500',
    },
    statsCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 24,
      marginBottom: 24,
      boxShadow: `0px 4px 12px ${colors.shadow}`,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statsTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 16,
      textAlign: 'center',
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    statBox: {
      alignItems: 'center',
      backgroundColor: colors.highlight,
      padding: 16,
      borderRadius: 16,
      minWidth: 100,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 4,
      fontWeight: '600',
    },
    statValue: {
      fontSize: 24,
      fontWeight: '800',
      color: colors.text,
    },
    backButton: {
      position: 'absolute',
      top: 60,
      left: 20,
      zIndex: 10,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      boxShadow: `0px 2px 8px ${colors.shadow}`,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
  });

  const totalGames = scores.length;
  const totalWords = scores.reduce((sum, score) => sum + score.wordsCompleted, 0);
  const averageScore = totalGames > 0 ? Math.round(scores.reduce((sum, score) => sum + score.score, 0) / totalGames) : 0;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "High Scores",
          headerShown: false,
        }}
      />
      
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <IconSymbol name="chevron.left" size={24} color={colors.text} />
      </Pressable>

      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>🏆 High Scores</Text>
          <Text style={styles.subtitle}>Your best performances</Text>
        </View>

        {totalGames > 0 && (
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Overall Statistics</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Games</Text>
                <Text style={styles.statValue}>{totalGames}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Avg Score</Text>
                <Text style={styles.statValue}>{averageScore}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Total Words</Text>
                <Text style={styles.statValue}>{totalWords}</Text>
              </View>
            </View>
          </View>
        )}

        {scores.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol name="trophy" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyText}>
              No scores yet!{'\n'}Play a game to see your scores here.
            </Text>
          </View>
        ) : (
          scores.map((score, index) => (
            <View key={score.id} style={styles.scoreCard}>
              <View style={[styles.rankBadge, { backgroundColor: getBadgeColor(index) }]}>
                <IconSymbol 
                  name={getBadgeIcon(index) as any} 
                  size={24} 
                  color="#FFFFFF" 
                />
              </View>
              <View style={styles.scoreContent}>
                <Text style={styles.scoreValue}>{score.score} pts</Text>
                <Text style={styles.scoreDetails}>
                  {score.wordsCompleted} words completed
                </Text>
                <Text style={styles.scoreDate}>
                  {new Date(score.date).toLocaleDateString()} at {new Date(score.date).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
