import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import * as Speech from 'expo-speech';
import { sayThis } from './speechTools';
import { getText } from './speechTools';
import { stopVoiceRecognition } from './speechTools';
import { startVoiceRecognition } from './speechTools';
import Voice from '@react-native-voice/voice';
import { Audio } from 'expo-av'

export default function App() {
  let [started, setStarted] = useState(false);
  let [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  const startSpeechToText = async () => {
    await Voice.start("en-US");
    setStarted(true);
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result) => {
    setResults(result.value);
    setThingToSay(result.value[0])
    console.log(result.value[0]);
  };

  const onSpeechError = (error) => {
    console.log(error);
  };

  const [thingToSay, setThingToSay] = useState('No text has been recognized yet');
  voice = 'en-au-x-auc-local'

  const handleVoiceStart = () => {
    startVoiceRecognition();
  }
  const handleVoiceStop = () => {
    stopVoiceRecognition();
    console.log("Speech service terminated.")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Texts}>{thingToSay}</Text>
      <Button title='Start Voice' onPress={startSpeechToText} />
      <Button title='Stop Voice' onPress={stopSpeechToText} />
      <Button title='en-au-x-auc-local' onPress={() => sayThis(thingToSay, voice)()} />
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
