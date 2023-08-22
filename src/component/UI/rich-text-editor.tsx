import { sanitize } from "dompurify";

interface IProps {
  text: any;
}

const RichTextEditor = ({ text }: IProps) => {
  return <span dangerouslySetInnerHTML={{ __html: sanitize(text) }} />;
};

export default RichTextEditor;
