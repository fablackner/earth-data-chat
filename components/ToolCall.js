export const isToolPart = (part) => part.type.startsWith('tool-') || part.type === 'dynamic-tool';
const toolName = (part) => (part.type === 'dynamic-tool' ? part.toolName : part.type.slice(5));

export default function ToolCall({ part }) {
  const done = part.state === 'output-available';
  const failed = part.state === 'output-error';
  return (
    <div className={`tool ${failed ? 'failed' : ''}`}>
      <span className={`dot ${done || failed ? '' : 'pulse'}`} />
      {toolName(part).replaceAll('_', ' ')}
      <span className="status">{failed ? 'failed' : done ? 'done' : 'fetching…'}</span>
    </div>
  );
}
