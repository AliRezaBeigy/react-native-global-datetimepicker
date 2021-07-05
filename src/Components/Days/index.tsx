import React, {useMemo} from 'react';
import styles from './styles';
import Day, {DayInfo} from '../Day';
import {FlatList} from 'react-native';
import {getMonthDays} from '../../Utilities';
import useDateTimePicker from '../../Hooks/useDateTimePicker';

export interface Props {
  onPressDay: (value: Date) => void;
}

export default function Days({onPressDay}: Props) {
  const {month, year, persianNumber, selectedDate} = useDateTimePicker();
  const days = useMemo(() => getMonthDays(year, month, persianNumber), [
    year,
    month,
    persianNumber,
  ]);

  return (
    <FlatList<DayInfo>
      numColumns={7}
      style={styles.days}
      columnWrapperStyle={styles.content_container}
      data={days}
      getItemLayout={(_, index) => {
        return {
          length: 40,
          offset: index * 40,
          index,
        };
      }}
      renderItem={({item}) => (
        <Day
          value={item.value}
          label={item.label}
          onPressDay={onPressDay}
          selected={item?.value?.toDateString() === selectedDate.toDateString()}
        />
      )}
      keyExtractor={(item, i) => item.value?.toDateString() ?? `${i}`}
    />
  );
}
