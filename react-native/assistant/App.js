import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import * as speechTools from './speechTools';
import * as chatQuery from './chatQuery';
import * as noteWriter from './noteWriter';
import Voice from '@react-native-voice/voice';

export default function App() {
  // Set states & defaults
  const [isListening, setListening] = useState(false); 
  const [isWriting, setWriting] = useState(false);
  const [isSessionActive, setSessionActive] = useState(false); //Could eventually be used to update button text for single button ver
  const [lastQueryResult, setLastQueryResult] = useState('')
  const [thingToSay, setThingToSay] = useState('No text has been recognized yet');
  const voice = 'en-au-x-auc-local' // Eventually this should call the getVoices function so the user can select

  // Start Session
  const startSession = async () => {
    setSessionActive(true);
    setListening(true);
    console.log("Session started successfully")

    // Get speech & writeNote bool. 
    const { queryString, writeNote } = await speechTools.startSpeech();

    console.log("Query String:", queryString);
    console.log("Write Note:", writeNote);
  
    setThingToSay(queryString);

    speechTools.cleanupAfterSpeech();


   'App.js successfully accessed startSpeech'
    // TODO: It would be nice to get a beep when the system is listening.

    // If writeNote = False, then treat the query string as a search query and hit the CGPT api
    if(!writeNote) {
      setWriting(false);
      const queryResult = 'Query is under construction'
      // const queryResult = await chatQuery.getQueryResults(queryString);
      // setLastQueryResult(queryResult);
      speechTools.sayThis(queryResult);
    } else {
      setWriting(true);
      const response = 'This is under construction'
      // const response = await noteWriter(lastQueryResult);
      speechTools.sayThis(response);
    }
  };


    // TODO: Add while loop to keep the conversation going


  const stopSession = async () => {

  }
  
  // Text to Speech

  // TODO: Add a page to view/manage notes: https://reactnative.dev/docs/navigation & the related function in noteWriter
  // Potentially useful tutorial: https://www.waldo.com/blog/react-native-side-menu-guide
  return (
    <View style={styles.container}>
      <Text style={styles.Texts}>{thingToSay}</Text>
      <Button title='Start Session' onPress={startSession} />
      <Button title='Stop Voice' onPress={stopSession} />
      <Button title='en-au-x-auc-local' onPress={() => speechTools.sayThis(thingToSay, voice)()} />
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

