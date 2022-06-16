import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {THEME} from '~/Constants';

export default function CountryItem({
  onPress,
  countryItem,
  containerStyle,
  emojiStyle,
  nameStyle,
  capitalStyle,
  theme,
}) {
  const renderCountryItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress && onPress();
        }}>
        <View
          style={[
            {
              marginBottom: 20,
              marginHorizontal: 20,
              justifyContent: 'center',
              flex: 1,
              elevation: 10,
              ...THEME.SHADOW,
            },
            containerStyle,
          ]}>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              alignItems: 'center',
              borderRadius: 5,
              backgroundColor: theme.BACKGROUND,
              flex: 1,
            }}>
            <View
              style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  {
                    fontSize: 35,
                    marginHorizontal: 10,
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
                    color: theme.TEXT,
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
                    color: theme.TEXT,
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
