import React, {useEffect, useMemo, useRef} from 'react';
import styles from './styles';
import Buttons from '../Components/Buttons';
import {Props} from '../GlobalDateTimePicker';
import DayPicker from '../Components/DayPicker';
import YearPicker from '../Components/YearPicker';
import TimePicker from '../Components/TimePicker';
import DateHeader from '../Components/DateHeader';
import useDateTimePicker from '../Hooks/useDateTimePicker';
import {Animated, Modal, Pressable, View} from 'react-native';
import {CalendarType, DataTimePickerMode, PickerMode,} from '../Providers/DateTimePickerProvider';
import {convertGregorianToJalali, convertJalaliToGregorian, toPersianNumber,} from '../Utilities';

export default function GlobalDateTimePickerModal({
                                                      visible,
                                                      onCancel,
                                                      onSelect,
                                                      mode
                                                  }: Props) {
    const {pickerMode, calendar, selectedDate, persianNumber, setSelectedDate, setPickerMode, theme} =
        useDateTimePicker();
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
        if (onCancel)
            onCancel();
    };
    const onOk = () => {
        if (onSelect) {
            if (mode === DataTimePickerMode.DateTime && pickerMode === PickerMode.Day)
                setPickerMode(PickerMode.Hour)
            else {
                setPickerMode(mode === DataTimePickerMode.Time ? PickerMode.Hour : PickerMode.Day)
                if (calendar === CalendarType.Jalali)
                    onSelect(convertJalaliToGregorian(selectedDate), selectedDate);
                else onSelect(selectedDate, convertGregorianToJalali(selectedDate));
            }
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
                setPickerMode(pickerMode);

                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: false,
                }).start();
            });
        }, duration);
    }, [pickerMode]);

    let content = null;

    if (pickerMode == PickerMode.Day || pickerMode == PickerMode.Year) {
        let picker;
        switch (pickerMode) {
            case PickerMode.Day:
                picker = <DayPicker onPressDay={onPressDay}/>;
                break;
            case PickerMode.Year:
                picker = <YearPicker years={years}/>;
                break;
        }
        content = (
            <>
                <DateHeader/>
                <View
                    style={[styles.content, {backgroundColor: theme.ContentBackground}]}>
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                        }}>
                        {picker}
                    </Animated.View>
                    <Buttons onOk={onOk} onCancel={cancel}/>
                </View>
            </>
        );
    }
    if (pickerMode == PickerMode.Hour || pickerMode == PickerMode.Minute) {
        content = (
            <>
                <TimePicker/>
                <View
                    style={[styles.content, {backgroundColor: theme.ContentBackground}]}>
                    <Buttons onOk={onOk} onCancel={cancel}/>
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
