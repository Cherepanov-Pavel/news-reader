import type { DateConstructorParameter, FrontendDateFormat } from '~/types/date';

export const convertDateToFrontendDate = (date: DateConstructorParameter): FrontendDateFormat => {
  const epochMilliseconds = new Date(date).getTime();
  const instant = Temporal.Instant.fromEpochMilliseconds(epochMilliseconds);

  const plainDateTime = instant.toZonedDateTimeISO(Temporal.Now.timeZoneId()).toPlainDate();

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return formatter.format(plainDateTime) as FrontendDateFormat;
};
