import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomButton from "../components/CustomButton";
import ImageItem from "../components/ImageItem";

const Homepage = () => {
  const [myAvatar, setMyAvatar] = useState("");
  const [myUsername, setMyUsername] = useState("");
  const [myData, setMyData] = useState([]);
  const [myToken, setMyToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [onSelect, setOnSelect] = useState({});
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <ImageItem
      source={item.full_image_url}
      title={item.title}
      onPress={() => {
        console.log(item);
        // setOnSelect(item.id);
        navigation.navigate("Detailpage", {
          avatar: myAvatar,
          username: myUsername,
          paramKey: item,
        });
      }}
    />
  );

  const getAllData = async () => {
    const token = await AsyncStorage.getItem("token");
    const avatar = await AsyncStorage.getItem("avatar");
    const username = await AsyncStorage.getItem("username");
    setMyToken(token);
    setMyAvatar(avatar);
    setMyUsername(username);

    try {
      // setIsLoading(true);
      const getData = await fetch(
        "https://playgroundapi.com/bootcamp/api/web/posting/list-posting?page=0",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const res = await getData.json();
      // console.log(res);
      if (res.code == 200) {
        setMyData(res.data);
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }

    return null;
  };

  // console.log(myData);

  useEffect(() => {
    getAllData();
    console.log(myData);
  }, [myData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileWrapper}>
        <View style={styles.profilePictureWrapper}>
          <Image source={{ uri: myAvatar }} style={styles.profilePicture} />
        </View>
        <View style={styles.navigatorWrapper}>
          <Text style={styles.username}>{myUsername}</Text>
          <CustomButton
            title="Upload"
            onPress={() =>
              navigation.navigate("Uploadpage", {
                token: myToken,
              })
            }
          />
          <CustomButton
            title="Log out"
            type="RED"
            onPress={async () => (
              await AsyncStorage.removeItem("token"),
              navigation.navigate("Login")
            )}
          />
        </View>
      </View>
      <FlatList
        data={myData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.itemWrapper}
        numColumns={3}
        style={styles.flatlist}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileWrapper: {
    // display: 'flex',
    flexDirection: "row",
    width: "100%",
    height: "20%",
  },
  profilePictureWrapper: {
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 20,
    marginTop: 15,
    marginStart: 10,
  },
  navigatorWrapper: {
    width: "65%",
    alignSelf: "center",
  },
  itemWrapper: {
    flexDirection: "column",
  },
  flatlist: {
    marginTop: 20,
  },
});

export default Homepage;
