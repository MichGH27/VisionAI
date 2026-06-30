import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

export default function ResultScreen() {
  const { photoUri, result } = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: photoUri as string }} style={styles.image} />

      <Text style={styles.title}>Vision AI Result</Text>

      <Text style={styles.result}>{result}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/camera")}
      >
        <Text style={styles.buttonText}>Take Another Photo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  result: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    marginTop: 30,
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
