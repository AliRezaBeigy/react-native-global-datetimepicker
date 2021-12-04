import React, {memo} from 'react';
import Clock from '../Clock';
import styles from './styles';
import {View} from 'react-native';
import TimeHeader from '../TimeHeader';
import useDateTimePicker from '../../Hooks/useDateTimePicker';

function TimePicker() {
  const {theme} = useDateTimePicker();

  return (
    <>
      <TimeHeader />
      <View
        style={[
          styles.time_picker,
          {backgroundColor: theme.ContentBackground},
        ]}>
        <Clock />
      </View>
    </>
  );
}

export default memo(TimePicker);
