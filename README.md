<p align="center">
  <img src="assets/icon.svg" alt="earth-data-chat icon" width="128">
</p>

<h1 align="center">earth-data-chat</h1>

A web chat for Earth observation and natural hazard data. Ask a question in plain
language; the model picks the right data sources, fetches current data, and gives you
a short, factual briefing: the events that matter, each with context and real numbers.

Data comes from [earth-data-mcp](https://github.com/fablackner/earth-data-mcp), an MCP
server (earthquakes, volcanoes, GDACS disaster alerts, weather and warnings, air quality,
marine, lightning, space weather, NASA EONET events, CO2).

## Stack

- **Next.js** (App Router) on Vercel
- `app/api/chat/route.js`: `streamText` with the MCP server's tools, via `@ai-sdk/mcp`
- `components/`: `Chat.js` (`useChat` from `@ai-sdk/react`, layout), `Message.js` (Markdown rendering), `ToolCall.js` (tool-call indicator)
- `lib/mcp.js`: cached MCP client; tools are discovered at run time, so new server tools need no change here
- `lib/instructions.js`: the reporting rules and how the server's notes are appended
- `lib/model.js`: the model provider (configured for DeepInfra with `DeepSeek-V4-Flash` via `@ai-sdk/openai`)

## Reporting rules

- **Select, don't relay.** A feed of 30 events becomes the five or six that matter,
  plus one line on what was left out.
- **Add background.** Each reported item gets a sentence of context.
- **Stay honest.** Figures come only from the data. Background knowledge is labelled
  as such and dropped when uncertain. Casualties, evacuations, tsunamis and orange/red
  alerts lead the report and are stated flatly.

## Environment variables

| Variable | Notes |
| --- | --- |
| `EARTH_DATA_MCP_URL` | required, e.g. `https://earth-data-mcp.vercel.app/mcp` |
| `OPENAI_API_KEY` | required (your DeepInfra or OpenAI API key; also accepts `DEEPINFRA_API_KEY`) |
| `OPENAI_BASE_URL` | optional, defaults to `https://api.deepinfra.com/v1/openai` (set to `https://api.openai.com/v1` for OpenAI) |
| `OPENAI_MODEL` | optional, defaults to `deepseek-ai/DeepSeek-V4-Flash` on DeepInfra (or `gpt-5.4-mini` on OpenAI) |

## Develop and deploy

```sh
cp .env.example .env   # fill in OPENAI_API_KEY
npm install
npm run dev                  # http://localhost:3000
vercel deploy --prod
```
