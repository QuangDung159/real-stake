import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import CountryItem from '~/Components/CountryItem';
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
    Navigation.events().registerScreenPoppedListener(data => {
      getTheme();
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('IS_DARK', JSON.stringify(isDark));
    if (isDark) {
      setTheme(THEME.DARK);
    } else {
      setTheme(THEME.LIGHT);
    }
  }, [isDark]);

  useEffect(() => {
    Linking.getInitialURL()
      .then(url => {
        handleDeepLink({url});
      })
      .catch(err => Alert.alert(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', handleDeepLink);

    return function cleanup() {
      Linking.addEventListener('url', handleDeepLink);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const navigateToContinent = useCallback(
    continentCode => {
      Navigation.push(componentId, {
        component: {
          name: SCREEN_NAME.CONTINENT_DETAIL,
          passProps: {
            continentCode,
          },
        },
      });
    },
    [componentId],
  );

  const handleDeepLink = useCallback(
    ({url}) => {
      if (!url) {
        return;
      }

      const code = url.substring(url.length - 2);

      if (url.includes('country')) {
        navigateToCountry(null, code);
      } else {
        navigateToContinent(code);
      }
    },
    [navigateToContinent, navigateToCountry],
  );

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

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.SUB_BACKGROUND,
      }}>
      <StatusBarContent isDark={isDark} />
      <ThemeButton isDark={isDark} setIsDark={setIsDark} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={listCountry}
        keyExtractor={item => item.code}
        renderItem={({item}) => (
          <CountryItem
            onPress={() => navigateToCountry(item, item.code)}
            countryItem={item}
            theme={theme}
          />
        )}
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
              List of countries
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
