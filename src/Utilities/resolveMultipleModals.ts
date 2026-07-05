import type {ComponentType} from 'react';
import type {ModalViewProps} from 'react-native-multiple-modals';
import {UIManager} from 'react-native';

export type MultipleModalsModalView = ComponentType<ModalViewProps>;

const MULTIPLE_MODALS_NATIVE_VIEW = 'RNTModalView';

function isMultipleModalsNativeAvailable(): boolean {
  try {
    const getConfig = UIManager.getViewManagerConfig;
    if (typeof getConfig === 'function') {
      return getConfig.call(UIManager, MULTIPLE_MODALS_NATIVE_VIEW) != null;
    }

    const hasConfig = UIManager.hasViewManagerConfig;
    if (typeof hasConfig === 'function') {
      return hasConfig.call(UIManager, MULTIPLE_MODALS_NATIVE_VIEW);
    }
  } catch {
    return false;
  }

  return false;
}

function resolveMultipleModalsModalView(): MultipleModalsModalView | null {
  if (!isMultipleModalsNativeAvailable()) {
    return null;
  }

  try {
    const mod = require('react-native-multiple-modals') as {
      ModalView?: MultipleModalsModalView;
    };

    return mod.ModalView ?? null;
  } catch {
    return null;
  }
}

export const MultipleModalsModalView = resolveMultipleModalsModalView();
