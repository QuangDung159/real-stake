import React from 'react';
import {Text} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import styled from 'styled-components/native';
import {getScreenStyle} from './misc/getScreenStyle';

export const HomeScreen: NavigationFunctionComponent<Props> = () => {
  return (
    <Root>
      <Title>Welcome to RN lab!</Title>
      <Text>Your journey starts here</Text>
    </Root>
  );
};

//#region
type Props = {};

const Root = styled.View`
  flex: 1;
  background-color: #e6eeff;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

HomeScreen.options = getScreenStyle();
//#endregion
