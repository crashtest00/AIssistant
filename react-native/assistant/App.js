import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import * as Speech from 'expo-speech';
import { sayThis } from './speechTools';
import { getText } from './speechTools';
import { Audio } from 'expo-av'

export default function App() {
  const [thingToSay, setThingToSay] = useState('');
  //const thingToSay = "Here's some really awesome text for the groovy Australian woman to say."
  voice = 'en-au-x-auc-local'

  const handleSpeechToText = async () => {
    const recognizedText = await getText();
    setThingToSay(recognizedText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Texts}>{thingToSay}</Text>
      <Button title='Speech to text' onPress={handleSpeechToText} />
      <Button title='en-au-x-auc-local' onPress={() => sayThis(thingToSay, voice)} />
    </View>
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  Texts: {
    marginTop: 10,
    color: 'black',
    padding:10,
  }
})

async function getVoices() {
  const availableVoices = await Speech.getAvailableVoicesAsync();
  if (availableVoices.length) {
    // Everything OK
  } else {
    // Try again
    console.log("No Voices Available. Trying again to get voices...");
    console.log("Waiting 1000ms");
    let tryAgainResult = [];
    for (let x = 0; x <= 10; x++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          console.log("Trying Again. Retried ", x + 1, " times.");
          resolve(null);
        }, 1000);
      });
      const _availableVoices = await Speech.getAvailableVoicesAsync();
      if (_availableVoices.length) {
        tryAgainResult = _availableVoices;
        console.log("Apparently Had Success Trying. Voices: ", tryAgainResult);
        break;
      }
    }
  }
 if (tryAgainResult.length) { 
    // Voices OK at tryAgainResult
 } else {
    throw new Error('Impossible to get Available Voices');
 }
}
