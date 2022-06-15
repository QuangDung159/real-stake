import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {THEME} from '~/Constants';
import Images from '~/Images';

export default function ThemeButton({isDark, setIsDark}) {
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
        right: 20,
        ...THEME.SHADOW,
      }}
      onPress={async () => {
        console.log('isDark :>> ', isDark);
        setIsDark(!isDark);
      }}>
      <Image
        source={isDark ? Images.sun : Images.moon}
        style={{
          tintColor: isDark ? THEME.DARK.TEXT : THEME.LIGHT.TEXT,
          width: 40,
          height: 40,
        }}
      />
    </TouchableOpacity>
  );
}
