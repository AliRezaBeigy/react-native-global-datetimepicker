import React, {useEffect, useRef} from 'react';
import styles from './styles';
import {FlatList} from 'react-native';
import useDateTimePicker from '../../Hooks/useDateTimePicker';
import {CalendarType} from '../../Providers/DateTimePickerProvider';
import Year from '../Year';

interface Props {
  years: {value: number; label: string}[];
}

export default function YearPicker({years}: Props) {
  const listRef = useRef<FlatList>(null);
  const {year, selectedDate, setYear, calendar} = useDateTimePicker();

  const scrollTo = (index: number, animated: boolean) => {
    if (listRef.current) {
      let scrollIndex =
        Math.ceil(
          (index - (calendar === CalendarType.Gregorian ? 1900 : 1300)) / 3,
        ) + 0.75;
      const maxIndex = Math.ceil(years.length / 3) - 1;
      if (maxIndex < scrollIndex) {
        scrollIndex = maxIndex;
      }
      listRef.current.scrollToIndex({
        animated,
        viewPosition: 0,
        viewOffset: 4 * 60,
        index: scrollIndex,
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
      numColumns={3}
      style={styles.years}
      columnWrapperStyle={styles.content_container}
      getItemLayout={(_, index) => {
        return {
          length: 60,
          offset: index * 60,
          index,
        };
      }}
      renderItem={({item}) => (
        <Year
          value={item.value}
          label={item.label}
          onPressYear={() => {
            setYear(item.value);
            scrollTo(item.value, true);
          }}
          selected={item?.value === selectedDate?.getFullYear()}
        />
      )}
      keyboardShouldPersistTaps="handled"
      keyExtractor={item => item.label}
    />
  );
}
