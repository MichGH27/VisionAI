import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PreviewScreen() {
  const { photoUri } = useLocalSearchParams();

  function analyze() {
    router.push({
      pathname: "/result",
      params: {
        photoUri,
        result: "Analysis will be added in the next phase.",
      },
    });
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photoUri as string }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.analyzeButton} onPress={analyze}>
          <Text style={styles.buttonText}>Analyze</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    flex: 1,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  retakeButton: {
    backgroundColor: "#5A6472",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  analyzeButton: {
    backgroundColor: "#5B3FA3",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
