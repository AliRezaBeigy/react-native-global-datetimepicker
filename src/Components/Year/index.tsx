import React, {useEffect, useRef} from 'react';
import styles from './styles';
import useDateTimePicker from '../../Hooks/useDateTimePicker';
import {Animated, Easing, Pressable, Text, View} from 'react-native';

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
  const opacityRef = useRef(new Animated.Value(0));

  useEffect(() => {
    isSelected.current = selected;
  }, [selected]);

  const selectedDayTextStyle = {color: theme.SelectedDayText};

  Animated.timing(opacityRef.current, {
    toValue: 0,
    duration: 125,
    easing: Easing.in(Easing.quad),
    useNativeDriver: true,
  }).start();

  return (
    <View style={styles.year_container}>
      <Animated.View
        style={[
          styles.year_ripple,
          ...(selected
            ? [{backgroundColor: theme.SelectedDay}]
            : [
                {
                  backgroundColor: theme.SelectDayRipple,
                  opacity: opacityRef.current,
                },
              ]),
        ]}
      />
      <View style={[styles.year]}>
        <Pressable
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={styles.year_content}
          onPress={() => (label ? onPressYear(value) : undefined)}>
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
      if (opacityRef.current)
        Animated.timing(opacityRef.current, {
          toValue: 1,
          duration: 125,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }).start();
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
    Animated.timing(opacityRef.current, {
      toValue: 0,
      duration: 125,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start();
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
