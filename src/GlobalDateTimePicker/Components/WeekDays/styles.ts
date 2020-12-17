import {I18nManager, StyleSheet} from 'react-native';

export default StyleSheet.create({
  week_days: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  week_day: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
