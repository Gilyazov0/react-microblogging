import { ChangeEvent, useRef } from "react";
import "../../style/TextBox.css";

const TextBox: React.FC<{ setText: Function; text: string }> = ({
  setText,
  text,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = ref.current;
    if (input) {
      setText(input.value);
      input.style.height = "auto";
      input.style.height = `${e.target.scrollHeight}px`;
    }
  };
  if (window.scrollY === 0) ref.current?.focus();

  return (
    <textarea
      ref={ref}
      onInput={handleInput}
      className="tweet-content"
      value={text}
    />
  );
};

export default TextBox;
