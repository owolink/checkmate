import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailsScreen({ navigation }) {
  const [input, setInput] = useState('');
  const [savedData, setSavedData] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('userInput', input);
      setSavedData(input);
      alert('Data saved!');
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = async () => {
    try {
      let value = await AsyncStorage.getItem('userInput');
      if (value !== null) {
        setSavedData(value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Type something..."
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={saveData}
      >
        <Text style={styles.buttonText}>Save Data</Text>
      </TouchableOpacity>
      <Text style={styles.savedData}>Saved Data: {savedData}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#6200ee',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  savedData: {
    fontSize: 18,
    marginTop: 20,
  },
});
