import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import CountryItem from '~/Components/CountryItem';
import HomeButton from '~/Components/HomeButton';
import InfoInlineText from '~/Components/InfoInlineText';
import ListCountry from '~/Components/ListCountry';
import StatusBarContent from '~/Components/StatusBarContent';
import ThemeButton from '~/Components/ThemeButton';
import {SCREEN_NAME, SCREEN_TITLE, THEME} from '~/Constants';
import {fetchContinentByCode} from '~/services/Country';

export default function ContinentDetail({continentCode, componentId}) {
  const [listCountry, setListCountry] = useState([]);
  const [theme, setTheme] = useState(THEME.DARK);
  const [isDark, setIsDark] = useState(true);
  const [continentDetail, setContinentDetail] = useState();

  useEffect(() => {
    getContinentDetail(continentCode);
  }, [continentCode]);

  useEffect(() => {
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

  const getContinentDetail = async code => {
    const res = await fetchContinentByCode(code);
    if (res.success) {
      setListCountry(res.data.continent.countries);
      setContinentDetail(res.data.continent);
    }
  };

  const navigateToCountry = useCallback(
    (country, countryCode) => {
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
            countryCode,
            country,
          },
        },
      });
    },
    [componentId],
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.SUB_BACKGROUND,
        flex: 1,
      }}>
      <StatusBarContent isDark={isDark} />
      <ThemeButton isDark={isDark} setIsDark={setIsDark} />
      <HomeButton isDark={isDark} componentId={componentId} />
      {continentDetail && (
        <>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginVertical: 20,
                color: theme.TEXT,
              }}>
              {continentDetail.name}
            </Text>
          </View>
          <InfoInlineText
            left={'Code'}
            right={continentDetail.code}
            theme={theme}
          />
          <ListCountry
            listCountry={listCountry}
            renderItem={({item}) => (
              <CountryItem
                onPress={() => navigateToCountry(item, item.code)}
                countryItem={item}
                theme={theme}
              />
            )}
            theme={theme}
          />
        </>
      )}
    </SafeAreaView>
  );
}
