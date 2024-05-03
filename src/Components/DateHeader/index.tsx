import styles from './styles';
import React, {memo, useMemo} from 'react';
import {toPersianNumber} from '../../Utilities';
import {Pressable, Text, View} from 'react-native';
import useDateTimePicker from '../../Hooks/useDateTimePicker';
import {CalendarType, PickerMode} from '../../Providers/DateTimePickerProvider';
import {weekDaysGregorian, weekDaysJalali, yearMonthsGregorian, yearMonthsJalali,} from '../../Utilities/Contants';

function DateHeader() {
    const {pickerMode, theme, setPickerMode, calendar, selectedDate, persianNumber} =
        useDateTimePicker();
    const date = useMemo(() => {
        let isGregorian = calendar === CalendarType.Gregorian;
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
                ...(calendar === CalendarType.Gregorian
                    ? []
                    : [styles.header_container_jalali]),
            ]}>
            <Pressable
                style={[
                    styles.header,
                    ...(calendar === CalendarType.Gregorian
                        ? []
                        : [styles.header_container_jalali]),
                ]}
                onPress={() => setPickerMode(pickerMode === PickerMode.Year ? PickerMode.Day : PickerMode.Year)}
                android_ripple={{borderless: true, color: theme.ButtonRipple}}>
                <Text>
                    <Pressable
                        android_ripple={{borderless: true, color: theme.ButtonRipple}}
                        onPress={() => setPickerMode(PickerMode.Year)}>
                        <Text
                            style={[
                                styles.header_year,
                                {color: theme.HeaderYear},
                                ...(pickerMode === PickerMode.Year
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
                    <Pressable onPress={() => setPickerMode(PickerMode.Day)}>
                        <Text
                            style={[
                                styles.header_date,
                                {color: theme.HeaderDay},
                                ...(pickerMode === PickerMode.Day
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

export default memo(DateHeader);
