import {Navigation} from 'react-native-navigation';
import {SCREEN_NAME} from '~/Constants';
import ContinentDetail from '~/screen/ContinentDetail';
import CountryDetail from '~/screen/CountryDetail';
import Home from '~/screen/Home';

Navigation.registerComponent(SCREEN_NAME.HOME, () => Home);
Navigation.registerComponent(SCREEN_NAME.COUNTRY_DETAIL, () => CountryDetail);
Navigation.registerComponent(
  SCREEN_NAME.CONTINENT_DETAIL,
  () => ContinentDetail,
);

Navigation.setDefaultOptions({
  topBar: {
    visible: false,
    drawBehind: true,
    animate: false,
  },
});

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
