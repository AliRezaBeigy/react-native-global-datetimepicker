import React from 'react';
import DateTimePickerProvider, {
  CalenderType,
} from './Providers/DateTimePickerProvider';
import Themes from './Utilities/Themes';
import Translations from './Utilities/Translations';
import GlobalDateTimePickerModal from './GlobalDateTimePickerModal';

export interface Props {
  visible: boolean;
  initialDate?: Date;
  onCancel?: () => void;
  persianNumber?: boolean;
  calender?: CalenderType;
  theme?: typeof Themes.Primary;
  translation?: typeof Translations.DEFAULT;
  onSelect?: (gregorianDate: Date, jalaliDate: Date) => void;
}

export default function GlobalDateTimePicker({
  theme,
  calender,
  initialDate,
  translation,
  persianNumber,
  ...props
}: Props) {
  return (
    <DateTimePickerProvider
      theme={theme}
      calender={calender}
      initialDate={initialDate}
      translation={translation}
      persianNumber={persianNumber}>
      <GlobalDateTimePickerModal {...props} />
    </DateTimePickerProvider>
  );
}
