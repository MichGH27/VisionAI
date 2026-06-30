import { File } from "expo-file-system";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PreviewScreen() {
  const params = useLocalSearchParams();

  const photoUri = params.photoUri as string;

  const [loading, setLoading] = useState(false);

  async function analyze() {
    try {
      setLoading(true);

      if (!photoUri) {
        throw new Error("No photo found");
      }

      console.log("Reading image...");

      const file = new File(photoUri);

      const base64 = await file.base64();

      console.log("Image converted:", base64.length);

      router.push({
        pathname: "/(tabs)/result",

        params: {
          base64Image: base64,
        },
      });
    } catch (error) {
      console.log("Preview Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: photoUri,
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
            {loading ? "Preparing..." : "Analyze"}
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
