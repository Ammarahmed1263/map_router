import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EllipsisDots = ({ count, dotSize, color }) => {
  const dots = Array.from({ length: count }, (_, index) => (
    <Text key={index} style={[styles.dot, { fontSize: dotSize, color }]}>•</Text>
  ));

  return <View>{dots}</View>;
};

const styles = StyleSheet.create({
  dot: {
    marginVertical: -4,
  },
});

export default EllipsisDots;
