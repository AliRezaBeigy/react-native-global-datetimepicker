import React, {useEffect, useState} from 'react';
import {Platform, Pressable, TextInput} from 'react-native';
import useDateTimePicker from '../../Hooks/useDateTimePicker';
import styles from './styles';

interface Props {
  value: number;
  selected: boolean;
  onPress: () => void;
  onChange: (value: number) => void;
}

export default function Input({value, onChange, selected, onPress}: Props) {
  const {theme} = useDateTimePicker();
  const [Focus, setFocus] = useState(selected);
  const [Value, setValue] = useState(('0' + value).slice(-2));

  useEffect(() => {
    if (value !== parseInt(Value)) {
      setValue(('0' + value).slice(-2));
    }
  }, [value]);
  useEffect(() => setFocus(selected), [selected]);

  return (
    <Pressable onPress={onPress}>
      <TextInput
        value={Value}
        editable={Focus}
        onPressIn={Platform.OS === 'ios' ? onPress : undefined}
        underlineColorAndroid="transparent"
        onChangeText={(text) => {
          setValue(text);
          onChange(parseInt(text));
        }}
        style={[
          styles.input,
          {
            color: Focus
              ? theme.TimeInputFocusForeground
              : theme.TimeInputForeground,
            backgroundColor: Focus
              ? theme.TimeInputFocusBackground
              : theme.TimeInputBackground,
          },
        ]}
      />
    </Pressable>
  );
}
