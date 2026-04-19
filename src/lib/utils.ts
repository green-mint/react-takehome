import { clsx, type ClassValue } from "clsx";
import twMerge from "./tw-merge";
import { format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number,
  decimals?: number,
  currency = "USD",
) {
  return (decimals ? price : Math.ceil(price)).toLocaleString("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: decimals ?? 0,
    maximumFractionDigits: decimals ?? 0,
  });
}

export type DateFormat =
  | "yyyy-MM-dd" // 2024-01-15
  | "eee, MMM d" // Mon, Jan 15
  | "h:mm a" // 1:00 PM
  | "MMM dd" // Jan 15
  | "MMM dd, yyyy" // Jan 15, 2024
  | "HH:mm" // 13:00
  | "EEE dd MMM" // Fri 24 Jan
  | "EEE, dd MMM" // Fri, 24 Jan
  | "MM/dd" // 01/15
  | "MMM dd, yyyy 'at' h:mm a" // Jan 15, 2024 at 1:00 PM
  | "h:mm aaa" // 1:00 am
  | "h:mm a 'on' EEE, MMM d" // 1:00 PM on Mon, Jan 15
  | "dd MMM" // 15 Jan
  | "yyyy-MM-dd'T'HH:mm:ss" // 2024-01-15T00:00:00
  | "yyyy-MM-dd'T'HH:mm:ss.SSS"; // 2024-01-15T00:00:00.000

export function minutesToHoursMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const hoursString = hours > 0 ? `${hours}h` : "";
  const minsString = mins > 0 ? `${mins}m` : "";
  return `${hoursString} ${minsString}`.trim();
}

export function formatDateTime(
  date: Date | string | number,
  fmt: DateFormat | (string & {}),
): string {
  if (typeof date === "string") return format(parseISO(date), fmt);
  return format(date, fmt);
}
