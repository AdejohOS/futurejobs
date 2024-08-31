import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}
