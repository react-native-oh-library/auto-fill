import React from 'react';
import { Text, View } from 'react-native';

// This "dummy" AutoFill is to render something for unsupported platforms,
const AutoFill: React.FunctionComponent = () => (
  <View>
    <Text>
      React Native Harmony Community AutoFill does not support this platform.
    </Text>
  </View>
);

export default AutoFill;
