interface Errorprops {
  message?: string;
}
export default function ErrorComponent({ message }: Errorprops) {
  return (
    <p className="mt-2 rounded-md font-semibold text-[14px] text-red-500">
      {message}
    </p>
  );
}
