
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  Platform,
  useColorScheme,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useThemeColors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import {
  useAudioRecorder,
  useAudioRecorderState,
  useAudioPlayer,
  useAudioPlayerStatus,
  RecordingPresets,
  setAudioModeAsync,
  AudioModule,
} from "expo-audio";
import * as Haptics from "expo-haptics";

export default function VoiceRecorderScreen() {
  const colors = useThemeColors();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [recordings, setRecordings] = useState<Array<{ uri: string; duration: number; date: Date }>>([]);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const audioPlayer = useAudioPlayer(recordingUri || "");
  const playerStatus = useAudioPlayerStatus(audioPlayer);

  useEffect(() => {
    (async () => {
      try {
        const status = await AudioModule.requestRecordingPermissionsAsync();
        if (!status.granted) {
          Alert.alert(
            "Permission Required",
            "Microphone access is required to record audio. Please enable it in your device settings."
          );
          setHasPermission(false);
        } else {
          setHasPermission(true);
          await setAudioModeAsync({
            playsInSilentMode: true,
            allowsRecording: true,
          });
        }
      } catch (error) {
        console.log("Error requesting permissions:", error);
        Alert.alert("Error", "Failed to request microphone permissions");
      }
    })();
  }, []);

  const startRecording = async () => {
    try {
      if (!hasPermission) {
        Alert.alert("Permission Required", "Please grant microphone permission to record audio");
        return;
      }

      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      console.log("Recording started");
    } catch (error) {
      console.log("Error starting recording:", error);
      Alert.alert("Error", "Failed to start recording");
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecorder.stop();
      const uri = audioRecorder.uri;
      const duration = recorderState.currentTime;
      
      if (uri) {
        setRecordingUri(uri);
        setRecordings((prev) => [
          { uri, duration, date: new Date() },
          ...prev,
        ]);
        console.log("Recording stopped, URI:", uri);
      }
      
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.log("Error stopping recording:", error);
      Alert.alert("Error", "Failed to stop recording");
    }
  };

  const playRecording = (uri: string) => {
    try {
      if (playerStatus.playing) {
        audioPlayer.pause();
      } else {
        if (recordingUri !== uri) {
          setRecordingUri(uri);
          setTimeout(() => {
            audioPlayer.play();
          }, 100);
        } else {
          audioPlayer.play();
        }
      }
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.log("Error playing recording:", error);
      Alert.alert("Error", "Failed to play recording");
    }
  };

  const deleteRecording = (uri: string) => {
    Alert.alert(
      "Delete Recording",
      "Are you sure you want to delete this recording?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setRecordings((prev) => prev.filter((r) => r.uri !== uri));
            if (recordingUri === uri) {
              setRecordingUri(null);
            }
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        },
      ]
    );
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

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
      alignItems: "center",
    },
    title: {
      fontSize: 32,
      fontWeight: "900",
      color: colors.text,
      marginBottom: 8,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: "center",
      fontWeight: "500",
    },
    recordingSection: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 32,
      marginBottom: 24,
      alignItems: "center",
      boxShadow: `0px 4px 12px ${colors.shadow}`,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    recordButton: {
      width: 120,
      height: 120,
      borderRadius: 60,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      boxShadow: `0px 6px 16px ${colors.shadow}`,
      elevation: 6,
    },
    recordButtonPressed: {
      transform: [{ scale: 0.95 }],
    },
    recordingButton: {
      backgroundColor: "#FF3B30",
    },
    idleButton: {
      backgroundColor: "#007BFF",
    },
    recordingIndicator: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 12,
    },
    recordingDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "#FF3B30",
      marginRight: 8,
    },
    recordingTime: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
    },
    recordingLabel: {
      fontSize: 16,
      color: colors.textSecondary,
      fontWeight: "600",
      marginTop: 8,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: "800",
      color: colors.text,
      marginBottom: 16,
    },
    recordingItem: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      boxShadow: `0px 2px 8px ${colors.shadow}`,
      elevation: 2,
      borderWidth: 1,
      borderColor: colors.border,
    },
    recordingItemPressed: {
      opacity: 0.7,
    },
    playButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#007BFF20",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    recordingInfo: {
      flex: 1,
    },
    recordingDuration: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 4,
    },
    recordingDate: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    deleteButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#FF3B3020",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 8,
    },
    emptyState: {
      alignItems: "center",
      padding: 40,
    },
    emptyStateText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: "center",
      marginTop: 16,
    },
    permissionWarning: {
      backgroundColor: "#FF3B3020",
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: "#FF3B30",
    },
    permissionWarningText: {
      fontSize: 14,
      color: "#FF3B30",
      textAlign: "center",
      fontWeight: "600",
    },
    noteCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      marginTop: 24,
      borderWidth: 1,
      borderColor: colors.border,
      boxShadow: `0px 2px 8px ${colors.shadow}`,
      elevation: 2,
    },
    noteTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 8,
    },
    noteText: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Voice Recorder",
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>🎙️ Voice Recorder</Text>
          <Text style={styles.subtitle}>Record and play back audio</Text>
        </View>

        {!hasPermission && (
          <View style={styles.permissionWarning}>
            <Text style={styles.permissionWarningText}>
              ⚠️ Microphone permission is required to record audio
            </Text>
          </View>
        )}

        <View style={styles.recordingSection}>
          <Pressable
            style={({ pressed }) => [
              styles.recordButton,
              recorderState.isRecording ? styles.recordingButton : styles.idleButton,
              pressed && styles.recordButtonPressed,
            ]}
            onPress={recorderState.isRecording ? stopRecording : startRecording}
            disabled={!hasPermission}
          >
            <IconSymbol
              name={recorderState.isRecording ? "stop.circle.fill" : "mic.fill"}
              size={56}
              color="#FFFFFF"
            />
          </Pressable>

          {recorderState.isRecording ? (
            <>
              <View style={styles.recordingIndicator}>
                <View style={styles.recordingDot} />
                <Text style={styles.recordingTime}>
                  {formatDuration(recorderState.currentTime)}
                </Text>
              </View>
              <Text style={styles.recordingLabel}>Recording...</Text>
            </>
          ) : (
            <Text style={styles.recordingLabel}>
              {hasPermission ? "Tap to start recording" : "Permission required"}
            </Text>
          )}
        </View>

        {recordings.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Your Recordings</Text>
            {recordings.map((recording, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.recordingItem,
                  pressed && styles.recordingItemPressed,
                ]}
                onPress={() => playRecording(recording.uri)}
              >
                <View style={styles.playButton}>
                  <IconSymbol
                    name={
                      playerStatus.playing && recordingUri === recording.uri
                        ? "pause.fill"
                        : "play.fill"
                    }
                    size={24}
                    color="#007BFF"
                  />
                </View>
                <View style={styles.recordingInfo}>
                  <Text style={styles.recordingDuration}>
                    {formatDuration(recording.duration)}
                  </Text>
                  <Text style={styles.recordingDate}>
                    {formatDate(recording.date)}
                  </Text>
                </View>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => deleteRecording(recording.uri)}
                >
                  <IconSymbol name="trash.fill" size={20} color="#FF3B30" />
                </Pressable>
              </Pressable>
            ))}
          </>
        )}

        {recordings.length === 0 && !recorderState.isRecording && (
          <View style={styles.emptyState}>
            <IconSymbol name="waveform" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyStateText}>
              No recordings yet.{"\n"}Tap the microphone button to start recording!
            </Text>
          </View>
        )}

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>📝 Note</Text>
          <Text style={styles.noteText}>
            This feature records audio from your device&apos;s microphone. To convert speech to text, you would need to integrate a transcription service like OpenAI Whisper, Google Speech-to-Text, or similar APIs.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
