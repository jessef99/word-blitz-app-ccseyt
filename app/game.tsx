
import { useThemeColors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Alert, Platform, Animated, useColorScheme } from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter, Stack } from "expo-router";

const WORDS = [
  "REACT", "NATIVE", "MOBILE", "CODING", "DESIGN", "DEVELOP", "TESTING",
  "JAVASCRIPT", "TYPESCRIPT", "COMPONENT", "FUNCTION", "VARIABLE", "CONSTANT",
  "INTERFACE", "EXPORT", "IMPORT", "MODULE", "PACKAGE", "LIBRARY", "FRAMEWORK",
  "APPLICATION", "PROGRAM", "SOFTWARE", "HARDWARE", "NETWORK", "DATABASE",
  "ALGORITHM", "STRUCTURE", "PATTERN", "METHOD", "CLASS", "OBJECT", "ARRAY",
  "STRING", "NUMBER", "BOOLEAN", "PROMISE", "ASYNC", "AWAIT", "CALLBACK"
];

const GAME_DURATION = 60;
const POINTS_PER_WORD = 100;
const TIME_BONUS_MULTIPLIER = 5;

export default function GameScreen() {
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHintText, setShowHintText] = useState(false);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const router = useRouter();
  const colors = useThemeColors();
  const colorScheme = useColorScheme();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0 && !gameOver) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameStarted) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [gameStarted, timeLeft]);

  const scrambleWord = (word: string): string => {
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
    setShowHintText(false);
  };

  const startGame = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setWordsCompleted(0);
    setTimeLeft(GAME_DURATION);
    setHintsUsed(0);
    getNewWord();
  };

  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
    
    const scores = JSON.parse(localStorage.getItem('wordScrambleScores') || '[]');
    const newScore = {
      id: Date.now().toString(),
      score: score,
      wordsCompleted: wordsCompleted,
      date: new Date().toISOString(),
    };
    scores.push(newScore);
    scores.sort((a: any, b: any) => b.score - a.score);
    localStorage.setItem('wordScrambleScores', JSON.stringify(scores.slice(0, 10)));
    
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const checkAnswer = () => {
    if (userInput.toUpperCase() === currentWord) {
      const timeBonus = Math.floor(timeLeft * TIME_BONUS_MULTIPLIER);
      const newScore = score + POINTS_PER_WORD + timeBonus;
      setScore(newScore);
      setWordsCompleted(wordsCompleted + 1);
      
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      
      getNewWord();
    } else {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      Alert.alert("Incorrect", "Try again!");
    }
  };

  const showHint = () => {
    setShowHintText(true);
    setHintsUsed(hintsUsed + 1);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const skipWord = () => {
    getNewWord();
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 36,
      fontWeight: '900',
      color: colors.text,
      marginBottom: 12,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: colors.textSecondary,
      marginBottom: 40,
      textAlign: 'center',
      fontWeight: '500',
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 32,
      width: '100%',
      maxWidth: 400,
      alignItems: 'center',
      boxShadow: `0px 8px 24px ${colors.shadow}`,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 32,
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
      fontSize: 28,
      fontWeight: '800',
      color: colors.text,
    },
    scrambledWord: {
      fontSize: 48,
      fontWeight: '900',
      color: colors.primary,
      marginBottom: 24,
      letterSpacing: 4,
      textAlign: 'center',
    },
    hintText: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 16,
      fontStyle: 'italic',
    },
    input: {
      width: '100%',
      backgroundColor: colors.inputBackground,
      borderRadius: 16,
      padding: 16,
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 20,
      color: colors.text,
      borderWidth: 2,
      borderColor: colors.border,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 12,
      width: '100%',
    },
    button: {
      flex: 1,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0px 4px 12px ${colors.shadow}`,
      elevation: 4,
    },
    primaryButton: {
      backgroundColor: colors.primary,
    },
    secondaryButton: {
      backgroundColor: colors.secondary,
    },
    warningButton: {
      backgroundColor: colors.warning,
    },
    successButton: {
      backgroundColor: colors.success,
    },
    buttonPressed: {
      opacity: 0.7,
      transform: [{ scale: 0.95 }],
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
    },
    gameOverCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 32,
      width: '100%',
      maxWidth: 400,
      alignItems: 'center',
      boxShadow: `0px 8px 24px ${colors.shadow}`,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    gameOverTitle: {
      fontSize: 42,
      fontWeight: '900',
      color: colors.text,
      marginBottom: 8,
    },
    gameOverSubtitle: {
      fontSize: 18,
      color: colors.textSecondary,
      marginBottom: 32,
      fontWeight: '500',
    },
    finalScore: {
      fontSize: 64,
      fontWeight: '900',
      color: colors.primary,
      marginBottom: 24,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 32,
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

  const renderStartScreen = () => (
    <View style={styles.content}>
      <Text style={styles.title}>🎮 Word Scramble</Text>
      <Text style={styles.subtitle}>Unscramble words as fast as you can!</Text>
      
      <View style={styles.card}>
        <IconSymbol name="gamecontroller.fill" size={80} color={colors.primary} />
        <Text style={[styles.title, { fontSize: 24, marginTop: 24 }]}>Ready to Play?</Text>
        <Text style={[styles.subtitle, { marginBottom: 32 }]}>
          You have {GAME_DURATION} seconds to unscramble as many words as possible!
        </Text>
        
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.successButton,
            { width: '100%' },
            pressed && styles.buttonPressed,
          ]}
          onPress={startGame}
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderGameScreen = () => (
    <View style={styles.content}>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Time</Text>
          <Animated.Text style={[styles.statValue, { transform: [{ scale: scaleAnim }] }]}>
            {timeLeft}s
          </Animated.Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Score</Text>
          <Text style={styles.statValue}>{score}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Words</Text>
          <Text style={styles.statValue}>{wordsCompleted}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.scrambledWord}>{scrambledWord}</Text>
        
        {showHintText && (
          <Text style={styles.hintText}>
            First letter: {currentWord[0]}
          </Text>
        )}

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

        <View style={styles.buttonRow}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={checkAnswer}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>

        <View style={styles.buttonRow}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.warningButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={showHint}
          >
            <Text style={styles.buttonText}>Hint</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={skipWord}
          >
            <Text style={styles.buttonText}>Skip</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  const renderGameOverScreen = () => (
    <View style={styles.content}>
      <View style={styles.gameOverCard}>
        <Text style={styles.gameOverTitle}>🏆 Game Over!</Text>
        <Text style={styles.gameOverSubtitle}>Great job!</Text>
        
        <Text style={styles.finalScore}>{score}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Words</Text>
            <Text style={styles.statValue}>{wordsCompleted}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Hints</Text>
            <Text style={styles.statValue}>{hintsUsed}</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.successButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={startGame}
          >
            <Text style={styles.buttonText}>Play Again</Text>
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.secondaryButton,
            { width: '100%' },
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Word Scramble Game",
          headerShown: false,
        }}
      />
      
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <IconSymbol name="chevron.left" size={24} color={colors.text} />
      </Pressable>

      {!gameStarted && !gameOver && renderStartScreen()}
      {gameStarted && !gameOver && renderGameScreen()}
      {gameOver && renderGameOverScreen()}
    </View>
  );
}
