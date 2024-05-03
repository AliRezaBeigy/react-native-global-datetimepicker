import React, {useEffect, useRef} from 'react';
import styles from './styles';
import {getDateUTCString} from '../../Utilities';
import useDateTimePicker from '../../Hooks/useDateTimePicker';
import {Animated, Easing, Pressable, Text, View} from 'react-native';

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
  const opacityRef = useRef(new Animated.Value(0));

  useEffect(() => {
    isSelected.current = selected;
  }, [selected]);

  const selectedDayTextStyle = {color: theme.SelectedDayText};

  Animated.timing(opacityRef.current, {
    toValue: 0,
    duration: 125,
    easing: Easing.in(Easing.quad),
    useNativeDriver: false,
  }).start();
  return (
    <View style={styles.day_container}>
      <Animated.View
        style={[
          styles.day_ripple,
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
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => (label ? onPressDay(value) : undefined)}
        style={[
          styles.day,
          ...(selected ? [{backgroundColor: theme.SelectedDay}] : []),
        ]}>
        <Text
          ref={labelRef}
          style={[
            {
              color: theme.DayText,
              fontSize: persianNumber ? 18 : 15,
            },
            ...(selected
              ? [selectedDayTextStyle]
              : getDateUTCString(value) === getDateUTCString(today)
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
      if (opacityRef.current)
        Animated.timing(opacityRef.current, {
          toValue: 1,
          duration: 125,
          easing: Easing.in(Easing.quad),
          useNativeDriver: false,
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
      useNativeDriver: false,
    }).start();
    if (labelRef.current)
      labelRef.current.setNativeProps({
        style: [
          {color: theme.DayText, fontSize: persianNumber ? 18 : 15},
          ...(isSelected.current
            ? [selectedDayTextStyle]
            : getDateUTCString(value) === getDateUTCString(today)
            ? [styles.today_text, {color: theme.TodayDayText}]
            : []),
        ],
      });
  }
}
