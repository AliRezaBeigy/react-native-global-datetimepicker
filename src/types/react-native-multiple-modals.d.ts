declare module 'react-native-multiple-modals' {
  import type {ComponentType, ReactNode} from 'react';
  import type {StatusBarProps, StyleProp, ViewStyle} from 'react-native';

  export type DismissalSource = 'Backdrop' | 'BackButton';

  export type ModalViewProps = {
    children: ReactNode;
    animationType?: 'fade' | 'slide' | 'none';
    backdropColor?: string;
    contentContainerStyle?: StyleProp<ViewStyle>;
    onRequestDismiss?: (calledBy: DismissalSource) => void;
    statusBar?: StatusBarProps;
    showBackdrop?: boolean;
  };

  export const ModalView: ComponentType<ModalViewProps>;
}
