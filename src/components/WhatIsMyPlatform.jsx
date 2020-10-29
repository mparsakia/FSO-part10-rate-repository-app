import { React } from 'react';
import { Platform, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: Platform.select({
      android: 'green',
      ios: 'blue',
      default: 'red',
    }),
    fontWeight: 'bold',
    fontSize: 24,
  },
});

const WhatIsMyPlatform = () => {
  return <Text style={styles.text}>Your platform is: {Platform.OS}</Text>;
};

export default WhatIsMyPlatform;

/**
 * 
 * We can even use the Platform.select method to require a platform specific component:

const MyComponent = Platform.select({
  ios: () => require('./MyIOSComponent'),
  android: () => require('./MyAndroidComponent'),
})();

<MyComponent />;


However, a more sophisticated method for implementing 
and importing platform 
specific components (or any other piece of code) is to 
use the .io.jsx and .android.jsx
 file extensions. Note that the .jsx extension can as 
 well be any extensions recognized by 
 the bundler, such as .js. We can for example 
 have files Button.ios.jsx and Button.android.jsx
  which we can import like this:

import React from 'react';

import Button from './Button';

const PlatformSpecificButton = () => {
  return <Button />;
};
Now, the Android bundle of the application will have the component 
defined in the Button.android.jsx whereas the iOS bundle the
 one defined in the Button.ios.jsx file.
 */
