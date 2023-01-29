import cn from "classnames";
import { ButtonHTMLAttributes, FC } from "react";

interface OwnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Text content of the button
   */
  text?: string;
  /**
   * Indicates if the button is loading.
   * @default false
   */
  loading?: boolean;
  /**
   * Size of the button
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

type Props = OwnProps;

const FormButton: FC<Props> = (props) => {
  const { text, loading, disabled, size = "md", className, ...rest } = props;

  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-transparent shadow-md text-white bg-jucr-primary transition-transform",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jucr-primary",
        {
          "px-2.5 py-1.5 rounded text-xs": size === "xs",
          "px-3 py-2 rounded-md text-sm leading-4": size === "sm",
          "px-4 py-2 rounded-md text-sm": size === "md",
          "px-4 py-2 rounded-md text-base": size === "lg",
          "px-6 py-3 rounded-md text-base": size === "xl",
          "hover:scale-105 active:scale-95": !disabled && !loading,
          "opacity-75 cursor-not-allowed": disabled,
          "cursor-wait": loading,
        },
        className,
      )}
      disabled={loading || disabled}
      {...rest}
    >
      {loading ? (
        <div className="flex gap-0.5">
          <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-jucr-secondary rounded-full animate-[bounce_1s_infinite_333ms]" />
          <span className="w-2 h-2 bg-jucr-gray rounded-full animate-[bounce_1s_infinite_666ms]" />
        </div>
      ) : null}
      <span>{text}</span>
    </button>
  );
};

export default FormButton;
