import React, { useState, useEffect } from 'react';
import {
  Button,
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AutoFill from '@react-native-ohos-community/auto-fill';
import { TestSuite, TestCase, Tester } from '@rnoh/testerino';

type PropsType = {
  hideBtn?: boolean;
};

const ContactsComponent = (props: PropsType) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        autoCapitalize="words"
        textContentType="name"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={emailAddress}
        onChangeText={setEmailAddress}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
    </View>
  );
};

const HomeStack = createStackNavigator();

const callbackAlert = (msg: string) => Alert.alert(msg);
function HomeScreen({ navigation }: any) {
  const autoSaveAction = () => {
    return AutoFill.autoSave(
      () => callbackAlert('save success'),
      () => callbackAlert('save failed'),
    );
  };

  useEffect(() => {
    const unsubscribeBlur = navigation?.addListener('blur', () =>
      autoSaveAction(),
    );

    return () => unsubscribeBlur?.();
  }, [navigation]);

  const submitAction = () => {
    if (navigation) {
      return navigation.navigate('Details');
    }
    autoSaveAction();
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <ContactsComponent hideBtn />
        <Button
          title={navigation ? 'Go to Details' : 'Save'}
          onPress={submitAction}
        />
      </View>
    </View>
  );
}

function DetailScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
const App = () => {
  return (
    <ScrollView style={{ flex: 1, paddingTop: 30, backgroundColor: '#222' }}>
      <Tester>
        <TestSuite name="Save when click the button">
          <TestCase itShould="Save the form information when you click the Save button">
            <View style={{ height: 300 }}>
              <HomeScreen showAccount />
            </View>
          </TestCase>

          <TestCase itShould="Save failed when clicking too fast">
            <View style={{ height: 300 }}>
              <HomeScreen showAccount />
            </View>
          </TestCase>
        </TestSuite>
        <TestSuite name="Save when jumping to the page">
          <TestCase itShould="Click the button to trigger a page jump. After the jump, the form information is automatically saved">
            <View style={{ height: 400 }}>
              <NavigationContainer>
                <HomeStack.Navigator>
                  <HomeStack.Screen name="Home" component={HomeScreen} />
                  <HomeStack.Screen name="Details" component={DetailScreen} />
                </HomeStack.Navigator>
              </NavigationContainer>
            </View>
          </TestCase>
        </TestSuite>
      </Tester>
      <View style={{ height: 200 }} />
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
