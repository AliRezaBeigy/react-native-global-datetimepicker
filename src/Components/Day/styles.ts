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
  day_ripple: {
    width: '100%',
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'absolute',
  },
  today_text: {
    fontWeight: 'bold',
  },
});
