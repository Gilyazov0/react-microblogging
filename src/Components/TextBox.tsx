import { ChangeEvent, useRef } from "react";
import "./style/TextBox.css";
import { TextBoxProps } from "../types";
const TextBox: React.FC<TextBoxProps> = (props: TextBoxProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = ref.current;
    if (input) {
      props.setLengthIsOk(input.value.length < 140);
      input.style.height = "auto";
      input.style.height = `${e.target.scrollHeight}px`;
    }
  };

  return (
    <textarea
      ref={ref}
      rows={1}
      onInput={handleInput}
      className="tweet-content"
    />
  );
};

export default TextBox;
