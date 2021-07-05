<h1 style="text-align: center">Global DateTime Picker</h1>

<div style="text-align: center">
    <p><a href="https://github.com/AliRezaBeigy/react-native-global-datetimepicker/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="MIT License"></a>
    <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" alt="PR&#39;s Welcome"></a>
    <img src="https://img.shields.io/npm/v/react-native-global-datetimepicker?style=for-the-badge" alt="npm">
    <img src="https://img.shields.io/npm/dt/react-native-global-datetimepicker?style=for-the-badge" alt="npm">
    <img src="https://img.shields.io/github/stars/AliRezaBeigy/react-native-global-datetimepicker?style=for-the-badge" alt="GitHub Repo stars"></p>
</div>

A global, beautiful, customizable date and time picker for React Native.

## Features

- Customizable theme
- Customizable translation
- Support Jalali(Shamsi) and Gregorian

# Demo
<p align="center">
  <img src="asset/example.gif" alt="DateTimePicker" width="320">
</p>

# Installation
Install it using Yarn:
```shell
$ yarn add react-native-global-datetimepicker
```
Of if you prefer NPM:
```shell
$ npm i react-native-global-datetimepicker
```

# Basic Import
After the installation, it's time to import the package in your app:
```ts
import GlobalDateTimePicker, {
    CalenderType,
    weekDaysJalali,
    yearMonthsJalali,
    DateTimePickerThemes,
    DateTimePickerTranslations,
} from 'react-native-global-datetimepicker';
```
Great job! You're all set. It's time to write some code now.

# Basic Usage
Let's kick things off by providing an example:
```tsx
import React, {useState} from "react";
import GlobalDateTimePicker from 'react-native-global-datetimepicker';

export default function App() {
    const [ShowDateTimePicker, setShowDateTimePicker] = useState(false);
    const [SelectedDateJalali, setSelectedDateJalali] = useState<Date>();
    const [SelectedDateGregorian, setSelectedDateGregorian] = useState<Date>();
    return (
        <GlobalDateTimePicker
            visible={ShowDateTimePicker}
            initialDate={SelectedDateGregorian}
            onSelect={(gregorianDate, jalaliDate) => {
                setShowDateTimePicker(false);
                setSelectedDateJalali(jalaliDate);
                setSelectedDateGregorian(gregorianDate);
            }} 
            onCancel={() => setShowDateTimePicker(false)} 
        />
    );
}
```
- `visible` prop is the state of visibility of date picker
- `initialDate` prop is the initial value for date picker, **this date value should be gregorian**
- `onSelect` prop is function which will take care of changing the date by user
- `onCancel` prop is function which will take care of dismiss date picker by user

# Advanced Usage
Let's give an advanced example to use
```tsx
import React, {useState} from "react";
import GlobalDateTimePicker from 'react-native-global-datetimepicker';

export default function App() {
    const [ShowDateTimePicker, setShowDateTimePicker] = useState(false);
    const [SelectedDateJalali, setSelectedDateJalali] = useState<Date>();
    const [SelectedDateGregorian, setSelectedDateGregorian] = useState<Date>();
    return (
        <GlobalDateTimePicker
            persianNumber={true}
            visible={ShowDateTimePicker}
            calender={CalenderType.Jalali}
            theme={DateTimePickerThemes.Danger}
            translation={
                Calender === CalenderType.Jalali
                    ? DateTimePickerTranslations.fa
                    : DateTimePickerTranslations.DEFAULT
            }
            initialDate={SelectedDateGregorian}
            onSelect={(gregorianDate, jalaliDate) => {
                setShowDateTimePicker(false);
                setSelectedDateJalali(jalaliDate);
                setSelectedDateGregorian(gregorianDate);
            }} 
            onCancel={() => setShowDateTimePicker(false)} 
        />
    );
}
```
- `persianNumber` prop enable the converter that convert english number to arabic number
- `calender` prop is the type of calendar the date picker should be used, there is two type of calendar 
  type available in library that you can import as **CalenderType**, the current calendar 
  type is **Gregorian** and **Jalali**, default calendar type is **Gregorian**
- `theme` prop is an object contains the color of each part of component, there is three theme available
  in library that you can import as **DateTimePickerThemes** and use them, the current available theme 
  is **Primary** and **Danger** and **MFCP**, default theme is **Primary**, also you can create your
  own theme, the interface is like:
```js
const MFCP = {
    DayText: '#232323',
    HeaderDay: '#ffc4c9',
    HeaderYear: '#ffc4c9',
    SelectedDay: '#ff4d5b',
    WeekDayText: '#a9a9a9',
    YearItemText: '#232323',
    TodayDayText: '#ff4d5b',
    ButtonRipple: '#2323231A',
    SelectedDayText: '#ffffff',
    SelectDayRipple: '#ff4d5b',
    HeaderBackground: '#ff4d5b',
    HeaderSelectedMode: '#ffffff',
    SelectedYearItemText: '#ff4d5b'
}
```
- `translation` prop is an object contains the text of each part of component, there is two language supported unit now that you can import as **DateTimePickerTranslations** and use them, the current available language is **English** and **Persian**.

# TODO
- [ ] Support time picker

## Contributions
If you're interested in contributing to this project, first of all I would like to extend my heartfelt gratitude.

Please feel free to reach out to me if you need help. My Email: AliRezaBeigyKhu@gmail.com
Telegram: [@AliRezaBeigy](https://t.me/AliRezaBeigyKhu)

## LICENSE

MIT