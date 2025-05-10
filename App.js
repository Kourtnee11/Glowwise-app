import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './components/Button';
import Card from './components/Card';

export default function App() {
  return (
    <View style={styles.container}>
      <Card title="Welcome to GlowWise">
        <Text style={styles.welcome}>Your personal wellness companion</Text>
        <Button onPress={() => alert('Get Started!')} title="Get Started" />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  welcome: {
    fontSize: 18,
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
});
