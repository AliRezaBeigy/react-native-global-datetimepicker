import {I18nManager, StyleSheet} from 'react-native';

export default StyleSheet.create({
  years: {
    width: 279,
    height: 340,
    flexGrow: 0,
  },
  year_item: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  year_item_text: {
    fontSize: 16,
  },
  selected_year: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  content_container: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
});
