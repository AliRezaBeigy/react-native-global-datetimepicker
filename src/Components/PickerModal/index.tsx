import React, {ReactNode} from 'react';
import {
  Modal,
  View,
  Platform,
  Pressable,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
} from 'react-native';
import {MultipleModalsModalView} from '../../Utilities/resolveMultipleModals';

const OVERLAY_COLOR = 'rgba(40,40,40,0.19)';

type Props = {
  visible: boolean;
  onDismiss: () => void;
  containerPressableStyle: StyleProp<ViewStyle>;
  containerStyle: StyleProp<ViewStyle>;
  children: ReactNode;
};

export default function PickerModal({
  visible,
  onDismiss,
  containerPressableStyle,
  containerStyle,
  children,
}: Props) {
  const modalBody = (
    <KeyboardAvoidingView
      style={containerPressableStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable
        onPress={MultipleModalsModalView ? undefined : onDismiss}
        style={containerPressableStyle}>
        <View
          style={
            MultipleModalsModalView
              ? [containerStyle, {backgroundColor: 'transparent'}]
              : containerStyle
          }>
          <Pressable>{children}</Pressable>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );

  if (MultipleModalsModalView) {
    if (!visible) {
      return null;
    }

    return (
      <MultipleModalsModalView
        animationType="fade"
        backdropColor={OVERLAY_COLOR}
        contentContainerStyle={[
          containerStyle,
          {backgroundColor: 'transparent'},
        ]}
        onRequestDismiss={onDismiss}>
        {modalBody}
      </MultipleModalsModalView>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      onDismiss={onDismiss}
      animationType="fade"
      onRequestClose={onDismiss}>
      {modalBody}
    </Modal>
  );
}
