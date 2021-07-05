import React, {memo, useMemo} from 'react';
import styles from './styles';
import {
  weekDaysJalali,
  yearMonthsJalali,
  weekDaysGregorian,
  yearMonthsGregorian,
} from '../../Utilities/Contants';
import {Pressable, Text, View} from 'react-native';
import useDateTimePicker from '../../Hooks/useDateTimePicker';
import {
  CalenderType,
  DateTimePickerMode,
} from '../../Providers/DateTimePickerProvider';
import {toPersianNumber} from '../../Utilities';

function Header() {
  const {
    mode,
    theme,
    setMode,
    calender,
    selectedDate,
    persianNumber,
  } = useDateTimePicker();
  const date = useMemo(() => {
    let isGregorian = calender === CalenderType.Gregorian;
    let weekDays = isGregorian ? weekDaysGregorian : weekDaysJalali;

    let month = isGregorian
      ? yearMonthsGregorian[selectedDate.getMonth()].substr(0, 3)
      : yearMonthsJalali[selectedDate.getMonth()];

    return `${weekDays[selectedDate.getDay()].label}, ${
      persianNumber
        ? toPersianNumber(`${selectedDate.getDate()}`)
        : selectedDate.getDate()
    } ${month}`;
  }, [selectedDate]);

  return (
    <View
      style={[
        {backgroundColor: theme.HeaderBackground},
        ...(calender === CalenderType.Gregorian
          ? []
          : [styles.header_container_jalali]),
      ]}>
      <Pressable
        style={[
          styles.header,
          ...(calender === CalenderType.Gregorian
            ? []
            : [styles.header_container_jalali]),
        ]}
        android_ripple={{borderless: true, color: theme.ButtonRipple}}>
        <Text>
          <Pressable
            android_ripple={{borderless: true, color: theme.ButtonRipple}}
            onPress={() => setMode(DateTimePickerMode.Year)}>
            <Text
              style={[
                styles.header_year,
                {color: theme.HeaderYear},
                ...(mode === DateTimePickerMode.Year
                  ? [{color: theme.HeaderSelectedMode}]
                  : []),
              ]}>
              {persianNumber
                ? toPersianNumber(`${selectedDate.getFullYear()}`)
                : selectedDate.getFullYear()}
            </Text>
          </Pressable>
        </Text>
        <Text>
          <Pressable onPress={() => setMode(DateTimePickerMode.Day)}>
            <Text
              style={[
                styles.header_date,
                {color: theme.HeaderDay},
                ...(mode === DateTimePickerMode.Day
                  ? [{color: theme.HeaderSelectedMode}]
                  : []),
              ]}>
              {date}
            </Text>
          </Pressable>
        </Text>
      </Pressable>
    </View>
  );
}

export default memo(Header);
