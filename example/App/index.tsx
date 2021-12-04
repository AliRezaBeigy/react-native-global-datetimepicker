import React, {useState} from 'react';
import {
  I18nManager,
  Pressable,
  SafeAreaView,
  StatusBar,
  Switch,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import GlobalDateTimePicker, {
  CalendarType,
  DateTimePickerMode,
  DateTimePickerThemes,
  DateTimePickerTranslations,
  weekDaysJalali,
  yearMonthsJalali,
} from 'react-native-global-datetimepicker';

export default function App() {
  const [Theme, setTheme] = useState(DateTimePickerThemes.MFCP);
  const [Calendar, setCalendar] = useState(CalendarType.Gregorian);
  const [PickerMode, setPickerMode] = useState<DateTimePickerMode>();
  const [SelectedDateJalali, setSelectedDateJalali] = useState<Date>();
  const [SelectedDateGregorian, setSelectedDateGregorian] = useState<Date>();

  let isGregorian = Calendar === CalendarType.Gregorian;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {SelectedDateGregorian && (
          <Text style={styles.gregorian_date_text}>
            {SelectedDateGregorian.getHours()}:
            {SelectedDateGregorian.getMinutes()}
          </Text>
        )}
        {SelectedDateGregorian && (
          <Text style={styles.gregorian_date_text}>
            {SelectedDateGregorian.toDateString()}
          </Text>
        )}
        {SelectedDateJalali && (
          <Text style={styles.jalali_date_text}>
            {weekDaysJalali[SelectedDateJalali.getDay()].label}{' '}
            {SelectedDateJalali.getDate()}{' '}
            {yearMonthsJalali[SelectedDateJalali.getMonth()]}{' '}
            {SelectedDateJalali.getFullYear()}
          </Text>
        )}
        <View
          style={[
            styles.button_container,
            {
              backgroundColor: Theme.SelectedDay,
            },
          ]}>
          <Pressable
            style={styles.button}
            onPress={() => setPickerMode(DateTimePickerMode.Day)}
            android_ripple={{
              borderless: true,
              color: Theme.SelectedDayText,
            }}>
            <Text style={styles.button_text}>Select Date And Time</Text>
          </Pressable>
        </View>
        <View style={styles.switch_container}>
          <Text style={styles.switch_text}>Jalali</Text>
          <Switch
            style={styles.switch}
            trackColor={{
              true: Theme.HeaderDay,
              false: Theme.HeaderDay,
            }}
            thumbColor={Theme.HeaderBackground}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() =>
              setCalendar(
                isGregorian ? CalendarType.Jalali : CalendarType.Gregorian,
              )
            }
            value={I18nManager.isRTL ? !isGregorian : isGregorian}
          />
          <Text style={styles.switch_text}>Gregorian</Text>
        </View>
        <View style={styles.themes_section}>
          <Text style={styles.themes_title}>Themes</Text>
          <View style={styles.themes}>
            <View
              style={[
                styles.theme,
                {
                  backgroundColor:
                    DateTimePickerThemes.Primary.HeaderBackground,
                },
              ]}>
              <Pressable
                onPress={() => setTheme(DateTimePickerThemes.Primary)}
                android_ripple={{borderless: true, color: '#2323232A'}}>
                <Text style={styles.theme_name}>Primary</Text>
              </Pressable>
            </View>
            <View
              style={[
                styles.theme,
                {backgroundColor: DateTimePickerThemes.Danger.HeaderBackground},
              ]}>
              <Pressable
                onPress={() => setTheme(DateTimePickerThemes.Danger)}
                android_ripple={{borderless: true, color: '#2323232A'}}>
                <Text style={styles.theme_name}>Danger</Text>
              </Pressable>
            </View>
            <View
              style={[
                styles.theme,
                {backgroundColor: DateTimePickerThemes.MFCP.HeaderBackground},
              ]}>
              <Pressable
                onPress={() => setTheme(DateTimePickerThemes.MFCP)}
                android_ripple={{borderless: true, color: '#2323232A'}}>
                <Text style={styles.theme_name}>MFCP</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <GlobalDateTimePicker
          theme={Theme}
          calendar={Calendar}
          mode={PickerMode}
          visible={PickerMode != undefined}
          initialDate={SelectedDateGregorian}
          persianNumber={Calendar === CalendarType.Jalali}
          translation={
            Calendar === CalendarType.Jalali
              ? DateTimePickerTranslations.fa
              : DateTimePickerTranslations.DEFAULT
          }
          onSelect={(gregorianDate, jalaliDate) => {
            if (
              PickerMode == DateTimePickerMode.Year ||
              PickerMode == DateTimePickerMode.Day
            ) {
              setPickerMode(DateTimePickerMode.Hour);
            } else {
              setPickerMode(undefined);
              setSelectedDateJalali(jalaliDate);
              setSelectedDateGregorian(gregorianDate);
            }
          }}
          onCancel={() => setPickerMode(undefined)}
        />
      </SafeAreaView>
    </>
  );
}
