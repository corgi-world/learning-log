import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hoursSelector = selector<number>({
  key: "hoursSelector",
  get: ({ get }) => {
    const hours = get(minuteState);
    return hours / 60;
  },
  set: ({ set }, newValue) => {
    const hours = newValue;
    const minutes = Number(hours) * 60;
    set(minuteState, minutes);
  },
});
