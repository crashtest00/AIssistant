import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { sayThis } from './speechTools';
import { getText } from './speechTools';
import { stopVoiceRecognition } from './speechTools';
import { startVoiceRecognition } from './speechTools';
import Voice from '@react-native-voice/voice';

export default function App() {

  const [thingToSay, setThingToSay] = useState('No text has been recognized yet');
  voice = 'en-au-x-auc-local'

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

