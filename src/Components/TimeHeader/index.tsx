import React from 'react';
import {Pressable, Text, View} from 'react-native';
import useDateTimePicker from '../../Hooks/useDateTimePicker';
import styles from './styles';
import Input from '../Input';
import PeriodSelector from '../PeriodSelector';
import {PickerMode} from '../../Providers/DateTimePickerProvider';

export default function TimeHeader() {
  const {theme, selectedDate, setMinute, setHour, pickerMode, setPickerMode} =
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
            selected={pickerMode === PickerMode.Hour}
            onPress={() => setPickerMode(PickerMode.Hour)}
            onChange={value =>
              isNaN(value) || setHour(isPM ? (value % 12) + 12 : value)
            }
          />
          <Text style={[styles.time_splitter, {color: theme.TimeSeparator}]}>
            :
          </Text>
          <Input
            value={selectedDate.getMinutes()}
            selected={pickerMode === PickerMode.Minute}
            onPress={() => setPickerMode(PickerMode.Minute)}
            onChange={value => isNaN(value) || setMinute(value)}
          />
          <PeriodSelector />
        </View>
      </Pressable>
    </View>
  );
}
