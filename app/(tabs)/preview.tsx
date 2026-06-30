import * as FileSystem from "expo-file-system";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { analyzeImage } from "../../lib/gemini";

export default function PreviewScreen() {
  const { photoUri } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);

  async function analyze() {
    try {
      setLoading(true);

      const base64 = await FileSystem.readAsStringAsync(photoUri as string, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const result = await analyzeImage(base64);

      router.push({
        pathname: "/result",
        params: {
          photoUri,
          result,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri as string }} style={styles.image} />

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Retake</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={analyze}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Analyzing..." : "Analyze"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    borderRadius: 12,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#2E5BBA",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
