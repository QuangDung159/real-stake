import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {SCREEN_NAME, SCREEN_TITLE, THEME} from '~/Constants';
import {fetchContinentByCode} from '~/services/Country';

export default function ContinentDetail({continent, componentId}) {
  const [listCountry, setListCountry] = useState([]);

  useEffect(() => {
    getContinentDetail(continent.code);
  }, [continent.code]);

  const getContinentDetail = async code => {
    const res = await fetchContinentByCode(code);
    console.log('getContinentDetail :>> ', res);
    if (res.success) {
      setListCountry(res.data.continent.countries);
    }
  };

  const renderCountryItem = item => {
    return (
      <TouchableOpacity
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
              passProps: {
                country: item,
              },
            },
          });
        }}>
        <View
          style={{
            marginBottom: 20,
            marginHorizontal: 20,
            justifyContent: 'center',
            flex: 1,
            ...THEME.SHADOW,
          }}>
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
                style={{
                  fontSize: 45,
                  marginHorizontal: 10,
                  flex: 2,
                }}>
                {item.emoji}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flex: 8,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  paddingRight: 10,
                }}
                numberOfLines={1}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                }}>
                {item.capital}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      contentContainerStyle={{
        backgroundColor: '#f7fcf9',
      }}
      showsVerticalScrollIndicator={false}
      data={listCountry}
      keyExtractor={item => item.code}
      renderItem={({item}) => <>{renderCountryItem(item)}</>}
      ListHeaderComponent={() => (
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            List of countries
          </Text>
        </View>
      )}
    />
  );
}
