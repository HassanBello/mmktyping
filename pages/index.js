import Head from "next/head";
import { useState, useEffect } from "react";
import TestGenerator from "../components/TestGenerator";
import TypingTest from "../components/TypingTest";
import TestScore from "../components/TestScore";

const calculateTimeLeft = (time) => {
  const timerEnd = new Date(time);
  let difference = +timerEnd - +new Date();
  let timeLeft = {};
  if (difference >= 0) {
    timeLeft = {
      minutes: Math.floor((difference / 1000 / 60)),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

export default function Home() {
  const [time, setTime] = useState();
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [countDownDate, setCountdownDate] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});
  const [score, setScore] = useState(0);
  const [result, setResult] = useState({ wpm: 0, score: 0, accuracy: 0 });

  const startTest = () => {
    setStarted(!started);
    setCountdownDate(new Date().getTime() + time * 60 * 1000);
    calculateTimeLeft(time);
  };

  const finishTest = () => {
    const wordTotal = text.split(" ").length;
    const testResult = {
      wpm: score / (timeSpent / 60),
      accuracy: Math.floor((score / wordTotal) * 100),
      score: `${score}/${wordTotal}`,
      timeSpent
    };
    setResult(testResult);
    setStarted(!started);
    setFinished(!finished);
  };

  const restartTest = () => {
    setTime(0);
    setText("");
    setStarted(false);
    setFinished(false);
    setCountdownDate(0);
    setTimeSpent(0);
    setTimeLeft({});
    setScore(0);
    setResult({ wpm: 0, score: 0, accuracy: 0 });
  };

  useEffect(() => {
    if (started) {
      if (
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0
      ) {
        setStarted(!started);
        setFinished(!finished);
        return;
      }
      setTimeout(() => {
        setTimeLeft(calculateTimeLeft(countDownDate));
        setTimeSpent(timeSpent + 1);
      }, 1000);
    }
  });

  return (
    <>
      <Head>
        <title>MMK Test App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!started && !finished && (
        <TestGenerator
          timeValue={time}
          setTimeValue={(value) => setTime(value)}
          textValue={text}
          setTextValue={(value) => setText(value)}
          handleStartClick={startTest}
        />
      )}
      {started && !finished && (
        <div className="flex flex-col my-4">
          <h1 id="test-timer" className="text-purple-800 font-900 text-3xl text-center">
          Test Timer {timeLeft.minutes} : {timeLeft.seconds}
          </h1>
          <TypingTest
            typingText={text}
            updateScore={() => setScore(score + 1)}
            endTest={finishTest}
            restartTest={restartTest}
          />
        </div>
      )}
      {!started && finished && <TestScore {...result} restartTest={restartTest} />}
    </>
  );
}
