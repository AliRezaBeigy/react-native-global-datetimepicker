import React, {useEffect, useRef} from 'react';
import {toPersianNumber} from '../../Utilities';
import useDateTimePicker from '../../Hooks/useDateTimePicker';
import {Animated, GestureResponderEvent, Text, View} from 'react-native';
import {DateTimePickerMode} from '../../Providers/DateTimePickerProvider';

export default function Clock() {
  const {
    theme,
    mode,
    setHour,
    setMode,
    setMinute,
    selectedDate,
    persianNumber,
  } = useDateTimePicker();

  const isHourMode = mode === DateTimePickerMode.Hour;
  const value = isHourMode
    ? selectedDate.getHours()
    : selectedDate.getMinutes();
  const isPM = selectedDate.getHours() >= 12;

  const textSize = 30;
  const itemCount = 12;
  const clockPadding = 5;
  const clockSize = 285 - 20;

  const angleMode = (angle: number) => {
    return ((angle % 360) + 360) % 360;
  };

  const angleToValue = (angle: number) => {
    const angleDiff = 360 / itemCount;
    const value = angleMode(angle + 720 / itemCount) / angleDiff + 1;
    if (isHourMode) {
      if (isPM) {
        return (value % 12) + 12;
      } else {
        return value % 12;
      }
    } else {
      return (value * 5) % 60;
    }
  };

  const valueToAngle = (value: number) => {
    const angleDiff = 360 / itemCount;
    return angleMode(
      (value / (isHourMode ? 1 : 5) - (isPM && isHourMode ? 12 : 0)) *
        angleDiff -
        90,
    );
  };

  const onChangeValue = (animated: boolean, resultAngle: number) => {
    if (
      ((lastRotation.current % 360) + 360) % 360 ===
      ((resultAngle % 360) + 360) % 360
    ) {
      return;
    }
    lastRotation.current = resultAngle;
    if (animated)
      Animated.timing(rotationAnim, {
        duration: 200,
        useNativeDriver: true,
        toValue: resultAngle,
      }).start();
    else rotationAnim.setValue(resultAngle);
  };

  const lastRotation = useRef(value);
  const lastHour = useRef(selectedDate.getHours());
  const lastTouch = useRef(selectedDate.getHours());
  const rotationAnim = useRef(new Animated.Value(valueToAngle(value))).current;

  useEffect(() => {
    onChangeValue(true, valueToAngle(value));
  }, [mode, value]);

  const onRelease = (e: GestureResponderEvent) => {
    if (e.timeStamp - lastTouch.current > 250) {
      lastHour.current = selectedDate.getHours();
      return;
    }

    const x = e.nativeEvent.locationX - clockSize / 2;
    const y = clockSize / 2 - e.nativeEvent.locationY;
    const angle = (Math.atan2(y, x) * 180) / Math.PI;
    const angleDiff = isHourMode ? 360 / itemCount : 360 / 60;
    const result = Math.round(angle / angleDiff) * -angleDiff;
    const resultValue = angleToValue(result);

    if (isHourMode && resultValue == lastHour.current) {
      setMode(DateTimePickerMode.Minute);
    }
    lastHour.current = selectedDate.getHours();
  };

  const onTouch = (isStart: boolean, e: GestureResponderEvent) => {
    if (isStart) {
      lastTouch.current = e.timeStamp;
    }

    const x = e.nativeEvent.locationX - clockSize / 2;
    const y = clockSize / 2 - e.nativeEvent.locationY;
    const angle = (Math.atan2(y, x) * 180) / Math.PI;
    const angleDiff = isHourMode ? 360 / itemCount : 360 / 60;
    const result = Math.round(angle / angleDiff) * -angleDiff;
    const resultValue = angleToValue(result);

    if (isHourMode) {
      setHour(resultValue);
    } else {
      setMinute(resultValue);
    }
    onChangeValue(isStart, result);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View
        style={{
          width: clockSize,
          height: clockSize,
          position: 'relative',
          borderRadius: clockSize,
          backgroundColor: theme.ClockBackground,
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {[...Array(itemCount)].map((_, i) => {
            let a = (360 / itemCount) * i - 720 / itemCount;
            let b = (-360 / itemCount) * i + 720 / itemCount;
            const lable =
              (i + 1) * (isHourMode ? 1 : 5) + (isPM && isHourMode ? 12 : 0);
            return (
              <View
                key={i + itemCount * (value + itemCount * (isHourMode ? 1 : 2))}
                style={{
                  position: 'absolute',
                  transform: [
                    {rotate: a + 'deg'},
                    {translateX: (clockSize - textSize) / 2 - clockPadding},
                  ],
                }}>
                <View
                  style={{
                    padding: 3,
                    borderRadius: 50,
                    backgroundColor:
                      value / (isHourMode ? 1 : 5) -
                        (isPM && isHourMode ? 12 : 0) ==
                      (i + 1) % 12
                        ? theme.ClockPointer
                        : undefined,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      width: textSize,
                      height: textSize,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      color:
                        value / (isHourMode ? 1 : 5) -
                          (isPM && isHourMode ? 12 : 0) ==
                        (i + 1) % 12
                          ? theme.SelectedClockForeground
                          : theme.ClockForeground,
                      transform: [{rotate: b + 'deg'}],
                    }}>
                    {persianNumber ? toPersianNumber(`${lable}`) : lable}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View
          onResponderRelease={onRelease}
          onStartShouldSetResponder={() => true}
          onResponderStart={onTouch.bind(null, true)}
          onResponderMove={onTouch.bind(null, false)}
          style={{
            zIndex: 10,
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />
        <Animated.View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [
              {
                rotate: rotationAnim.interpolate({
                  inputRange: [-180, 0, 180],
                  outputRange: ['-180deg', '0deg', '180deg'],
                }),
              },
              {translateX: -4},
              {translateY: -4},
            ],
          }}>
          <View>
            <View
              style={{
                width: 8,
                zIndex: 1,
                height: 8,
                borderRadius: 4,
                position: 'absolute',
                backgroundColor: theme.ClockPointer,
              }}
            />
            <View
              style={{
                height: 4,
                borderRadius: 4,
                position: 'absolute',
                width: clockSize * 0.37,
                backgroundColor: theme.ClockPointer,
                transform: [{translateX: 4}, {translateY: 2}],
              }}
            />
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
