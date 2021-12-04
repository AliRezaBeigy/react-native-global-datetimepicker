import {I18nManager, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: 303,
    height: 110,
  },
  header: {
    padding: 15,
    width: '100%',
  },
  input_container: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  time_splitter: {
    fontSize: 45,
    paddingBottom: 5,
    marginHorizontal: 3,
  },
});
