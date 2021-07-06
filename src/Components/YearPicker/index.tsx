import React, {useCallback, useEffect, useRef} from 'react';
import styles from './styles';
import {FlatList, Pressable, Text} from 'react-native';
import useDateTimePicker from '../../Hooks/useDateTimePicker';
import {CalendarType} from '../../Providers/DateTimePickerProvider';

interface Props {
  years: {value: number; label: string}[];
}

export default function YearPicker({years}: Props) {
  const listRef = useRef<FlatList>(null);
  const {year, theme, setYear, calendar} = useDateTimePicker();
  const itemRender = useCallback(
    ({item}) => (
      <Pressable
        style={styles.year_item}
        onPress={() => {
          setYear(item.value);
          scrollTo(item.value, true);
        }}
        android_ripple={{borderless: false, color: theme.ButtonRipple}}>
        <Text
          style={[
            styles.year_item_text,
            {color: theme.YearItemText},
            ...(item.value === year
              ? [styles.selected_year, {color: theme.SelectedYearItemText}]
              : []),
          ]}>
          {item.label}
        </Text>
      </Pressable>
    ),
    [],
  );

  const scrollTo = (index: number, animated: boolean) => {
    if (listRef.current) {
      listRef.current.scrollToIndex({
        animated,
        viewPosition: 0,
        viewOffset: 4 * 48,
        index: index - (calendar === CalendarType.Gregorian ? 1900 : 1300),
      });
    }
  };

  useEffect(() => {
    scrollTo(year, false);
  }, []);

  return (
    <FlatList
      data={years}
      ref={listRef}
      style={styles.years}
      getItemLayout={(_, index) => {
        return {
          length: 48,
          offset: index * 48,
          index,
        };
      }}
      renderItem={itemRender}
      keyboardShouldPersistTaps="handled"
      keyExtractor={(item) => item.label}
    />
  );
}
