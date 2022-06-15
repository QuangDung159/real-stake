import React from 'react';
import {StatusBar} from 'react-native';
import {THEME} from '~/Constants';

export default function StatusBarContent({isDark}) {
  return (
    <StatusBar
      animated={true}
      backgroundColor={
        isDark ? THEME.DARK.SUB_BACKGROUND : THEME.LIGHT.SUB_BACKGROUND
      }
      barStyle={isDark ? 'light-content' : 'dark-content'}
    />
  );
}
