import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import React, { useState, useCallback } from "react";
import DocumentPicker, { types } from "react-native-document-picker";

import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const Uploadpage = ({ route }) => {
  const navigation = useNavigation();
  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [fileResponse, setFileResponse] = useState([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
        type: [types.images],
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const postData = async () => {
    const data = new FormData();
    data.append("title", dataTitle);
    data.append("description", dataDescription);
    data.append("image", fileResponse[0]);
    try {
      console.log(fileResponse[0]);
      console.log(data);
      // setIsLoading(true);
      const postData = await fetch(
        "https://playgroundapi.com/bootcamp/api/web/posting/post-data",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${route.params.token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: data,
        }
      );

      const res = await postData.json();
      console.log("ini res" + JSON.stringify(res));
      if (res.code == 200) {
        Alert.alert("Success", res.message);
        navigation.navigate("Homepage");
      }
      if (res.code == 503) {
        Alert.alert("Alert", res.message);
      }
    } catch (e) {
      console.error(e);
      // setIsLoading(false);
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Upload Files Here</Text>
      </View>
      <View style={styles.wrapperForm}>
        <Input placeholder="Title" value={dataTitle} setValue={setDataTitle} />
        <Input
          placeholder="Description"
          value={dataDescription}
          setValue={setDataDescription}
          multiline={true}
        />
        <View style={{ textAlign: "center" }}>
          {fileResponse.map((file, index) => (
            <Text
              key={index.toString()}
              style={styles.uri}
              numberOfLines={1}
              ellipsizeMode={"middle"}
            >
              {file?.name}
            </Text>
          ))}
        </View>
        <Button title="Select File" onPress={handleDocumentSelection} />
      </View>
      <View style={styles.buttonUploadWrapper}>
        <CustomButton title="Upload" onPress={() => postData()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleWrapper: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperForm: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
  form: {
    marginVertical: 10,
    width: "90%",
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#BFC0CA",
    paddingHorizontal: 20,
  },
  uri: {
    padding: 20,
    width: "90%",
    marginVertical: 10,
  },
  buttonUploadWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Uploadpage;
