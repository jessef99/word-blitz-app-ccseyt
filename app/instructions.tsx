
import { View, Text, StyleSheet, ScrollView, Pressable, useColorScheme } from "react-native";
import { useThemeColors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import React from "react";
import { useRouter, Stack } from "expo-router";

export default function InstructionsScreen() {
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
    card: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 24,
      marginBottom: 16,
      boxShadow: `0px 4px 12px ${colors.shadow}`,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    instructionItem: {
      flexDirection: 'row',
      marginBottom: 16,
      alignItems: 'flex-start',
    },
    bullet: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.primary + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    bulletText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.primary,
    },
    instructionText: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
      paddingTop: 4,
    },
    tipBox: {
      backgroundColor: colors.highlight,
      borderRadius: 16,
      padding: 20,
      marginTop: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tipTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.primary,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    tipText: {
      fontSize: 15,
      color: colors.text,
      lineHeight: 22,
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
    iconContainer: {
      marginRight: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Instructions",
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
          <Text style={styles.title}>📖 How to Play</Text>
          <Text style={styles.subtitle}>Master the word scramble game</Text>
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <IconSymbol name="gamecontroller.fill" size={28} color={colors.primary} style={styles.iconContainer} />
            <Text style={styles.sectionTitle}>Game Rules</Text>
          </View>
          
          <View style={styles.instructionItem}>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>1</Text>
            </View>
            <Text style={styles.instructionText}>
              You have 60 seconds to unscramble as many words as possible
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>2</Text>
            </View>
            <Text style={styles.instructionText}>
              Each word is scrambled - rearrange the letters to form the correct word
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>3</Text>
            </View>
            <Text style={styles.instructionText}>
              Type your answer and press Submit to check if it&apos;s correct
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>4</Text>
            </View>
            <Text style={styles.instructionText}>
              Use hints if you&apos;re stuck, or skip to the next word
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <IconSymbol name="star.fill" size={28} color={colors.warning} style={styles.iconContainer} />
            <Text style={styles.sectionTitle}>Scoring</Text>
          </View>
          
          <View style={styles.instructionItem}>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>💯</Text>
            </View>
            <Text style={styles.instructionText}>
              Earn 100 points for each correct word
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>⚡</Text>
            </View>
            <Text style={styles.instructionText}>
              Get bonus points based on remaining time (5 points per second)
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>🏆</Text>
            </View>
            <Text style={styles.instructionText}>
              Your high scores are saved automatically
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <IconSymbol name="lightbulb.fill" size={28} color={colors.success} style={styles.iconContainer} />
            <Text style={styles.sectionTitle}>Tips & Tricks</Text>
          </View>

          <View style={styles.tipBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <IconSymbol name="brain.head.profile" size={20} color={colors.primary} style={styles.iconContainer} />
              <Text style={styles.tipTitle}>Look for patterns</Text>
            </View>
            <Text style={styles.tipText}>
              Common letter combinations like &quot;TH&quot;, &quot;ING&quot;, or &quot;ED&quot; can help you solve words faster
            </Text>
          </View>

          <View style={[styles.tipBox, { marginTop: 12 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <IconSymbol name="clock.fill" size={20} color={colors.primary} style={styles.iconContainer} />
              <Text style={styles.tipTitle}>Speed matters</Text>
            </View>
            <Text style={styles.tipText}>
              Solve words quickly to earn time bonus points. The faster you solve, the higher your score!
            </Text>
          </View>

          <View style={[styles.tipBox, { marginTop: 12 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <IconSymbol name="hand.raised.fill" size={20} color={colors.primary} style={styles.iconContainer} />
              <Text style={styles.tipTitle}>Use hints wisely</Text>
            </View>
            <Text style={styles.tipText}>
              Hints reveal the first letter. Use them when you&apos;re really stuck, but try to solve without them for practice!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
