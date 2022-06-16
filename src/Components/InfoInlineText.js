import {View, Text} from 'react-native';
import React from 'react';

export default function InfoInlineText({left, right, theme, containerStyle}) {
  const renderInfo = () => {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginBottom: 10,
          },
          containerStyle,
        ]}>
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

  return <>{renderInfo(left, right)}</>;
}
