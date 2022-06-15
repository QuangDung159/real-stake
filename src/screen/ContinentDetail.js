import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import HomeButton from '~/Components/HomeButton';
import InfoInlineText from '~/Components/InfoInlineText';
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
    console.log('code :>> ', code);
    const res = await fetchContinentByCode(code);
    console.log('res :>> ', res);
    if (res.success) {
      setListCountry(res.data.continent.countries);
      setContinentDetail(res.data.continent);
    }
  };

  const renderCountryItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
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
          <FlatList
            contentContainerStyle={{
              paddingBottom: 80,
            }}
            showsVerticalScrollIndicator={false}
            data={listCountry}
            keyExtractor={item => item.code}
            renderItem={({item}) => <>{renderCountryItem(item)}</>}
            ListHeaderComponent={() => (
              <View
                style={{
                  marginHorizontal: 20,
                  marginBottom: 20,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    paddingTop: 10,
                    color: theme.TEXT,
                  }}>
                  List of countries
                </Text>
              </View>
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}
