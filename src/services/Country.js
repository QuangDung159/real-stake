import axios from 'axios';
import {API_URL, ORIGIN} from '../../Config';

const request = async (method, query) => {
  try {
    const data = JSON.stringify({query});

    const config = {
      method,
      url: API_URL,
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Connection: 'keep-alive',
        DNT: '1',
        Origin: ORIGIN,
      },
      data: data,
    };

    const res = await axios(config);
    return {
      data: res.data.data,
      success: true,
    };
  } catch (error) {
    console.log('error.response :>> ', error.response);
    return {
      data: null,
      success: false,
      message: error.response.data.errors[0].message,
    };
  }
};

export const fetchListCountry = async () => {
  return await request(
    'post',
    `{
        countries {
          code
          name
          native
          capital
          emoji
          currency
          languages {
              code
              name
          }
          phone
          continent {
            name
            code
          }
        }
      }`,
  );
};
