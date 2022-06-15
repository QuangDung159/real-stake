import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import HomeButton from '~/Components/HomeButton';
import StatusBarContent from '~/Components/StatusBarContent';
import ThemeButton from '~/Components/ThemeButton';
import {SCREEN_NAME, SCREEN_TITLE, THEME} from '~/Constants';
import {fetchCountryByCode} from '~/services/Country';

export default function CountryDetail({country, componentId, countryCode}) {
  const [theme, setTheme] = useState(THEME.DARK);
  const [isDark, setIsDark] = useState(true);
  const [countryDetail, setCountryDetail] = useState(country);

  useEffect(() => {
    getTheme();
    getCountryDetail();
  }, [getCountryDetail]);

  useEffect(() => {
    AsyncStorage.setItem('IS_DARK', JSON.stringify(isDark));
    if (isDark) {
      setTheme(THEME.DARK);
    } else {
      setTheme(THEME.LIGHT);
    }
  }, [isDark]);

  const getCountryDetail = useCallback(async () => {
    if (!countryCode) {
      return;
    }
    const res = await fetchCountryByCode(countryCode);
    if (res.success) {
      setCountryDetail(res.data.country);
    }
  }, [countryCode]);

  const getTheme = async () => {
    const localTheme = await AsyncStorage.getItem('IS_DARK');
    setIsDark(JSON.parse(localTheme));
  };

  const renderInfo = (left, right) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: theme.TEXT,
          }}>
          {left}
        </Text>
        <Text
          style={{
            color: theme.TEXT,
          }}>
          {right}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        width: THEME.WIDTH,
        flex: 1,
        backgroundColor: theme.BACKGROUND,
      }}>
      <StatusBarContent isDark={isDark} />
      <ThemeButton isDark={isDark} setIsDark={setIsDark} />
      <HomeButton isDark={isDark} componentId={componentId} />
      {countryDetail && (
        <>
          <Text
            style={{
              fontSize: 100,
              color: theme.TEXT,
            }}>
            {countryDetail.emoji}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: theme.TEXT,
            }}>
            {countryDetail.name}
          </Text>
          <View
            style={{
              width: '100%',
            }}>
            {renderInfo('Alpha2Code', countryDetail.code)}
            {renderInfo('callingCode', `+${countryDetail.phone}`)}
            <TouchableOpacity
              onPress={() => {
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
                      continent: countryDetail.continent,
                    },
                  },
                });
              }}>
              {renderInfo('continent', `+${countryDetail.continent.name}`)}
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
