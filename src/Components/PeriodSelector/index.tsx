import React from 'react';
import styles from './styles';
import {Pressable, Text, View} from 'react-native';
import useDateTimePicker from '../../Hooks/useDateTimePicker';

export default function PeriodSelector() {
  const {theme, selectedDate, setHour} = useDateTimePicker();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setHour(selectedDate.getHours() % 12)}
        style={[
          styles.item,
          {
            borderTopEndRadius: 5,
            borderTopStartRadius: 5,
            backgroundColor:
              selectedDate.getHours() < 12
                ? theme.TimeInputFocusBackground
                : theme.TimeInputBackground,
          },
        ]}>
        <Text
          style={[
            styles.text,
            {
              color:
                selectedDate.getHours() < 12
                  ? theme.TimeInputFocusForeground
                  : theme.TimeInputForeground,
            },
          ]}>
          AM
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setHour((selectedDate.getHours() % 12) + 12)}
        style={[
          styles.item,
          {
            borderBottomEndRadius: 5,
            borderBottomStartRadius: 5,
            backgroundColor:
              selectedDate.getHours() >= 12
                ? theme.TimeInputFocusBackground
                : theme.TimeInputBackground,
          },
        ]}>
        <Text
          style={[
            styles.text,
            {
              color:
                selectedDate.getHours() >= 12
                  ? theme.TimeInputFocusForeground
                  : theme.TimeInputForeground,
            },
          ]}>
          PM
        </Text>
      </Pressable>
    </View>
  );
}
