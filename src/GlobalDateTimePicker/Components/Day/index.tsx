import React, {useEffect, useRef} from 'react';
import styles from './styles';
import {Pressable, Text, View} from 'react-native';
import useDateTimePicker from '../../Hooks/useDateTimePicker';

export interface DayInfo {
  value: Date;
  label: string;
}

export interface Props extends DayInfo {
  selected: boolean;
  onPressDay: (value: Date) => void;
}

const today = new Date();

export default function Day({value, label, selected, onPressDay}: Props) {
  const {theme, persianNumber} = useDateTimePicker();
  const isSelected = useRef(selected);
  const labelRef = useRef<Text>(null);

  useEffect(() => {
    isSelected.current = selected;
  }, [selected]);

  const selectedDayTextStyle = {color: theme.SelectedDayText};

  return (
    <View style={styles.day_container}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => (label ? onPressDay(value) : undefined)}
        android_ripple={
          label ? {borderless: true, color: theme?.SelectDayRipple} : undefined
        }
        style={[
          styles.day,
          ...(selected ? [{backgroundColor: theme.SelectedDay}] : []),
        ]}>
        <Text
          ref={labelRef}
          style={[
            {color: theme.DayText, fontSize: persianNumber ? 18 : 15},
            ...(selected
              ? [selectedDayTextStyle]
              : value?.toDateString() === today.toDateString()
              ? [styles.today_text, {color: theme.TodayDayText}]
              : []),
          ]}>
          {label}
        </Text>
      </Pressable>
    </View>
  );

  function onPressIn() {
    setTimeout(() => {
      if (labelRef.current)
        labelRef.current.setNativeProps({
          style: [
            {color: theme.DayText, fontSize: persianNumber ? 18 : 15},
            selectedDayTextStyle,
          ],
        });
    }, 100);
  }

  function onPressOut() {
    if (labelRef.current)
      labelRef.current.setNativeProps({
        style: [
          {color: theme.DayText, fontSize: persianNumber ? 18 : 15},
          ...(isSelected.current
            ? [selectedDayTextStyle]
            : value?.toDateString() === today.toDateString()
            ? [styles.today_text, {color: theme.TodayDayText}]
            : []),
        ],
      });
  }
}
