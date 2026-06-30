import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { useLocalSearchParams } from "expo-router";
import { analyzeImage } from "../../lib/gemini";

type Analysis = {
  objects: string[];

  context: string;

  activities: string;

  recommendations: string;
};

export default function ResultScreen() {
  const params = useLocalSearchParams();

  const base64Image = params.base64Image as string;

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  useEffect(() => {
    if (base64Image) {
      runAnalysis();
    }
  }, [base64Image]);

  const runAnalysis = async () => {
    try {
      setLoading(true);

      setError(null);

      console.log("BASE64 LENGTH:", base64Image?.length);

      const result = await analyzeImage(base64Image);

      console.log("Gemini Response:", result);

      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("No Gemini response");
      }

      const cleanedJSON = text

        .replace(/```json/g, "")

        .replace(/```/g, "")

        .trim();

      const parsed: Analysis = JSON.parse(cleanedJSON);

      setAnalysis(parsed);
    } catch (err) {
      console.log("Gemini Error:", err);

      setError("Unable to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.text}>Analyzing image...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>

        <Text style={styles.retry} onPress={runAnalysis}>
          Retry
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Analysis Result</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Objects:</Text>

        {analysis?.objects.map((item: string, index: number) => (
          <Text key={index}>• {item}</Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Context:</Text>

        <Text>{analysis?.context}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Activities:</Text>

        <Text>{analysis?.activities}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Recommendations:</Text>

        <Text>{analysis?.recommendations}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,

    backgroundColor: "#fff",
  },

  center: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    padding: 20,
  },

  text: {
    marginTop: 15,

    fontSize: 16,
  },

  error: {
    color: "red",

    textAlign: "center",

    fontSize: 16,
  },

  retry: {
    marginTop: 20,

    color: "blue",

    fontSize: 18,
  },

  title: {
    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 20,
  },

  card: {
    backgroundColor: "#f2f2f2",

    padding: 15,

    borderRadius: 10,

    marginBottom: 15,
  },

  label: {
    fontWeight: "bold",

    fontSize: 18,

    marginBottom: 8,
  },
});
