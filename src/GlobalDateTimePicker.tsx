import React from 'react';
import DateTimePickerProvider, {
  CalendarType,
  DataTimePickerMode,
  PickerMode,
} from './Providers/DateTimePickerProvider';
import Themes from './Utilities/Themes';
import Translations from './Utilities/Translations';
import GlobalDateTimePickerModal from './GlobalDateTimePickerModal';

export interface Props {
  visible: boolean;
  initialDate?: Date;
  onCancel?: () => void;
  persianNumber?: boolean;
  calendar?: CalendarType;
  mode?: DataTimePickerMode;
  theme?: typeof Themes.Primary;
  translation?: typeof Translations.DEFAULT;
  onSelect?: (gregorianDate: Date, jalaliDate: Date) => void;
}

export default function GlobalDateTimePicker({
  mode,
  theme,
  calendar,
  initialDate,
  translation,
  persianNumber,
  ...props
}: Props) {
  return (
    <DateTimePickerProvider
      mode={mode === DataTimePickerMode.Time ? PickerMode.Hour : PickerMode.Day}
      theme={theme}
      calendar={calendar}
      initialDate={initialDate}
      translation={translation}
      persianNumber={persianNumber}>
      <GlobalDateTimePickerModal {...props} mode={mode}/>
    </DateTimePickerProvider>
  );
}
