import React, {useEffect, useRef} from 'react';
import styles from './styles';
import {Pressable, Text, View} from 'react-native';
import useDateTimePicker from '../../Hooks/useDateTimePicker';

export interface DayInfo {
  value: string;
  label: string;
}

export interface Props extends DayInfo {
  selected: boolean;
  onPressYear: (value: string) => void;
}

const today = new Date();

export default function Year({value, label, selected, onPressYear}: Props) {
  const {theme, persianNumber} = useDateTimePicker();
  const isSelected = useRef(selected);
  const labelRef = useRef<Text>(null);

  useEffect(() => {
    isSelected.current = selected;
  }, [selected]);

  const selectedDayTextStyle = {color: theme.SelectedDayText};

  return (
    <View style={styles.year_container}>
      <View
        style={[
          styles.year,
          ...(selected ? [{backgroundColor: theme.SelectedDay}] : []),
        ]}>
        <Pressable
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={styles.year_content}
          onPress={() => (label ? onPressYear(value) : undefined)}
          android_ripple={
            label
              ? {borderless: true, color: theme?.SelectDayRipple}
              : undefined
          }>
          <Text
            ref={labelRef}
            style={[
              {
                color: theme.DayText,
                fontSize: persianNumber ? 18 : 15,
              },
              ...(selected
                ? [selectedDayTextStyle]
                : value === today.getFullYear().toString(10)
                ? [styles.current_year_text, {color: theme.TodayDayText}]
                : []),
            ]}>
            {label}
          </Text>
        </Pressable>
      </View>
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
            : value === today.getFullYear().toString(10)
            ? [styles.current_year_text, {color: theme.TodayDayText}]
            : []),
        ],
      });
  }
}
