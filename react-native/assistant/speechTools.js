import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice'; //https://github.com/react-native-voice/voice

// Function to speak WORKS
export function sayThis(script, voice) {
  const options = {'voice':voice}
  const speak = () => {
    Speech.speak(script, options);
  };return speak
}

// Function to get text from speech NEEDS TESTED
export const startSpeech = (setQuery, setIsListening) => {
  return new Promise((resolve, reject) => {
    // console.log('Voice.isRecognizing()', Voice.isRecognizing())
    // if(Voice.isRecognizing()) reject('The voice module is busy')
    let transcription = '';

    const handleResults = async (results) => {
      console.log('How many times does this run?', results)
      transcription = results.value[0];
      setQuery(transcription);
      console.log(transcription)
      setIsListening(false);
      // Optionally, you can resolve the promise here if needed
      const error = Voice.stop();
      console.log('error', error)
      resolve(transcription);
    };

    Voice.onSpeechResults = handleResults;
    Voice.start('en-US');
  });
};

export const cleanupAfterSpeech = () => {
  Voice.removeAllListeners('onSpeechResults');
  Voice.removeAllListeners('onSpeechEnd');
  Voice.removeAllListeners('onSpeechError');
  console.log('Cleanup: All listeners removed.');
};

const stopSpeechToText = async () => {
  await Voice.stop();
  setStarted(false);
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