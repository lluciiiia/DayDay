import { Entry } from "./IEntry";

export const checkDiaryExists = (date: string | null, diaryDates: string[]) => {
  if (date) {
    return diaryDates.includes(date);
  }
  return false;
};
