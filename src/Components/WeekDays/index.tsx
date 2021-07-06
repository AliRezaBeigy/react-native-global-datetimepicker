import React, {memo} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import useDateTimePicker from '../../Hooks/useDateTimePicker';
import {weekDaysGregorian, weekDaysJalali} from '../../Utilities/Contants';
import {CalendarType} from '../../Providers/DateTimePickerProvider';

function WeekDays() {
  const {calendar, theme} = useDateTimePicker();
  return (
    <View style={styles.week_days}>
      {[
        ...(calendar === CalendarType.Gregorian
          ? weekDaysGregorian
          : weekDaysJalali),
      ]
        .sort((a, b) => (a.value < b.value ? 1 : -1))
        .map((item) => {
          return (
            <View key={item.value} style={styles.week_day}>
              <Text style={{color: theme.WeekDayText}}>
                {item.label.substr(0, 1)}
              </Text>
            </View>
          );
        })}
    </View>
  );
}
export default memo(WeekDays);
