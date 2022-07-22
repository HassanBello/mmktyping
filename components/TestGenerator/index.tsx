import CustomDataList from "../forms/CustomDatalist";
import CustomTextArea from "../forms/CustomTextArea";
import CustomButton from "../CustomButton";
import { generateText } from "../../utils/generate-text";

type Props = {
  timeValue: number;
  setTimeValue: Function;
  textValue: string;
  setTextValue: Function;
  handleStartClick: Function;
};

export default function TestGenerator({
  timeValue,
  setTimeValue,
  textValue,
  setTextValue,
  handleStartClick,
}: Props) {
  const dataListConfig = {
    value: timeValue,
    change: (value: number) => {
      setTimeValue(value);
    },
    title: "Test Time(Minutes)",
    id: "test-time",
    listName: "time-list",
    options: [1, 2, 5],
    inputType: "number",
    placeholder: "Input/Select Test Time in minutes",
  };

  const textAreaConfig = {
    value: textValue,
    change: (value: string) => {
      setTextValue(value);
    },
    title: "Text for Typing",
    id: "test-text",
    placeholder:
      "Input text here or click the generate text button to get text",
  };

  const handleTextGeneration = () => {
    let generatedText = generateText();
    setTextValue(generatedText);
  };
  return (
    <>
      <div className="flex flex-col p-3 h-full ">
        <div className="flex flex-row justify-center mx-auto w-1/4 my-2">
          <CustomDataList {...dataListConfig} />
        </div>
        <div className="flex flex-row justify-center mx-auto w-2/4 my-2">
          <CustomTextArea {...textAreaConfig} />
        </div>
        <div className="flex flex-row justify-center my-1">
          <CustomButton
            classes="w-1/4 mx-1"
            type="secondary"
            id="generate-text-btn"
            click={handleTextGeneration}
          >
            Generate Text
          </CustomButton>
          <CustomButton
            classes="w-1/4 mx-1"
            type="alt"
            id="clear-text-btn"
            click={() => setTextValue("")}
          >
            Clear Text
          </CustomButton>
        </div>
        <div className="flex flex-row justify-center my-1">
          <CustomButton
            disabled={textValue.length <= 0 || timeValue < 1}
            classes="w-1/4"
            type="primary"
            id="start-test-btn"
            click={handleStartClick}
          >
            Start
          </CustomButton>
        </div>
      </div>
    </>
  );
}
