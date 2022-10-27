import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LearnNetworking = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [myData, setMyData] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getApiData = async () => {
    if (username === '' || password === '') {
      console.error('Username or password not filled');
      return null;
    }

    try {
      setIsLoading(true);
      const getData = await fetch(
        'https://playgroundapi.com/bootcamp/api/web/user/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );
      if (getData.status === 200) {
        const results = await getData.json();
        setMyData(results);
        setIsLoading(false);
        await AsyncStorage.setItem('token', results.data.token);
        navigation.navigate('HomePage');
      }
    } catch (e) {
      console.error(e);
    }

    return null;
  };

  useEffect(() => {
    console.log(myData);
  }, [myData]);

  return (
    <View>
      <TextInput
        onChangeText={value => setUsername(value)}
        value={username}
        placeholder="username"
      />
      <TextInput
        onChangeText={value => setPassword(value)}
        value={password}
        placeholder="password"
      />
      <Button onPress={() => getApiData()} title="Login" />
      {isLoading ? <ActivityIndicator /> : null}
    </View>
  );
};

const style = StyleSheet.create({});

export default LearnNetworking;
