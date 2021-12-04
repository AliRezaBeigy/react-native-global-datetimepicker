import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232323',
  },
  gregorian_date_text: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  jalali_date_text: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: '25%',
  },
  button_container: {
    height: 50,
    width: 300,
    borderRadius: 25,
    backgroundColor: '#ff4d5b',
  },
  button: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  switch_container: {
    marginVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  switch: {
    marginHorizontal: 10,
  },
  switch_text: {
    color: 'white',
    fontWeight: '700',
  },
  themes_section: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  themes_title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  themes: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  theme: {
    borderRadius: 10,
    marginHorizontal: 5,
  },
  theme_name: {
    color: 'white',
    marginVertical: 7,
    marginHorizontal: 25,
  },
});
