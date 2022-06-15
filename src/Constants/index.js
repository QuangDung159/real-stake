import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const SCREEN_NAME = {
  HOME: 'HOME',
  COUNTRY_DETAIL: 'COUNTRY_DETAIL',
  CONTINENT_DETAIL: 'CONTINENT_DETAIL',
};

export const SCREEN_TITLE = {
  HOME: 'Home',
  COUNTRY_DETAIL: 'Country Detail',
  CONTINENT_DETAIL: 'Continent Detail',
};

export const THEME = {
  SHADOW: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
  },
  WIDTH: windowWidth,
  HEIGHT: windowHeight,
};
