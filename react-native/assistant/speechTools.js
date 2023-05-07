import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';
import { counterEvent } from 'react-native/Libraries/Performance/Systrace';

// Function to speak
export function sayThis(script, voice) {
  options = {'voice':voice}
  const speak = () => {
    Speech.speak(script, options);
  };return speak
}

// Function to get text from speech
export const getText = async () => {
    try {
      await Voice.start('en-US');
      const speechResults = await Voice.stop();
      return speechResults.value[0];
    } catch (e) {
      console.error(e);
    }
  };

export const startVoiceRecognition = async () => {
  await Voice.start('en-US');
  console.log("Speech Recognition Service: ", await Voice.getSpeechRecognitionServices())
  console.log("Voice is available: ", await Voice.isAvailable());
  console.log("Voice is Recognizing: ", await Voice.isRecognizing())
  Voice.onSpeechResults = async () => {
    console.log(e[0])
  }
  console.log("Transcription: ", Voice.onSpeechPartialResults)
};

  export const stopVoiceRecognition = async () => {
    console.log('Voice recognition stopped.');
    Voice.stop();
    console.log(await Voice.isAvailable())


    console.log(Voice.onSpeechResults)
  };
  
// Utility for getting list of voices
export async function getVoices() {
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