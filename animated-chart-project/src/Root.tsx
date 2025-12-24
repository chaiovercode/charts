import { Composition } from "remotion";
import { AnimatedBarChart, barChartSchema } from "./compositions/AnimatedBarChart";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="HallucinationChart"
        component={AnimatedBarChart}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
        schema={barChartSchema}
        defaultProps={{
          kicker: "The Honesty Rankings",
          headline: "Google's Gemini Is The\nMost Honest AI Model",
          subtitle: "Hallucination rate when summarizing documents [lower is better]",
          data: [
            { name: "Gemini 2.0 Flash", value: 0.7, company: "google" },
            { name: "o3-mini (high)", value: 0.8, company: "openai" },
            { name: "GPT-4.5 Preview", value: 1.2, company: "openai" },
            { name: "GPT-5 (high)", value: 1.4, company: "openai" },
            { name: "GPT-4o", value: 1.5, company: "openai" },
            { name: "Grok-3 Beta", value: 2.1, company: "xai" },
            { name: "DeepSeek V3", value: 3.9, company: "deepseek" },
            { name: "Claude 3.7 Sonnet", value: 4.4, company: "anthropic" },
          ],
          annotation: "Google takes the crown with just 0.7% hallucination rate",
          source: "Vectara Leaderboard",
          date: "Dec 2025",
        }}
      />
    </>
  );
};
