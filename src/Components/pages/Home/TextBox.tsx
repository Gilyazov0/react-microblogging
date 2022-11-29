import { ChangeEvent, useRef } from "react";
import "../../style/TextBox.css";

interface TextBoxProps {
  setTweetLength: Function;
}

const TextBox: React.FC<TextBoxProps> = (props: TextBoxProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = ref.current;
    if (input) {
      props.setTweetLength(input.value.length);
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
