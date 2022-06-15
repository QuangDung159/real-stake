import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {THEME} from '~/Constants';

export default function CountryItem({
  onPress,
  countryItem,
  itemContainerStyle,
  emojiStyle,
  nameStyle,
  capitalStyle,
}) {
  const renderCountryItem = item => {
    return (
      <TouchableOpacity onPress={() => onPress && onPress(item)}>
        <View
          style={[
            {
              marginBottom: 20,
              marginHorizontal: 20,
              justifyContent: 'center',
              flex: 1,
              ...THEME.SHADOW,
            },
            itemContainerStyle,
          ]}>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              alignItems: 'center',
              borderRadius: 5,
              backgroundColor: '#ffffff',
              flex: 1,
            }}>
            <View>
              <Text
                style={[
                  {
                    fontSize: 45,
                    marginHorizontal: 10,
                    flex: 2,
                  },
                  emojiStyle,
                ]}>
                {item.emoji}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flex: 8,
              }}>
              <Text
                style={[
                  {
                    fontSize: 16,
                    fontWeight: 'bold',
                    paddingRight: 10,
                  },
                  nameStyle,
                ]}
                numberOfLines={1}>
                {item.name}
              </Text>
              <Text
                style={[
                  {
                    fontSize: 16,
                  },
                  capitalStyle,
                ]}>
                {item.capital}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return <>{renderCountryItem(countryItem)}</>;
}
