import {I18nManager, StyleSheet} from 'react-native';

export default StyleSheet.create({
  months: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  arrow_container: {
    width: 40,
    height: 40,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    width: 30,
    height: 30
  },
  months_text: {
    fontSize: 15,
    fontWeight: '600',
  },
});
