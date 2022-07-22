import { useEffect, useState } from "react";
import { ItimeLeft } from "../../pages";

type Props = {
  time: number;
  timeSpent: number;
  handleTimerEnd: Function;
  setTimeSpent: Function;
};

const calculateTimeLeft = (time: number): ItimeLeft => {
  const timerEnd = new Date(time);
  let difference = +timerEnd - +new Date();
  let timeLeft = {} as ItimeLeft;
  if (difference >= 0) {
    timeLeft = {
      minutes: Math.floor(difference / 1000 / 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

export default function Timer({
  time,
  setTimeSpent,
  handleTimerEnd,
  timeSpent,
}: Props) {
  const [countDownDate, setCountdownDate] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<ItimeLeft>({
    minutes: 0,
    seconds: 0,
  });
  const startTimer = () => {
    setCountdownDate(new Date().getTime() + time * 60 * 1000);
  };
  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    if (timeLeft.minutes < 0 && timeLeft.seconds < 0) {
      handleTimerEnd();
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(countDownDate));
      setTimeSpent(timeSpent + 1);
      console.log(timeSpent)
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <>
      <h1
        id="test-timer"
        className="text-purple-800 font-900 text-3xl text-center"
      >
        Test Timer {timeLeft.minutes} : {timeLeft.seconds}
      </h1>
    </>
  );
}
