import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';

const CustomButton = props => {
  const {title, onPress, type = 'PRIMARY'} = props;
  return (
    <TouchableOpacity
      style={[styles.container, styles[`container_${type}`]]}
      onPress={onPress}>
      <Text style={[styles.title, styles[`title_${type}`]]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 6,
    shadowOffset: 1,
  },
  container_PRIMARY: {
    backgroundColor: '#829FEC',
  },
  container_SECONDARY: {
    backgroundColor: '#EDEDF3',
    elevation: 0,
  },
  container_RED: {
    backgroundColor: '#FF0000',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  title_SECONDARY: {
    color: '#393939',
  },
});

export default CustomButton;
