import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles';
import Buttons from '../Components/Buttons';
import {Props} from '../GlobalDateTimePicker';
import DayPicker from '../Components/DayPicker';
import YearPicker from '../Components/YearPicker';
import useDateTimePicker from '../Hooks/useDateTimePicker';
import {Animated, Modal, Pressable, View} from 'react-native';
import {
  CalendarType,
  DateTimePickerMode,
} from '../Providers/DateTimePickerProvider';
import {
  convertGregorianToJalali,
  convertJalaliToGregorian,
  toPersianNumber,
} from '../Utilities';
import TimePicker from '../Components/TimePicker';
import DateHeader from '../Components/DateHeader';

export default function GlobalDateTimePickerModal({
  visible,
  onCancel,
  onSelect,
}: Props) {
  const {mode, calendar, selectedDate, persianNumber, setSelectedDate, theme} =
    useDateTimePicker();
  const [Mode, setMode] = useState(mode);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const years = useMemo(
    () =>
      Array.from({length: 200}, (_, k) => k + 1)
        .map(v => v + (calendar === CalendarType.Gregorian ? 1900 : 1300))
        .map(i => {
          return {
            value: i,
            label: persianNumber ? toPersianNumber(`${i}`) : `${i}`,
          };
        }),
    [calendar],
  );

  const onPressDay = (value: Date) => {
    setSelectedDate(value);
  };
  const cancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  const onOk = () => {
    if (onSelect) {
      if (calendar === CalendarType.Jalali)
        onSelect(convertJalaliToGregorian(selectedDate), selectedDate);
      else onSelect(selectedDate, convertGregorianToJalali(selectedDate));
    }
  };

  useEffect(() => {
    const duration = 150;
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: false,
      }).start(() => {
        setMode(mode);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: duration,
          useNativeDriver: false,
        }).start();
      });
    }, duration);
  }, [mode]);

  let content = null;

  if (mode == DateTimePickerMode.Day || mode == DateTimePickerMode.Year) {
    let picker;
    switch (Mode) {
      case DateTimePickerMode.Day:
        picker = <DayPicker onPressDay={onPressDay} />;
        break;
      case DateTimePickerMode.Year:
        picker = <YearPicker years={years} />;
        break;
    }
    content = (
      <>
        <DateHeader />
        <View
          style={[styles.content, {backgroundColor: theme.ContentBackground}]}>
          <Animated.View
            style={{
              opacity: fadeAnim,
            }}>
            {picker}
          </Animated.View>
          <Buttons onOk={onOk} onCancel={cancel} />
        </View>
      </>
    );
  }
  if (mode == DateTimePickerMode.Hour || mode == DateTimePickerMode.Minute) {
    content = (
      <>
        <TimePicker />
        <View
          style={[styles.content, {backgroundColor: theme.ContentBackground}]}>
          <Buttons onOk={onOk} onCancel={cancel} />
        </View>
      </>
    );
  }
  return (
    <Modal
      visible={visible}
      transparent={true}
      onDismiss={cancel}
      animationType="fade"
      onRequestClose={cancel}>
      <Pressable onPress={cancel} style={styles.container_pressable}>
        <View style={styles.container}>
          <Pressable>{content}</Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
