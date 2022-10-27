import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
// import PropTypes from 'prop-types';

const Input = (props) => {
  const {
    value,
    setValue,
    placeholder,
    secureTextEntry,
    multiline = false,
  } = props;
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "90%",
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#BFC0CA",
    paddingHorizontal: 20,
  },
  input: {},
});

// Input.propTypes = {
//   value: PropTypes.string,
//   setValue: PropTypes.string,
//   placeholder: PropTypes.string,
//   secureTextEntry: PropTypes.bool,
// };

// Input.defaultProps = {
//   secureTextEntry: false,
// };

export default Input;
