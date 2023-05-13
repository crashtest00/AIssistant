import {FAKE_KEY} from "@env"
import * as axios from "axios"


export async function getQueryResult(queryString) {
    console.log(FAKE_KEY)
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          'model': 'gpt-3.5-turbo',
          'messages': [
            {
              'role': 'user',
              'content': queryString
            }
          ],
          'temperature': 0.7
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + FAKE_KEY
          }
        }
      );
      console.log(response)
    return 'This function is under construction'
}