import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import AutoFill from '@react-native-ohos-community/auto-fill';

const MyPasswordComponent = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    AutoFill.autoSave(
      () => {
        console.log('AutoFillTurboModule success in js is been called');
      },
      () => {
        console.log('AutoFillTurboModule failed in js is been called');
      },
    );
  };

  return (
    <View style={styles.container}>
      {/* username */}
      <TextInput
        style={styles.input}
        placeholder="username"
        value={userName}
        onChangeText={setUserName}
        autoCapitalize="words"
        textContentType="username"
      />
      {/* password */}
      <TextInput
        style={styles.input}
        placeholder="password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        keyboardType="numeric"
        textContentType="password"
      />
      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 50,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default MyPasswordComponent;
