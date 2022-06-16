import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import HomeButton from '~/Components/HomeButton';
import InfoInlineText from '~/Components/InfoInlineText';
import StatusBarContent from '~/Components/StatusBarContent';
import ThemeButton from '~/Components/ThemeButton';
import {SCREEN_NAME, THEME} from '~/Constants';
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

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        width: THEME.WIDTH,
        flex: 1,
        backgroundColor: theme.SUB_BACKGROUND,
      }}>
      <StatusBarContent isDark={isDark} />
      <ThemeButton isDark={isDark} setIsDark={setIsDark} />
      <HomeButton isDark={isDark} componentId={componentId} />
      {countryDetail && (
        <View
          style={{
            backgroundColor: theme.BACKGROUND,
            borderRadius: 10,
            marginHorizontal: 20,
            width: THEME.WIDTH - 40,
            alignItems: 'center',
            ...THEME.SHADOW,
          }}>
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
              marginBottom: 20,
            }}>
            {countryDetail.name}
          </Text>
          <View
            style={{
              width: '100%',
            }}>
            <InfoInlineText
              left={'Alpha2Code'}
              right={countryDetail.code}
              theme={theme}
            />
            <InfoInlineText
              left={'callingCode'}
              right={`+${countryDetail.phone}`}
              theme={theme}
            />
            <TouchableOpacity
              onPress={() => {
                Navigation.push(componentId, {
                  component: {
                    name: SCREEN_NAME.CONTINENT_DETAIL,
                    passProps: {
                      continentCode: countryDetail.continent.code,
                    },
                  },
                });
              }}>
              <InfoInlineText
                left={'continent'}
                right={`+${countryDetail.continent.name}`}
                theme={theme}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
