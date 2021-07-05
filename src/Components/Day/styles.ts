import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  day_container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  day: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  today_text: {
    fontWeight: 'bold',
  },
});
