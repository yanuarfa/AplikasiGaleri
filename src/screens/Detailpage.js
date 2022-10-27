import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";

const Detailpage = ({ route }) => {
  // console.log(route.params.imageId);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileWrapper}>
        <Image
          source={{ uri: route.params.avatar }}
          style={styles.profilePicture}
        />
        <Text style={styles.username}>{route.params.username}</Text>
      </View>
      <View style={styles.contentWrapper}>
        <Image
          source={{
            uri: route.params.paramKey.full_image_url,
          }}
          style={styles.image}
        />
        <Text style={styles.title}>{route.params.paramKey.title}</Text>
        <Text style={styles.description}>
          {route.params.paramKey.description}
        </Text>
        <Text style={styles.timestamp}>
          Di unggah pada {route.params.paramKey.created_at}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#6889E0",
    borderRadius: 20,
  },
  username: {
    fontSize: 16,
    marginStart: 10,
  },
  contentWrapper: {
    flex: 5,
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 500,
    maxHeight: 400,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
  },
  timestamp: {
    marginVertical: 20,
  },
});

export default Detailpage;
