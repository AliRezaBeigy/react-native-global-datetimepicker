import React from 'react';
import styles from './styles';
import Assets from '../../Assets';
import {toPersianNumber} from '../../Utilities';
import {Image, Pressable, Text, View} from 'react-native';
import useDateTimePicker from '../../Hooks/useDateTimePicker';
import {CalendarType} from '../../Providers/DateTimePickerProvider';
import {yearMonthsJalali, yearMonthsGregorian} from '../../Utilities/Contants';

export default function MonthSwitcher() {
  const {year, theme, month, calendar, setMonth, setYearMonth, persianNumber} =
    useDateTimePicker();

  return (
    <View style={styles.months}>
      <View style={styles.arrow_container}>
        <Pressable
          onPress={onBackMonth}
          android_ripple={{borderless: true, color: theme.ButtonRipple}}>
          <Image source={Assets.back()} style={styles.arrow} />
        </Pressable>
      </View>
      <Text style={styles.months_text}>
        {
          (calendar === CalendarType.Gregorian
            ? yearMonthsGregorian
            : yearMonthsJalali)[month]
        }{' '}
        {persianNumber ? toPersianNumber(`${year}`) : year}
      </Text>
      <View style={styles.arrow_container}>
        <Pressable
          onPress={onForwardMonth}
          android_ripple={{borderless: true, color: theme.ButtonRipple}}>
          <Image source={Assets.forward()} style={styles.arrow} />
        </Pressable>
      </View>
    </View>
  );

  function onBackMonth() {
    if (month === 0) {
      setYearMonth(year - 1, 11);
    } else {
      setMonth(month - 1);
    }
  }

  function onForwardMonth() {
    if (month === 11) {
      setYearMonth(year + 1, 0);
    } else {
      setMonth(month + 1);
    }
  }
}
