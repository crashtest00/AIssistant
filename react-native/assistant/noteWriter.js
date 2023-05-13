// Tools to facilitate local storage of notes in key/value store
// https://react-native-async-storage.github.io/async-storage/docs/api
import AsyncStorage from '@react-native-async-storage/async-storage';

export function noteWriter() {
    //some code
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@storage_Key', value) // Need to pass in key. datetime?
          confirmation = 'The note was saved successfully!'
        } catch (e) {
          // saving error
          confirmation = 'The note could not be saved!'
        }
      }
    return confirmation
}

// TODO: Add a function to list all keys so history can be retrieved
// use getAllKeys