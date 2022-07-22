import CustomButton from "../CustomButton";

type Props = {
  score: string;
  restartTest: Function;
  wpm: number;
  accuracy: number;
  timeSpent: number;
};

export default function TestScore({
  score,
  restartTest,
  wpm,
  accuracy,
  timeSpent,
}: Props) {
  return (
    <div id="challenge-result" className="flex justify-center p-3 text-center">
      <div className="flex flex-col">
        <h1 className="text-purple-800 font-900 text-3xl">And you're done!</h1>
        <p className="text-base">
          Words Per Minute: <span id="wpm">{wpm}</span>
        </p>
        <p className="text-base">
          Score: <span id="score">{score}</span>
        </p>
        <p className="text-base">
          Accuracy: <span id="accuracy">{accuracy}</span>%
        </p>
        <CustomButton
          classes="w-full m-1"
          type="primary"
          click={restartTest}
          id="reset-test-btn"
        >
          Reset Test
        </CustomButton>
      </div>
    </div>
  );
}
