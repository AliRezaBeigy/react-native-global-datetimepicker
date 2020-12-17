import {DayInfo} from '../Components/Day';
import {weekDaysJalali, yearMonthsJalali} from './Contants';

export const getMonthDays = (
  year: number,
  month: number,
  persianNumber: boolean,
): DayInfo[] => {
  let date = new Date(year, month, 0);
  let dayCount = date.getDate();
  let startDay = date.getDay();

  return <DayInfo[]>Array.from({length: startDay + dayCount}, (_, i) => {
    if (i < startDay) return {};
    return {
      value: new Date(year, month, i - startDay + 1),
      label: persianNumber
        ? toPersianNumber(`${i - startDay + 1}`)
        : `${i - startDay + 1}`,
    };
  });
};

export function toPersianNumber(text: string) {
  let arabicNumbers = ['۰', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return text
    .split('')
    .map((c) => (!isNaN(parseInt(c, 10)) ? arabicNumbers[parseInt(c, 10)] : c))
    .join('');
}

function mod(a: number, b: number) {
  return a - Math.floor(a / b) * b;
}

const GE = 1721425.5;
const PE = 1948320.5;

function lg(year: number) {
  return year % 4 === 0 && !(year % 100 === 0 && year % 400 != 0);
}

function g2j(year: number, month: number, day: number) {
  return (
    GE -
    1 +
    365 * (year - 1) +
    Math.floor((year - 1) / 4) +
    -Math.floor((year - 1) / 100) +
    Math.floor((year - 1) / 400) +
    Math.floor(
      (367 * month - 362) / 12 + (month <= 2 ? 0 : lg(year) ? -1 : -2) + day,
    )
  );
}

function p2j(year: number, month: number, day: number) {
  let epbase, epyear;

  epbase = year - (year >= 0 ? 474 : 473);
  epyear = 474 + mod(epbase, 2820);

  return (
    day +
    (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6) +
    Math.floor((epyear * 682 - 110) / 2816) +
    (epyear - 1) * 365 +
    Math.floor(epbase / 2820) * 1029983 +
    (PE - 1)
  );
}

function gregorianToJalali(gY: number, gM: number, gD: number) {
  const julian = Math.floor(g2j(gY, gM, gD)) + 0.5;

  const depoch = julian - p2j(475, 1, 1);
  const cycle = Math.floor(depoch / 1029983);
  const cyear = mod(depoch, 1029983);
  let ycycle;
  if (cyear === 1029982) {
    ycycle = 2820;
  } else {
    const aux1 = Math.floor(cyear / 366);
    const aux2 = mod(cyear, 366);
    ycycle =
      Math.floor((2134 * aux1 + 2816 * aux2 + 2815) / 1028522) + aux1 + 1;
  }
  let year = ycycle + 2820 * cycle + 474;
  if (year <= 0) {
    year--;
  }
  const yday = julian - p2j(year, 1, 1) + 1;
  const month = yday <= 186 ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
  const day = julian - p2j(year, month, 1) + 1;
  return [year, month, day];
}

function jalaliToGregorian(jY: number, jM: number, jD: number) {
  const julian = p2j(jY, jM, jD);
  const wjd = Math.floor(julian - 0.5) + 0.5;
  const depoch = wjd - GE;
  const quadricent = Math.floor(depoch / 146097);
  const dqc = mod(depoch, 146097);
  const cent = Math.floor(dqc / 36524);
  const dcent = mod(dqc, 36524);
  const quad = Math.floor(dcent / 1461);
  const dquad = mod(dcent, 1461);
  const yindex = Math.floor(dquad / 365);
  let year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
  if (!(cent === 4 || yindex === 4)) {
    year++;
  }
  const yearday = wjd - g2j(year, 1, 1);
  const leapadj = wjd < g2j(year, 3, 1) ? 0 : lg(year) ? 1 : 2;
  const month = Math.floor(((yearday + leapadj) * 12 + 373) / 367),
    day = wjd - g2j(year, month, 1) + 1;

  return [year, month, day];
}

export function convertJalaliToGregorian(date: Date) {
  const [year, month, day] = jalaliToGregorian(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  return new Date(year, month, day);
}

export function convertGregorianToJalali(date: Date) {
  const [year, month, day] = gregorianToJalali(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  return new Date(year, month, day);
}

export function formatPersianGregorian(gregorianDate: Date) {
  const jalaliDate = convertGregorianToJalali(gregorianDate);
  return formatPersianJalali(jalaliDate);
}

export function formatPersianJalali(jalaliDate: Date) {
  return (
    weekDaysJalali[jalaliDate.getDay()].label +
    ' ' +
    jalaliDate.getDate() +
    ' ' +
    yearMonthsJalali[jalaliDate.getMonth()] +
    ' ' +
    jalaliDate.getFullYear()
  );
}
