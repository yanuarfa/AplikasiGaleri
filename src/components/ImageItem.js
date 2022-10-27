import { TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import React from "react";

const ImageItem = (props) => {
  const { source, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={{ uri: source }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 130,
    height: 130,
    // backgroundColor: 'red',
    margin: 1,
  },
});

export default ImageItem;
