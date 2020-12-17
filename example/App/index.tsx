import React, {useState} from 'react';
import {
  Text,
  View,
  Switch,
  StatusBar,
  Pressable,
  I18nManager,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import GlobalDateTimePicker, {
  CalenderType,
  weekDaysJalali,
  yearMonthsJalali,
  DateTimePickerThemes,
  DateTimePickerTranslations,
} from 'react-native-global-datetimepicker';

export default function App() {
  const [Theme, setTheme] = useState(DateTimePickerThemes.MFCP);
  const [Calender, setCalender] = useState(CalenderType.Gregorian);
  const [SelectedDateJalali, setSelectedDateJalali] = useState<Date>();
  const [SelectedDateGregorian, setSelectedDateGregorian] = useState<Date>();
  const [ShowDateTimePicker, setShowDateTimePicker] = useState(false);

  let isGregorian = Calender === CalenderType.Gregorian;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
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
            onPress={() => setShowDateTimePicker(true)}
            android_ripple={{
              borderless: true,
              color: Theme.SelectedDayText,
            }}>
            <Text style={styles.button_text}>Select Date</Text>
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
            onValueChange={(v) =>
              setCalender(
                isGregorian ? CalenderType.Jalali : CalenderType.Gregorian,
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
          calender={Calender}
          visible={ShowDateTimePicker}
          initialDate={SelectedDateGregorian}
          persianNumber={Calender === CalenderType.Jalali}
          translation={
            Calender === CalenderType.Jalali
              ? DateTimePickerTranslations.fa
              : DateTimePickerTranslations.DEFAULT
          }
          onSelect={(gregorianDate, jalaliDate) => {
            setShowDateTimePicker(false);
            setSelectedDateJalali(jalaliDate);
            setSelectedDateGregorian(gregorianDate);
          }}
          onCancel={() => setShowDateTimePicker(false)}
        />
      </SafeAreaView>
    </>
  );
}
