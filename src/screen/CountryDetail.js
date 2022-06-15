import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {THEME} from '~/Constants';

export default function CountryDetail({country}) {
  useEffect(() => {
    console.log('country :>> ', country);
  }, [country]);

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
        {renderInfo('continent', `+${country.continent.name}`)}
      </View>
    </View>
  );
}
