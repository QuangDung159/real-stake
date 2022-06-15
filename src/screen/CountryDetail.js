import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import HomeButton from '~/Components/HomeButton';
import StatusBarContent from '~/Components/StatusBarContent';
import ThemeButton from '~/Components/ThemeButton';
import {SCREEN_NAME, SCREEN_TITLE, THEME} from '~/Constants';

export default function CountryDetail({country, componentId}) {
  const [theme, setTheme] = useState(THEME.DARK);
  const [isDark, setIsDark] = useState(true);

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
      <Text
        style={{
          fontSize: 100,
          color: theme.TEXT,
        }}>
        {country.emoji}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.TEXT,
        }}>
        {country.name}
      </Text>
      <View
        style={{
          width: '100%',
        }}>
        {renderInfo('Alpha2Code', country.code)}
        {renderInfo('callingCode', `+${country.phone}`)}
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
                  continent: country.continent,
                },
              },
            });
          }}>
          {renderInfo('continent', `+${country.continent.name}`)}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
