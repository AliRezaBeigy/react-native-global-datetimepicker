import React, {useEffect, useState, PropsWithChildren} from 'react';
import Themes from '../Utilities/Themes';
import Translations from '../Utilities/Translations';
import {convertGregorianToJalali} from '../Utilities';

export enum CalendarType {
  Gregorian,
  Jalali,
}

export enum DateTimePickerMode {
  Date,
  Time,
  DateTime,
}

export enum PickerMode {
  Day,
  Year,
  Hour,
  Minute,
}

interface DateTimePickerState {
  year: number;
  month: number;
  selectedDate: Date;
  calendar: CalendarType;
  persianNumber: boolean;
  pickerMode: PickerMode;
  theme: typeof Themes.Primary;
  translation: typeof Translations.DEFAULT;
}

export interface IDateTimePickerProvider extends DateTimePickerState {
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setHour: (minute: number) => void;
  setMinute: (minute: number) => void;
  setSelectedDate: (date: Date) => void;
  setPickerMode: (mode: PickerMode) => void;
  setYearMonth: (year: number, month: number) => void;
}

const currentDate = new Date();

export const DateTimePickerContext =
  React.createContext<IDateTimePickerProvider>({
    month: 0,
    year: 2020,
    persianNumber: false,
    theme: Themes.Primary,
    setHour: () => undefined,
    setPickerMode: () => undefined,
    setYear: () => undefined,
    selectedDate: currentDate,
    setMonth: () => undefined,
    setMinute: () => undefined,
    pickerMode: PickerMode.Day,
    setYearMonth: () => undefined,
    setSelectedDate: () => undefined,
    calendar: CalendarType.Gregorian,
    translation: Translations.DEFAULT,
  });

interface Props extends PropsWithChildren {
  initialDate?: Date;
  persianNumber?: boolean;
  calendar?: CalendarType;
  mode?: PickerMode;
  theme?: typeof Themes.Primary;
  translation?: typeof Translations.DEFAULT;
}

const DateTimePickerProvider: React.FC<Props> = ({
  children,
  persianNumber = false,
  theme = Themes.Primary,
  initialDate = currentDate,
  mode = PickerMode.Day,
  calendar = CalendarType.Gregorian,
  translation = Translations.DEFAULT,
}) => {
  const [DateTimePicker, setDateTimePicker] = useState<DateTimePickerState>({
    pickerMode: mode,
    theme: theme,
    calendar: calendar,
    translation: translation,
    selectedDate: initialDate,
    persianNumber: persianNumber,
    month: initialDate.getMonth(),
    year: initialDate.getFullYear(),
  });

  useEffect(() => {
    let date =
      calendar === CalendarType.Gregorian || initialDate.getFullYear() < 1900
        ? initialDate
        : convertGregorianToJalali(initialDate);
    setDateTimePicker({
      ...DateTimePicker,
      pickerMode: mode,
      theme: theme,
      calendar: calendar,
      selectedDate: date,
      month: date.getMonth(),
      year: date.getFullYear(),
      translation: translation,
      persianNumber: persianNumber,
    });
  }, [calendar, persianNumber, translation, theme, mode]);

  return (
    <DateTimePickerContext.Provider
      value={{
        pickerMode: DateTimePicker.pickerMode,
        year: DateTimePicker.year,
        month: DateTimePicker.month,
        theme: DateTimePicker.theme,
        calendar: DateTimePicker.calendar,
        translation: DateTimePicker.translation,
        selectedDate: DateTimePicker.selectedDate,
        persianNumber: DateTimePicker.persianNumber,
        setYear: (year) => {
          DateTimePicker.selectedDate.setFullYear(year);
          setDateTimePicker({
            ...DateTimePicker,
            year: year,
            pickerMode: PickerMode.Day,
            selectedDate: DateTimePicker.selectedDate,
          });
        },
        setHour: (hour) => {
          DateTimePicker.selectedDate.setHours(hour);
          setDateTimePicker({
            ...DateTimePicker,
            selectedDate: new Date(DateTimePicker.selectedDate),
          });
        },
        setMinute: (minute) => {
          DateTimePicker.selectedDate.setMinutes(minute);
          setDateTimePicker({
            ...DateTimePicker,
            selectedDate: new Date(DateTimePicker.selectedDate),
          });
        },
        setPickerMode: (mode) => {
          setDateTimePicker({...DateTimePicker, pickerMode: mode});
        },
        setMonth: (month) => {
          setDateTimePicker({...DateTimePicker, month: month});
        },
        setSelectedDate: (date) => {
          setDateTimePicker({...DateTimePicker, selectedDate: date});
        },
        setYearMonth: (year, month) => {
          setDateTimePicker({...DateTimePicker, year: year, month: month});
        },
      }}>
      {children}
    </DateTimePickerContext.Provider>
  );
};

export default DateTimePickerProvider;
