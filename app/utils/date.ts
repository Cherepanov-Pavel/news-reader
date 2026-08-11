import type { DateConstructorParameter, FrontendDateFormat } from '~/types/date';

export const convertDateToFrontendDate = (date: DateConstructorParameter): FrontendDateFormat => {
  const epochMilliseconds = new Date(date).getTime();
  const instant = Temporal.Instant.fromEpochMilliseconds(epochMilliseconds);

  // 3. Преобразуем в нужный нам тип (например, PlainDateTime) и форматируем
  //    с помощью Intl.DateTimeFormat, как рекомендует Temporal [citation:5][citation:8]
  const plainDateTime = instant.toZonedDateTimeISO(Temporal.Now.timeZoneId()).toPlainDate();

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return formatter.format(plainDateTime) as FrontendDateFormat;
};
