import {I18nManager, StyleSheet} from 'react-native';

export default StyleSheet.create({
  buttons_container: {
    justifyContent: 'flex-end',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  button_container: {
    borderRadius: 8,
    overflow: 'hidden',
    paddingVertical: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_ok: {
    width: 64,
  },
  button_cancel: {
    width: 78,
  },
});
