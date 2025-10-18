
import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Alert, Platform, Animated } from "react-native";
import { useRouter, Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import * as Haptics from "expo-haptics";

const WORDS = [
  "REACT", "NATIVE", "MOBILE", "CODING", "DESIGN", "SCREEN", "BUTTON", "LAYOUT",
  "STYLE", "COMPONENT", "FUNCTION", "EXPORT", "IMPORT", "RENDER", "STATE",
  "PROPS", "HOOKS", "EFFECT", "CONTEXT", "ROUTER", "NAVIGATION", "GESTURE",
  "ANIMATION", "PLATFORM", "DEVICE", "STORAGE", "NETWORK", "ASYNC", "PROMISE",
  "ARRAY", "OBJECT", "STRING", "NUMBER", "BOOLEAN", "INTERFACE", "TYPE"
];

const GAME_DURATION = 60; // seconds
const POINTS_PER_WORD = 100;
const TIME_BONUS_MULTIPLIER = 10;

export default function GameScreen() {
  const router = useRouter();
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hint, setHint] = useState("");
  
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const successAnimation = useRef(new Animated.Value(1)).current;

  const scrambleWord = (word: string) => {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const scrambled = arr.join('');
    return scrambled === word ? scrambleWord(word) : scrambled;
  };

  const getNewWord = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(randomWord);
    setScrambledWord(scrambleWord(randomWord));
    setUserInput("");
    setHint("");
  };

  const startGame = () => {
    console.log("Starting game");
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setWordsCompleted(0);
    setTimeLeft(GAME_DURATION);
    getNewWord();
  };

  const endGame = () => {
    console.log("Game ended. Final score:", score);
    setGameOver(true);
    setGameStarted(false);
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const checkAnswer = () => {
    if (userInput.toUpperCase() === currentWord) {
      console.log("Correct answer!");
      const timeBonus = Math.floor(timeLeft * TIME_BONUS_MULTIPLIER);
      const totalPoints = POINTS_PER_WORD + timeBonus;
      setScore(score + totalPoints);
      setWordsCompleted(wordsCompleted + 1);
      
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      
      // Success animation
      Animated.sequence([
        Animated.timing(successAnimation, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(successAnimation, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      
      getNewWord();
    } else {
      console.log("Wrong answer");
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      
      // Shake animation
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  };

  const showHint = () => {
    if (currentWord.length > 0) {
      const hintText = `First letter: ${currentWord[0]}`;
      setHint(hintText);
      console.log("Hint shown:", hintText);
    }
  };

  const skipWord = () => {
    console.log("Word skipped");
    getNewWord();
  };

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameStarted && timeLeft === 0) {
      endGame();
    }
  }, [gameStarted, timeLeft]);

  const renderStartScreen = () => (
    <View style={styles.centerContainer}>
      <IconSymbol name="gamecontroller.fill" size={80} color={colors.primary} />
      <Text style={styles.welcomeTitle}>Word Challenge</Text>
      <Text style={styles.welcomeText}>
        Unscramble as many words as you can in {GAME_DURATION} seconds!
      </Text>
      <View style={styles.rulesCard}>
        <Text style={styles.rulesTitle}>How to Play:</Text>
        <Text style={styles.rulesText}>- Unscramble the letters to form a word</Text>
        <Text style={styles.rulesText}>- Each correct word: {POINTS_PER_WORD} points</Text>
        <Text style={styles.rulesText}>- Time bonus: {TIME_BONUS_MULTIPLIER} points per second left</Text>
        <Text style={styles.rulesText}>- Use hints if you get stuck</Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.startButton,
          pressed && styles.buttonPressed
        ]}
        onPress={startGame}
      >
        <Text style={styles.startButtonText}>Start Game</Text>
      </Pressable>
    </View>
  );

  const renderGameScreen = () => (
    <View style={styles.gameContainer}>
      <View style={styles.statsBar}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Score</Text>
          <Text style={styles.statValue}>{score}</Text>
        </View>
        <View style={[styles.statBox, styles.timerBox]}>
          <Text style={styles.statLabel}>Time</Text>
          <Text style={[styles.statValue, timeLeft <= 10 && styles.timeWarning]}>
            {timeLeft}s
          </Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Words</Text>
          <Text style={styles.statValue}>{wordsCompleted}</Text>
        </View>
      </View>

      <Animated.View 
        style={[
          styles.wordCard,
          { 
            transform: [
              { translateX: shakeAnimation },
              { scale: successAnimation }
            ] 
          }
        ]}
      >
        <Text style={styles.scrambledWord}>{scrambledWord}</Text>
      </Animated.View>

      {hint ? (
        <View style={styles.hintBox}>
          <IconSymbol name="lightbulb.fill" size={20} color={colors.accent} />
          <Text style={styles.hintText}>{hint}</Text>
        </View>
      ) : null}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your answer..."
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="characters"
          autoCorrect={false}
          onSubmitEditing={checkAnswer}
        />
      </View>

      <View style={styles.buttonRow}>
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            styles.hintButton,
            pressed && styles.buttonPressed
          ]}
          onPress={showHint}
        >
          <IconSymbol name="lightbulb" size={20} color={colors.card} />
          <Text style={styles.actionButtonText}>Hint</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            styles.submitButton,
            pressed && styles.buttonPressed
          ]}
          onPress={checkAnswer}
        >
          <IconSymbol name="checkmark.circle.fill" size={20} color={colors.card} />
          <Text style={styles.actionButtonText}>Submit</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            styles.skipButton,
            pressed && styles.buttonPressed
          ]}
          onPress={skipWord}
        >
          <IconSymbol name="forward.fill" size={20} color={colors.card} />
          <Text style={styles.actionButtonText}>Skip</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderGameOverScreen = () => (
    <View style={styles.centerContainer}>
      <IconSymbol name="trophy.fill" size={80} color={colors.accent} />
      <Text style={styles.gameOverTitle}>Game Over!</Text>
      <View style={styles.finalScoreCard}>
        <Text style={styles.finalScoreLabel}>Final Score</Text>
        <Text style={styles.finalScoreValue}>{score}</Text>
        <View style={styles.finalStatsRow}>
          <View style={styles.finalStatItem}>
            <Text style={styles.finalStatValue}>{wordsCompleted}</Text>
            <Text style={styles.finalStatLabel}>Words Solved</Text>
          </View>
          <View style={styles.finalStatDivider} />
          <View style={styles.finalStatItem}>
            <Text style={styles.finalStatValue}>
              {wordsCompleted > 0 ? Math.round(score / wordsCompleted) : 0}
            </Text>
            <Text style={styles.finalStatLabel}>Avg Points</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonColumn}>
        <Pressable
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.buttonPressed
          ]}
          onPress={startGame}
        >
          <Text style={styles.startButtonText}>Play Again</Text>
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
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Word Challenge",
          headerBackTitle: "Back",
          headerTintColor: colors.primary,
        }}
      />
      <View style={commonStyles.container}>
        <View style={styles.content}>
          {!gameStarted && !gameOver && renderStartScreen()}
          {gameStarted && !gameOver && renderGameScreen()}
          {gameOver && renderGameOverScreen()}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginTop: 24,
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  rulesCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    width: '100%',
    maxWidth: 400,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  rulesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  rulesText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    boxShadow: '0px 4px 12px rgba(0, 123, 255, 0.3)',
    elevation: 4,
    width: '100%',
    maxWidth: 400,
  },
  startButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  timerBox: {
    backgroundColor: colors.highlight,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  timeWarning: {
    color: colors.danger,
  },
  wordCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    minHeight: 150,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  scrambledWord: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 8,
  },
  hintBox: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  hintText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 2,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  hintButton: {
    backgroundColor: colors.accent,
  },
  submitButton: {
    backgroundColor: colors.primary,
  },
  skipButton: {
    backgroundColor: colors.secondary,
  },
  actionButtonText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
  },
  gameOverTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginTop: 24,
    marginBottom: 24,
  },
  finalScoreCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 32,
    marginBottom: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  finalScoreLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
    fontWeight: '600',
  },
  finalScoreValue: {
    fontSize: 56,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 24,
  },
  finalStatsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.highlight,
  },
  finalStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  finalStatValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.accent,
    marginBottom: 4,
  },
  finalStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  finalStatDivider: {
    width: 1,
    backgroundColor: colors.highlight,
  },
  buttonColumn: {
    width: '100%',
    maxWidth: 400,
  },
  backButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginTop: 12,
    boxShadow: '0px 4px 12px rgba(108, 117, 125, 0.3)',
    elevation: 4,
  },
  backButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
