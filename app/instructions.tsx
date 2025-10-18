
import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter, Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

export default function InstructionsScreen() {
  const router = useRouter();

  const instructions = [
    {
      icon: "gamecontroller.fill",
      title: "Game Objective",
      description: "Unscramble as many words as possible within the time limit to achieve the highest score.",
    },
    {
      icon: "clock.fill",
      title: "Time Challenge",
      description: "You have 60 seconds to solve as many word puzzles as you can. The faster you solve, the more bonus points you earn!",
    },
    {
      icon: "star.fill",
      title: "Scoring System",
      description: "Each correct word gives you 100 points. You also get 10 bonus points for every second remaining when you solve the word.",
    },
    {
      icon: "lightbulb.fill",
      title: "Use Hints",
      description: "Stuck on a word? Tap the Hint button to reveal the first letter. Use hints wisely to keep your momentum!",
    },
    {
      icon: "forward.fill",
      title: "Skip Words",
      description: "If a word is too difficult, you can skip it and move to the next one. No penalties for skipping!",
    },
    {
      icon: "trophy.fill",
      title: "Beat Your Score",
      description: "Try to beat your previous high score and challenge yourself to solve more words each time!",
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "How to Play",
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
            <IconSymbol name="info.circle.fill" size={64} color={colors.primary} />
            <Text style={styles.headerTitle}>How to Play</Text>
            <Text style={styles.headerSubtitle}>
              Master the word challenge with these simple instructions
            </Text>
          </View>

          <View style={styles.instructionsContainer}>
            {instructions.map((item, index) => (
              <View key={index} style={styles.instructionCard}>
                <View style={styles.instructionIconContainer}>
                  <IconSymbol name={item.icon as any} size={32} color={colors.primary} />
                </View>
                <View style={styles.instructionContent}>
                  <Text style={styles.instructionTitle}>{item.title}</Text>
                  <Text style={styles.instructionDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>Pro Tips</Text>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>
                Look for common letter patterns and word endings
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>
                Start with vowels to identify possible word structures
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>
                Don&apos;t spend too much time on one word - skip and come back later
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>
                Practice regularly to improve your word recognition speed
              </Text>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.buttonPressed
            ]}
            onPress={() => router.push("/game")}
          >
            <Text style={styles.startButtonText}>Start Playing</Text>
          </Pressable>

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
    paddingHorizontal: 20,
  },
  instructionsContainer: {
    marginBottom: 24,
  },
  instructionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  instructionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  instructionContent: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  instructionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  tipsCard: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(255, 193, 7, 0.2)',
    elevation: 2,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  tipBullet: {
    fontSize: 18,
    color: colors.text,
    marginRight: 12,
    fontWeight: '700',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginBottom: 12,
    boxShadow: '0px 4px 12px rgba(0, 123, 255, 0.3)',
    elevation: 4,
  },
  startButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
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
