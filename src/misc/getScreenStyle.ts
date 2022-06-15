import {Platform} from 'react-native';

export const getScreenStyle = () => ({
  topBar: {
    visible: false,
  },
  statusBar: {
    style: Platform.OS === 'ios' ? ('dark' as const) : ('light' as const),
    backgroundColor: 'black',
  },
  navigationBar: {
    backgroundColor: 'black',
  },
  layout: {
    backgroundColor: 'white',
  },
});
