import React, {useState, useEffect} from 'react';
import {
  Button,
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AutoFill from '@react-native-ohos-community/auto-fill';

const PasswordComponent = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="username"
        value={userName}
        onChangeText={setUserName}
        autoCapitalize="words"
        textContentType="username"
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        keyboardType="numeric"
        textContentType="password"
      />
    </View>
  );
};

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
function HomeScreen({navigation}: any) {
  const [showAccount, setShowAccount] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [needNavigate, setNeedNavigate] = useState(false);

  const autoSaveAction = () => {
    return AutoFill.autoSave(
      () => callbackAlert('save success'),
      () => callbackAlert('save failed'),
    );
  }

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => autoSaveAction());

    return () => unsubscribeBlur();
  }, [navigation]);

  const toggleAccount = () => {
    if (showPassword) {
      setShowPassword(false);
    }
    setShowAccount(true);
  };

  const togglePaaword = () => {
    if (showAccount) {
      setShowAccount(false);
    }
    setShowPassword(true);
  };

  const submitAction = () => {
    if (needNavigate) {
      return navigation.navigate('Details')
    }
    autoSaveAction();
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.actionCon}>
        <View style={styles.actionItem}>
          <Text>保存用户信息</Text>
          <Switch onValueChange={toggleAccount} value={showAccount} />
        </View>
        <View style={styles.actionItem}>
          <Text>保存账号密码</Text>
          <Switch onValueChange={togglePaaword} value={showPassword} />
        </View>
        <View style={styles.actionItem}>
          <Text>启用页面跳转</Text>
          <Switch onValueChange={setNeedNavigate} value={needNavigate} />
        </View>
      </View>
      <View style={{padding: 20}}>
        {showAccount && (
          <View>
            <Text>保存用户信息</Text>
            <ContactsComponent hideBtn />
          </View>
        )}
        {showPassword && (
          <View>
            <Text>保存账号密码</Text>
            <PasswordComponent />
          </View>
        )}
        <Button
          title={needNavigate ? 'Go to Details' : 'Save'}
          onPress={submitAction}
        />
      </View>
    </View>
  );
}

function DetailScreen({navigation}: any) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details!</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
const App = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Details" component={DetailScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 30,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  actionCon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  actionItem: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
});
