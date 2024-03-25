import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const Header = () => (
  <View style={styles.header}>
    <Text>Your Document Header</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Header;
