import React from 'react';
import styles from './styles';
import {Pressable, Text, View} from 'react-native';
import useDateTimePicker from '../../Hooks/useDateTimePicker';

interface Props {
  onOk: () => void;
  onCancel: () => void;
}

export default function Buttons({onOk, onCancel}: Props) {
  const {translation, theme} = useDateTimePicker();

  return (
    <View style={styles.buttons_container}>
      <View style={styles.button_container}>
        <Pressable
          onPress={onCancel}
          style={[
            styles.button,
            styles.button_cancel,
            {backgroundColor: theme.HeaderBackground},
          ]}
          android_ripple={{borderless: true, color: theme.ButtonRipple}}>
          <Text style={{color: theme.HeaderDay}}>{translation?.cancel}</Text>
        </Pressable>
      </View>
      <View style={styles.button_container}>
        <Pressable
          onPress={onOk}
          style={[
            styles.button,
            styles.button_ok,
            {backgroundColor: theme.OkBackground},
          ]}
          android_ripple={{borderless: true, color: theme.ButtonRipple}}>
          <Text style={{color: theme.OkText}}>{translation?.ok}</Text>
        </Pressable>
      </View>
    </View>
  );
}
