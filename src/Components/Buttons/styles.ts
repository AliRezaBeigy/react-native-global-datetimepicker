import {I18nManager, StyleSheet} from 'react-native';

export default StyleSheet.create({
  buttons_container: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  button_container: {
    margin: 5,
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
