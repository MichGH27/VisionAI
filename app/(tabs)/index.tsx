import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vision AI</Text>

      <Text style={styles.subtitle}>
        Capture an image and let Vision AI analyze it.
      </Text>

      <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => router.push("/camera")}
      >
        <MaterialIcons name="camera-alt" size={24} color="#fff" />
        <Text style={styles.cameraText}>Open Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },

  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E5BBA",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },

  cameraText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
