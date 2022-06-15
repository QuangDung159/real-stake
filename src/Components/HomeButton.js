import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {SCREEN_NAME, SCREEN_TITLE, THEME} from '~/Constants';
import Images from '~/Images';

export default function HomeButton({isDark, setIsDark, componentId}) {
  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: isDark
          ? THEME.DARK.BACKGROUND
          : THEME.LIGHT.BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 99,
        bottom: 20,
        left: 20,
        ...THEME.SHADOW,
      }}
      onPress={() => {
        Navigation.push(componentId, {
          component: {
            name: SCREEN_NAME.HOME,
            options: {
              topBar: {
                title: {
                  text: SCREEN_TITLE.CONTINENT_DETAIL,
                },
              },
            },
          },
        });
      }}>
      <Image
        source={Images.home}
        style={{
          tintColor: isDark ? THEME.DARK.TEXT : THEME.LIGHT.TEXT,
          width: 40,
          height: 40,
        }}
      />
    </TouchableOpacity>
  );
}
