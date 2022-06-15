import {Navigation} from 'react-native-navigation';
import {SCREEN_NAME} from '~/Constants';
import CountryDetail from '~/screen/CountryDetail';
import Home from '~/screen/Home';

Navigation.registerComponent(SCREEN_NAME.HOME, () => Home);
Navigation.registerComponent(SCREEN_NAME.COUNTRY_DETAIL, () => CountryDetail);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: SCREEN_NAME.HOME,
            },
          },
        ],
      },
    },
  });
});
