import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import StatusBarContent from '~/Components/StatusBarContent';
import ThemeButton from '~/Components/ThemeButton';
import {SCREEN_NAME, SCREEN_TITLE, THEME} from '~/Constants';
import {fetchListCountry} from '~/services/Country';

export default function Home({componentId}) {
  const [listCountry, setListCountry] = useState([]);
  const [theme, setTheme] = useState(THEME.DARK);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    getListCountry();
    getTheme();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('IS_DARK', JSON.stringify(isDark));
    if (isDark) {
      setTheme(THEME.DARK);
    } else {
      setTheme(THEME.LIGHT);
    }
  }, [isDark]);

  const getTheme = async () => {
    const localTheme = await AsyncStorage.getItem('IS_DARK');
    setIsDark(JSON.parse(localTheme));
  };

  const getListCountry = async () => {
    const res = await fetchListCountry();
    if (res.success) {
      setListCountry(res.data.countries);
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
              backgroundColor: theme.BACKGROUND,
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
                  color: theme.TEXT,
                }}
                numberOfLines={1}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: theme.TEXT,
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
    <View
      style={{
        backgroundColor: theme.SUB_BACKGROUND,
      }}>
      <StatusBarContent isDark={isDark} />
      <ThemeButton isDark={isDark} setIsDark={setIsDark} />
      <FlatList
        contentContainerStyle={{
          backgroundColor: theme.SUB_BACKGROUND,
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
                color: theme.TEXT,
              }}>
              List of countries
            </Text>
          </View>
        )}
      />
    </View>
  );
}
