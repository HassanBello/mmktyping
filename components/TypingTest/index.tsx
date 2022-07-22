import { useState, useMemo } from "react";
import TypingTextDisplay from "./TypingTextDisplay";
import CustomTextArea from "../forms/CustomTextArea";
import CustomButton from "../CustomButton";

type Props = {
  typingText: string;
  updateScore: Function;
  endTest: Function;
  restartTest: Function;
};

export default function TypingTest({
  typingText,
  updateScore,
  endTest,
  restartTest,
}: Props) {
  const [currentWord, setCurrentWord] = useState<number>(0);
  const [typingInput, setTypingValue] = useState<string>("");
  const [incorrectWords, setIncorrectWords] = useState<number[]>([]);
  const wordArray = useMemo(
    () => typingText.replaceAll(" ", " ␣ ").split(" "),
    [typingText]
  );

  const handleChange = (value: string) => {
    setTypingValue(value);
  };

  const handleKeyPress = (currentLetter: string) => {
    let previousWord = "";
    if (currentLetter === " ") {
      let userInputText = typingInput.replaceAll(" ", " ␣ ").split(" ");
      previousWord = userInputText[userInputText.length - 1];
      if (previousWord === wordArray[currentWord]) {
        updateScore();
      } else {
        setIncorrectWords([...incorrectWords, currentWord]);
      }
      if (currentWord + 1 > wordArray.length) {
        endTest();
        return;
      }
      setCurrentWord(currentWord + 2);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-col p-3 h-full w-full">
          <TypingTextDisplay
            wordArray={wordArray}
            currentWord={currentWord}
            incorrectArray={incorrectWords}
          />
        </div>
      </div>
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-col p-3 h-full w-3/4">
          <CustomTextArea
            value={typingInput}
            title="Input Text Here"
            change={handleChange}
            onKeyDown={(event: KeyboardEvent) => handleKeyPress(event.key)}
            id="typing-area"
            row="8"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <CustomButton
          id="reset-test-btn"
          classes="w-1/4 mx-2"
          type="secondary"
          click={restartTest}
        >
          Reset Test
        </CustomButton>
        <CustomButton
          id="finish-test-btn"
          classes="w-1/4 mx-2"
          type="primary"
          click={endTest}
        >
          Finish Test
        </CustomButton>
      </div>
    </div>
  );
}
