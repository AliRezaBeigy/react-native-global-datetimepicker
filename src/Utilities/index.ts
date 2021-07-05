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
    if (i < startDay) {
      return {};
    }
    return {
      value: new Date(year, month, i - startDay + 1),
      label: persianNumber
        ? toPersianNumber(`${i - startDay + 1}`)
        : `${i - startDay + 1}`,
    };
  });
};

export function toPersianNumber(text: string) {
  let arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  let englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return text
    .split('')
    .map((c) =>
      englishNumbers.indexOf(c) >= 0 ? arabicNumbers[parseInt(c, 10)] : c,
    )
    .join('');
}

const breaks = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192,
  2262, 2324, 2394, 2456, 3178,
];

function toJalaali(date: Date) {
  let gd = date.getDate();
  let gm = date.getMonth() + 1;
  let gy = date.getFullYear();
  return d2j(g2d(gy, gm, gd));
}

function toGregorian(date: Date) {
  let jd = date.getDate();
  let jm = date.getMonth() + 1;
  let jy = date.getFullYear();
  return d2g(j2d(jy, jm, jd));
}

function jalCal(jy: number, withoutLeap: boolean) {
  var bl = breaks.length,
    gy = jy + 621,
    leapJ = -14,
    jp = breaks[0],
    jm,
    jump: number = 0,
    leap,
    leapG,
    march,
    n,
    i;

  if (jy < jp || jy >= breaks[bl - 1])
    throw new Error('Invalid Jalaali year ' + jy);

  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) break;
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  n = jy - jp;

  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;

  // And the same in the Gregorian calendar (until the year gy).
  leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;

  march = 20 + leapJ - leapG;

  if (withoutLeap) return {gy: gy, march: march};

  if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) {
    leap = 4;
  }

  return {leap: leap, gy: gy, march: march};
}

function j2d(jy: number, jm: number, jd: number) {
  var r = jalCal(jy, true);
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
}

function d2j(jdn: number) {
  const [gy] = d2g(jdn);
  var jy: number = gy - 621,
    r = jalCal(jy, false),
    jdn1f = g2d(gy, 3, r.march),
    jd: number,
    jm: number,
    k;

  k = jdn - jdn1f;
  if (k >= 0) {
    if (k <= 185) {
      jm = 1 + div(k, 31);
      jd = mod(k, 31) + 1;
      return [jy, jm, jd];
    } else {
      k -= 186;
    }
  } else {
    jy -= 1;
    k += 179;
    if (r.leap === 1) k += 1;
  }
  jm = 7 + div(k, 30);
  jd = mod(k, 30) + 1;
  return [jy, jm, jd];
}

function g2d(gy: number, gm: number, gd: number) {
  var d =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}

function d2g(jdn: number) {
  var j, i, gd: number, gm: number, gy: number;
  j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  i = div(mod(j, 1461), 4) * 5 + 308;
  gd = div(mod(i, 153), 5) + 1;
  gm = mod(div(i, 153), 12) + 1;
  gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return [gy, gm, gd];
}

/*
  Utility helper functions.
*/

function div(a: number, b: number) {
  return ~~(a / b);
}

function mod(a: number, b: number) {
  return a - ~~(a / b) * b;
}

export function convertJalaliToGregorian(date: Date) {
  const [gy, gm, gd] = toGregorian(date);
  return new Date(gy, gm - 1, gd);
}

export function convertGregorianToJalali(date: Date) {
  const [jy, jm, jd] = toJalaali(date);
  return new Date(jy, jm - 1, jd);
}

export function formatPersianGregorian(
  gregorianDate: Date,
  format: string = 'MMM DD, yyyy',
) {
  const jalaliDate = convertGregorianToJalali(gregorianDate);
  return formatPersianJalali(jalaliDate, format);
}

export function formatPersianJalali(jalaliDate: Date, format: string) {
  if (format === 'MMM dd, yyyy')
    return (
      jalaliDate.getDate() +
      ' ' +
      yearMonthsJalali[jalaliDate.getMonth()] +
      ' ' +
      jalaliDate.getFullYear()
    );

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
