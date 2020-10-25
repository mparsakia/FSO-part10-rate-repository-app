/*
    in addition to an object, the style prop also accepts an array of objects. 
    In the case of an array, the objects are merged from left to right so that 
    latter style properties take precedence. This works recursively, so we can have 
    for example an array containing an array of styles and so forth. If an array 
    contains values that evaluate to false, such as null or undefined, these values
    are ignored. This makes it easy to define conditional styles for example, 
    based on the value of a prop. Here is an example of conditional styles:
*/

import React from 'react';
import { Text, StyleSheet } from 'react-native';

// there are no css "units" in ReactNative except for "density independent pixels"
// these are the css classes -- but we use the camel cased react version
const styles = StyleSheet.create({
  text: {
    color: 'grey',
    fontSize: 14,
  },
  blueText: {
    color: 'blue',
  },
  bigText: {
    fontSize: 24,
    fontWeight: '700',
  },
});

const FancyText = ({ isBlue, isBig, children }) => {
  const textStyles = [
    styles.text,
    isBlue && styles.blueText,
    isBig && styles.bigText,
  ];

  return <Text style={textStyles}>{children}</Text>;
};

const ConditionalCSSExample = () => {
  return (
    <>
      <FancyText>Simple text</FancyText>
      <FancyText isBlue>Blue text</FancyText>
      <FancyText isBig>Big text</FancyText>
      <FancyText isBig isBlue>
        Big blue text
      </FancyText>
    </>
  );
};

export default ConditionalCSSExample;
