import React from 'react';
import {FlatList, Text, View} from 'react-native';
import CountryItem from './CountryItem';

export default function ListCountry({
  listCountry,
  onPressItem,
  containerStyle,
  title,
  titleStyle,
  titleContainerStyle,
  itemContainerStyle,
  emojiStyle,
  nameStyle,
  capitalStyle,
}) {
  return (
    <FlatList
      contentContainerStyle={[containerStyle]}
      showsVerticalScrollIndicator={false}
      data={listCountry}
      keyExtractor={item => item.code}
      renderItem={({item}) => (
        <CountryItem
          onPress={() => onPressItem && onPressItem(item)}
          countryItem={item}
          itemContainerStyle={itemContainerStyle}
          emojiStyle={emojiStyle}
          nameStyle={nameStyle}
          capitalStyle={capitalStyle}
        />
      )}
      ListHeaderComponent={() => (
        <View
          style={[
            {
              marginHorizontal: 20,
              marginBottom: 20,
            },
            titleContainerStyle,
          ]}>
          <Text
            style={[
              {
                fontSize: 16,
                fontWeight: 'bold',
                paddingTop: 10,
              },
              titleStyle,
            ]}>
            {title}
          </Text>
        </View>
      )}
    />
  );
}
