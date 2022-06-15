import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {THEME} from '~/Constants';

export default function ThemeButton({isDark, setIsDark}) {
  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: isDark
          ? THEME.DARK.SUB_BACKGROUND
          : THEME.LIGHT.SUB_BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 99,
        bottom: 20,
        right: 20,
        ...THEME.SHADOW,
      }}
      onPress={() => {
        setIsDark(!isDark);
      }}>
      <Text
        style={{
          fontSize: 12,
          color: isDark ? THEME.DARK.TEXT : THEME.LIGHT.TEXT,
          fontWeight: 'bold',
        }}>
        {isDark ? 'Light' : 'Dark'}
      </Text>
    </TouchableOpacity>
  );
}
