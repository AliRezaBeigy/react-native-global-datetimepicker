import React, {memo} from 'react';
import styles from './styles';
import {View} from 'react-native';
import WeekDays from '../WeekDays';
import MonthSwitcher from '../MonthSwitcher';
import Days, {Props as DaysProps} from '../Days';

interface Props extends DaysProps {}

function DayPicker({onPressDay}: Props) {
  return (
    <View style={styles.day_picker}>
      <MonthSwitcher />
      <WeekDays />
      <Days onPressDay={onPressDay} />
    </View>
  );
}

export default memo(DayPicker);
