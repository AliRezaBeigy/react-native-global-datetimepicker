import React from 'react';
import {DateTimePickerContext} from '../Providers/DateTimePickerProvider';

export default function useDateTimePicker() {
  return React.useContext(DateTimePickerContext);
}
