import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {SCREEN_NAME, SCREEN_TITLE} from '~/Constants';
import {fetchListCountry} from '~/services/Country';

export default function Home({componentId}) {
  const [listCountry, setListCountry] = useState([]);

  useEffect(() => {
    getListCountry();
  }, []);

  const getListCountry = async () => {
    const res = await fetchListCountry();
    console.log('res :>> ', res);
    if (res.success) {
      setListCountry(res.data.countries);
    }
  };

  return (
    <View>
      <FlatList
        data={listCountry}
        keyExtractor={item => item.name}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
      <Text>Home</Text>
      <Button
        title="press"
        onPress={() => {
          console.log('first');
          Navigation.push(componentId, {
            component: {
              name: SCREEN_NAME.COUNTRY_DETAIL,
              options: {
                topBar: {
                  title: {
                    text: SCREEN_TITLE.COUNTRY_DETAIL,
                  },
                },
              },
            },
          });
        }}
      />
    </View>
  );
}
