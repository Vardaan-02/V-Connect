import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertIsoToHuman(data: string) {
  const datePart = data.split("T")[0];
  const timePart = data.split("T")[1].split(".")[0];
  return { date: datePart, time: timePart };
}