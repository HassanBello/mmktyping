import Head from "next/head";
import { useState } from "react";
import TestGenerator from "../components/TestGenerator";
import TypingTest from "../components/TypingTest";
import TestScore from "../components/TestScore";
import Timer from "../components/Timer";

export interface ItimeLeft {
  minutes: number;
  seconds: number;
}

interface ItestResult {
  wpm: number;
  score: string;
  accuracy: number;
  timeSpent: number;
}

export default function Home() {
  const [time, setTime] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [result, setResult] = useState<ItestResult>({
    wpm: 0,
    score: "",
    accuracy: 0,
    timeSpent: 0,
  });

  const startTest = () => {
    setStarted(!started);
  };

  const finishTest = () => {
    const wordTotal = text.split(" ").length;
    const testResult = {
      wpm: score / (timeSpent / 60),
      accuracy: Math.floor((score / wordTotal) * 100),
      score: `${score}/${wordTotal}`,
      timeSpent,
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
    setTimeSpent(0);
    setScore(0);
    setResult({ wpm: 0, score: "", accuracy: 0, timeSpent: 0 });
  };

  return (
    <>
      <Head>
        <title>MMK Test App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!started && !finished && (
        <TestGenerator
          timeValue={time}
          setTimeValue={(value: number) => setTime(value)}
          textValue={text}
          setTextValue={(value: string) => setText(value)}
          handleStartClick={startTest}
        />
      )}
      {started && !finished && (
        <div className="flex flex-col my-4">
          <Timer
            time={time}
            setTimeSpent={(e: number) => setTimeSpent(e)}
            timeSpent={timeSpent}
            handleTimerEnd={finishTest}
          />
          <TypingTest
            typingText={text}
            updateScore={() => setScore(score + 1)}
            endTest={finishTest}
            restartTest={restartTest}
          />
        </div>
      )}
      {!started && finished && (
        <TestScore {...result} restartTest={restartTest} />
      )}
    </>
  );
}
