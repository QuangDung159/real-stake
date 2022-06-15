import React from 'react';
import {StatusBar} from 'react-native';

export default function StatusBarContent({isDark}) {
  return (
    <StatusBar
      animated={true}
      backgroundColor="#61dafb"
      barStyle={isDark ? 'light-content' : 'dark-content'}
    />
  );
}
