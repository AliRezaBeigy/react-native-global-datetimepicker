import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  year_container: {
    width: 93,
    height: 60,
    borderRadius: 20,
    overflow: 'hidden',
  },
  year_content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  year: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 12,
  },
  year_ripple: {
    width: '100%',
    height: 60 - 24,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 12,
    position: 'absolute',
  },
  current_year_text: {
    fontWeight: 'bold',
  },
});
