import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDate, formatDistanceToNowStrict } from "date-fns";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

export function formatRelativeDate(from: Date) {
  const currentDate = new Date();
  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 100) {
    return formatDistanceToNowStrict(from, { addSuffix: true });
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, "MMM d");
    } else {
      return formatDate(from, "MMM d, yyy");
    }
  }
}
