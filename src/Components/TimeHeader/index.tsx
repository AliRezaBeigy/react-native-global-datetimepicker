import React from 'react';
import {Pressable, Text, View} from 'react-native';
import useDateTimePicker from '../../Hooks/useDateTimePicker';
import styles from './styles';
import Input from '../Input';
import PeriodSelector from '../PeriodSelector';
import {DateTimePickerMode} from '../../Providers/DateTimePickerProvider';

export default function TimeHeader() {
  const {theme, selectedDate, setMinute, setHour, mode, setMode} =
    useDateTimePicker();

  const isPM = selectedDate.getHours() >= 12;

  return (
    <View style={[styles.container, {backgroundColor: theme.HeaderBackground}]}>
      <Pressable
        style={[styles.header]}
        android_ripple={{borderless: true, color: theme.ButtonRipple}}>
        <View style={styles.input_container}>
          <Input
            value={selectedDate.getHours() % 12}
            selected={mode === DateTimePickerMode.Hour}
            onPress={() => setMode(DateTimePickerMode.Hour)}
            onChange={value =>
              isNaN(value) || setHour(isPM ? (value % 12) + 12 : value)
            }
          />
          <Text style={[styles.time_splitter, {color: theme.TimeSeparator}]}>
            :
          </Text>
          <Input
            value={selectedDate.getMinutes()}
            selected={mode === DateTimePickerMode.Minute}
            onPress={() => setMode(DateTimePickerMode.Minute)}
            onChange={value => isNaN(value) || setMinute(value)}
          />
          <PeriodSelector />
        </View>
      </Pressable>
    </View>
  );
}
