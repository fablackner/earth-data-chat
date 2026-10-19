import Markdown from 'react-markdown';

import ToolCall, { isToolPart } from './ToolCall';

export default function Message({ message }) {
  return (
    <div className={`msg ${message.role}`}>
      {message.parts.map((part, i) => {
        if (part.type === 'text') {
          return message.role === 'user' ? (
            <p key={i}>{part.text}</p>
          ) : (
            <Markdown key={i}>{part.text}</Markdown>
          );
        }
        if (isToolPart(part)) return <ToolCall key={i} part={part} />;
        return null;
      })}
    </div>
  );
}
