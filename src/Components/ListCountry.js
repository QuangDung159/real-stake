import React from 'react';
import {FlatList, Text, View} from 'react-native';

export default function ListCountry({listCountry, renderItem, theme, title}) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={listCountry}
      keyExtractor={item => item.code}
      renderItem={({item}) => renderItem && renderItem({item})}
      ListHeaderComponent={() => (
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: theme.TEXT,
              marginHorizontal: 20,
              marginVertical: 20,
            }}>
            {title || 'List of countries'}
          </Text>
        </View>
      )}
    />
  );
}
