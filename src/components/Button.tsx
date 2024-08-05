import { ReactNode, type ComponentPropsWithoutRef } from "react";
type ButtonProps = {
  buttonBackGround: string;
  textColor: string;
  children?: ReactNode;
  disable?: string;
  onClick?: () => void;
} & ComponentPropsWithoutRef<"button">;
export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={` ${props.textColor} ${props.buttonBackGround} ${props.disable} disabled:bg-red-900 p-2 rounded-md font-semibold text-sm`}
    >
      {props.children}
    </button>
  );
}
