import clsx from "clsx";
type Props = {
  wordArray: string[],
  currentWord: number,
  incorrectArray: number[],
};

export default function TypingTextDisplay({
  wordArray,
  currentWord,
  incorrectArray,
}: Props) {
  return (
    <div className="w-3/4 flex flex-col p-3 border border-purple-500 bg-white rounded-md mx-auto">
      <div className="flex flex-row w-full flex-wrap">
        {wordArray.map((word, index) => (
          <span
            className={
              clsx({
                "font-600 text-purple-700": index === currentWord,
                "font-400 text-black": index > currentWord,
                "font-400 text-gray-400": index < currentWord,
                "font-400 text-red-600": incorrectArray.includes(index),
              }) + " mx-[2px]"
            }
            key={index}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
