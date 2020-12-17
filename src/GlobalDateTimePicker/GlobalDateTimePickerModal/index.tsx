import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles';
import Header from '../Components/Header';
import Buttons from '../Components/Buttons';
import {Props} from '../index';
import DayPicker from '../Components/DayPicker';
import YearPicker from '../Components/YearPicker';
import useDateTimePicker from '../Hooks/useDateTimePicker';
import {Animated, Modal, Pressable, View} from 'react-native';
import {
  CalenderType,
  DateTimePickerMode,
} from '../Providers/DateTimePickerProvider';
import {
  convertGregorianToJalali,
  convertJalaliToGregorian,
  toPersianNumber,
} from '../Utilities';

export default function GlobalDateTimePickerModal({
  visible,
  onCancel,
  onSelect,
}: Props) {
  const {
    mode,
    calender,
    selectedDate,
    persianNumber,
    setSelectedDate,
  } = useDateTimePicker();
  const [Mode, setMode] = useState(mode);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const years = useMemo(
    () =>
      Array.from({length: 200}, (_, k) => k + 1)
        .map((v) => v + (calender === CalenderType.Gregorian ? 1900 : 1300))
        .map((i) => {
          return {
            value: i,
            label: persianNumber ? toPersianNumber(`${i}`) : `${i}`,
          };
        }),
    [calender],
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
      if (calender === CalenderType.Jalali)
        onSelect(convertJalaliToGregorian(selectedDate), selectedDate);
      else onSelect(selectedDate, convertGregorianToJalali(selectedDate));
    }
  };

  let picker;
  switch (Mode) {
    case DateTimePickerMode.Day:
      picker = <DayPicker onPressDay={onPressDay} />;
      break;
    case DateTimePickerMode.Year:
      picker = <YearPicker years={years} />;
      break;
  }

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

  return (
    <Modal
      visible={visible}
      transparent={true}
      onDismiss={cancel}
      animationType="fade"
      onRequestClose={cancel}>
      <Pressable onPress={cancel} style={styles.container_pressable}>
        <View style={styles.container}>
          <Pressable>
            <Header />
            <View style={styles.content}>
              <Animated.View
                style={{
                  opacity: fadeAnim,
                }}>
                {picker}
              </Animated.View>
              <Buttons onOk={onOk} onCancel={cancel} />
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
