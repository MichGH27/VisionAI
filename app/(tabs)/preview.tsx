import { File } from "expo-file-system";
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

      if (!photoUri) {
        throw new Error("No photo found");
      }

      console.log("Reading image...");

      const file = new File(photoUri as string);

      const base64 = await file.base64();

      console.log("Image converted:", base64.length);

      const response = await analyzeImage(base64);

      console.log("Gemini response:", response);

      const result =
        response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response";

      router.push({
        pathname: "/result",

        params: {
          photoUri: photoUri as string,

          result: result,
        },
      });
    } catch (error) {
      console.log("Analyze Error:", error);

      router.push({
        pathname: "/result",

        params: {
          photoUri: photoUri as string,

          result: String(error),
        },
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: photoUri as string,
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => router.back()}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={analyze}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Analyzing..." : "Analyze"}
          </Text>
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

    fontSize: 16,
  },
});
