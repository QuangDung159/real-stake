import React from 'react';
import {Button, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {SCREEN_NAME, SCREEN_TITLE} from '~/Constants';

export default function Home({componentId}) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="press"
        onPress={() => {
          console.log('first');
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
            },
          });
        }}
      />
    </View>
  );
}
