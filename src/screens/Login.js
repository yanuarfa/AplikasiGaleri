import {
  Image,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Logo from "../../assets/images/Gallery.png";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";

const Login = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [myData, setMyData] = useState({});

  const onRegisterPress = () => {
    console.warn("Register");
  };

  const onForgotPress = () => {
    console.warn("Forgot");
  };

  const getApiData = async () => {
    if (username === "" || password === "") {
      Alert.alert("Username or password should be filled");
      return null;
    }

    try {
      setIsLoading(true);
      const getData = await fetch(
        "https://playgroundapi.com/bootcamp/api/web/user/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      if (getData.status === 500) {
        setIsLoading(false);
        Alert.alert("Username or password wrong!");
        return null;
      }
      if (getData.status === 200) {
        const results = await getData.json();
        setMyData(results);
        setIsLoading(false);
        AsyncStorage.setItem("token", results.data.token);
        AsyncStorage.setItem("username", results.data.username);
        AsyncStorage.setItem("avatar", results.data.avatar_url);
        navigation.navigate("Homepage");
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }

    return null;
  };

  // useEffect(() => {
  //   console.log(myData);
  // }, [myData]);

  return (
    <View style={styles.container}>
      <Text style={[styles.h1, { marginTop: 10 }]}>Cloud Gallery</Text>
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />
      <Text style={styles.h2}>Login</Text>

      <Input value={username} setValue={setUsername} placeholder="Username" />
      <Input
        value={password}
        setValue={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.fpassword} onPress={onForgotPress}>
        <Text>Forgot password?</Text>
      </TouchableOpacity>

      <CustomButton title="Login" onPress={() => getApiData()} />
      {isLoading ? (
        <View style={styles.indicatorWrapper}>
          <ActivityIndicator size="large" color="#4850FF" />
          <Text>Loading...</Text>
        </View>
      ) : null}
      <CustomButton
        title="Register"
        onPress={onRegisterPress}
        type="SECONDARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  logo: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 200,
    padding: 20,
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
  },
  fpassword: {
    alignSelf: "flex-start",
    marginStart: "10%",
    margin: 5,
  },
  indicatorWrapper: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#EFF0FF",
    position: "absolute",
    top: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
