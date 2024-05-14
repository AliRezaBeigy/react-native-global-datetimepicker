import {I18nManager, StyleSheet} from 'react-native';

export default StyleSheet.create({
  buttons_container: {
    justifyContent: 'flex-end',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  button_container: {
    borderRadius: 8,
    overflow: 'hidden',
    paddingTop: 10,
    paddingBottom: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 6,
  },
  button_ok: {
    width: 64,
    marginStart: 10,
  },
  button_cancel: {
    width: 78,
  },
});
