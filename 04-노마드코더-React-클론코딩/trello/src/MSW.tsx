import React from "react";
import { useRecoilState } from "recoil";
import { hoursSelector, minuteState } from "./mswAtoms";

export default function MSW() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHoursSelector] = useRecoilState(hoursSelector);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHoursSelector(+event.currentTarget.value);
  };

  return (
    <div>
      <input value={minutes} onChange={onMinutesChange} type="number" />
      <input value={hours} onChange={onHoursChange} type="number" />
    </div>
  );
}
