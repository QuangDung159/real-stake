import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {SCREEN_NAME, SCREEN_TITLE, THEME} from '~/Constants';

export default function CountryDetail({country, componentId}) {
  const renderInfo = (left, right) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginBottom: 10,
        }}>
        <Text>{left}</Text>
        <Text>{right}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        alignItems: 'center',
        width: THEME.WIDTH,
      }}>
      <Text
        style={{
          fontSize: 100,
        }}>
        {country.emoji}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        {country.name}
      </Text>
      <View
        style={{
          width: '100%',
        }}>
        {renderInfo('Alpha2Code', country.code)}
        {renderInfo('callingCode', `+${country.phone}`)}
        <TouchableOpacity
          onPress={() => {
            console.log('first');
            Navigation.push(componentId, {
              component: {
                name: SCREEN_NAME.CONTINENT_DETAIL,
                options: {
                  topBar: {
                    title: {
                      text: SCREEN_TITLE.CONTINENT_DETAIL,
                    },
                  },
                },
                passProps: {
                  continent: country.continent,
                },
              },
            });
          }}>
          {renderInfo('continent', `+${country.continent.name}`)}
        </TouchableOpacity>
      </View>
    </View>
  );
}
