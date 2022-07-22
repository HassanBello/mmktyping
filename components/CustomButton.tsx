import { MouseEvent } from "react";
import clsx from "clsx";

type Props = {
  click: Function;
  classes: string;
  type: string;
  [x: string]: any;
};

export default function CustomButton({
  click,
  classes,
  type,
  ...others
}: Props) {
  const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    click();
  };
  return (
    <button
      className={
        clsx({
          "bg-purple-800 text-white hover:bg-purple-700 disabled:bg-purple-400":
            type === "primary",
          "bg-gray-800 text-white hover:bg-gray-700 disabled:bg-gray-400":
            type === "secondary",
          "bg-red-800 text-white hover:bg-red-700 disabled:bg-red-400":
            type === "alt",
        }) +
        " " +
        classes +
        " disabled:cursor-not-allowed text-base py-3 rounded-[10px]"
      }
      onClick={handleMouseEvent}
      {...others}
    >
      {others.children}
    </button>
  );
}
