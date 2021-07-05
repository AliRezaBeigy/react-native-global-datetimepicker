import {I18nManager, StyleSheet} from 'react-native';

export default StyleSheet.create({
  days: {
    flexGrow: 0,
    height: 240,
  },
  content_container: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
});
