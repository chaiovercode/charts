import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";

export const barChartSchema = z.object({
  kicker: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  data: z.array(
    z.object({
      name: z.string(),
      value: z.number(),
      company: z.string(),
    })
  ),
  annotation: z.string(),
  source: z.string(),
  date: z.string(),
});

type BarChartProps = z.infer<typeof barChartSchema>;

const COMPANY_COLORS: Record<string, string> = {
  google: "#4285F4",
  openai: "#10a37f",
  anthropic: "#d4a27f",
  meta: "#0866FF",
  xai: "#e5e7eb",
  deepseek: "#536af4",
  mistral: "#ff7000",
  default: "#71717a",
};

export const AnimatedBarChart: React.FC<BarChartProps> = ({
  kicker,
  headline,
  subtitle,
  data,
  annotation,
  source,
  date,
}) => {
  // Static - no animation
  const barProgress = () => 1;

  const maxValue = Math.max(...data.map((d) => d.value));
  const companies = [...new Set(data.map((d) => d.company))].slice(0, 5);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        padding: "80px 60px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Lime accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 8,
          backgroundColor: "#c4f441",
        }}
      />

      {/* Kicker */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 600,
          color: "#c4f441",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginBottom: 28,
        }}
      >
        {kicker}
      </div>

      {/* Headline */}
      <h1
        style={{
          fontSize: 76,
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.0,
          margin: "0 0 24px 0",
          letterSpacing: "-0.03em",
          whiteSpace: "pre-line",
        }}
      >
        {headline}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 32,
          color: "#9ca3af",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {subtitle}
      </p>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: 32,
          marginTop: 44,
          flexWrap: "wrap",
        }}
      >
        {companies.map((company) => (
          <span
            key={company}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 26,
              color: "#6b7280",
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                backgroundColor: COMPANY_COLORS[company] || COMPANY_COLORS.default,
                borderRadius: 4,
                border: company === "xai" ? "2px solid #4b5563" : "none",
              }}
            />
            {company.charAt(0).toUpperCase() + company.slice(1)}
          </span>
        ))}
      </div>

      {/* Bars - ANIMATED */}
      <div
        style={{
          flex: 1,
          marginTop: 50,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {data.map((item, index) => {
          const progress = barProgress(index);
          const widthPercent = (item.value / maxValue) * 70 * progress;
          const displayValue = (item.value * progress).toFixed(1);
          const color = COMPANY_COLORS[item.company] || COMPANY_COLORS.default;

          return (
            <div
              key={item.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              {/* Label */}
              <div
                style={{
                  width: 280,
                  fontSize: 30,
                  fontWeight: 500,
                  color: "#9ca3af",
                  textAlign: "right",
                }}
              >
                {item.name}
              </div>

              {/* Bar + Value */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    width: `${widthPercent}%`,
                    height: 48,
                    backgroundColor: color,
                    borderRadius: "0 6px 6px 0",
                    minWidth: progress > 0 ? 4 : 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: "#ffffff",
                    minWidth: 90,
                    opacity: progress > 0.1 ? 1 : 0,
                  }}
                >
                  {displayValue}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Annotation */}
      <div
        style={{
          fontSize: 30,
          fontWeight: 600,
          color: "#e5e7eb",
          marginTop: 36,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span style={{ color: "#c4f441", fontSize: 36 }}>↑</span>
        {annotation}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 40,
          paddingTop: 32,
          borderTop: "2px solid #262626",
        }}
      >
        <span style={{ fontSize: 26, color: "#4b5563" }}>
          Source: {source} | {date}
        </span>
        <span
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#6b7280",
            letterSpacing: "0.06em",
          }}
        >
          CHAI<span style={{ color: "#c4f441" }}>OVER</span>CODE
        </span>
      </div>
    </AbsoluteFill>
  );
};
