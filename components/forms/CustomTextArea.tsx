type Props = {
  value: string;
  change: Function;
  title: string;
  [x:string]: any;
};
export default function CustomTextArea({
  value,
  change,
  title,
  ...others
}: Props) {
  return (
    <div className="w-full flex flex-col p-3 border border-purple-500 bg-white rounded-md">
      <h6 className="text-base font-600 capitalize">{title}</h6>
      <textarea
        className="w-full border-0 outline-none focus:outline-none active:outline-none text-base text-black"
        value={value}
        onChange={(e) => change(e.target.value)}
        {...others}
      />
    </div>
  );
}
