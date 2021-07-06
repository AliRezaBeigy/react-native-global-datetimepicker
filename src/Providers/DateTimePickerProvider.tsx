import React, {useEffect, useState} from 'react';
import Themes from '../Utilities/Themes';
import Translations from '../Utilities/Translations';
import {convertGregorianToJalali} from '../Utilities';

export enum CalendarType {
  Gregorian,
  Jalali,
}

export enum DateTimePickerMode {
  Day,
  Year,
  Time,
}

interface DateTimePickerState {
  year: number;
  month: number;
  selectedDate: Date;
  calendar: CalendarType;
  persianNumber: boolean;
  mode: DateTimePickerMode;
  theme: typeof Themes.Primary;
  translation: typeof Translations.DEFAULT;
}

export interface IDateTimePickerProvider extends DateTimePickerState {
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setSelectedDate: (date: Date) => void;
  setMode: (mode: DateTimePickerMode) => void;
  setYearMonth: (year: number, month: number) => void;
}

const currentDate = new Date();

export const DateTimePickerContext =
  React.createContext<IDateTimePickerProvider>({
    month: 0,
    year: 2020,
    persianNumber: false,
    theme: Themes.Primary,
    setMode: () => undefined,
    setYear: () => undefined,
    selectedDate: currentDate,
    setMonth: () => undefined,
    mode: DateTimePickerMode.Day,
    setYearMonth: () => undefined,
    setSelectedDate: () => undefined,
    calendar: CalendarType.Gregorian,
    translation: Translations.DEFAULT,
  });

interface Props {
  initialDate?: Date;
  persianNumber?: boolean;
  calendar?: CalendarType;
  theme?: typeof Themes.Primary;
  translation?: typeof Translations.DEFAULT;
}

const DateTimePickerProvider: React.FC<Props> = ({
  children,
  persianNumber = false,
  theme = Themes.Primary,
  initialDate = currentDate,
  calendar = CalendarType.Gregorian,
  translation = Translations.DEFAULT,
}) => {
  const [DateTimePicker, setDateTimePicker] = useState<DateTimePickerState>({
    theme: theme,
    calendar: calendar,
    translation: translation,
    selectedDate: initialDate,
    mode: DateTimePickerMode.Day,
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
      theme: theme,
      calendar: calendar,
      selectedDate: date,
      month: date.getMonth(),
      year: date.getFullYear(),
      translation: translation,
      persianNumber: persianNumber,
    });
  }, [calendar, persianNumber, translation, theme]);

  return (
    <DateTimePickerContext.Provider
      value={{
        mode: DateTimePicker.mode,
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
            mode: DateTimePickerMode.Day,
            selectedDate: DateTimePicker.selectedDate,
          });
        },
        setMode: (mode) => {
          setDateTimePicker({...DateTimePicker, mode: mode});
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
