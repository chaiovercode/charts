import { useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList, ReferenceLine } from 'recharts';

// Instagram caption
export const caption = `Google's Gemini just became the most honest AI model.

According to Vectara's Hallucination Leaderboard (Dec 2025), Gemini 2.5 Flash Lite hallucinates only 3.3% of the time, beating OpenAI's GPT-5.2 (8.4%) significantly.

While OpenAI and Anthropic battle for "smartest", Google quietly built the most reliable model.

The AI honesty race is heating up. Which model do you trust most?

---
Source: Vectara Hallucination Leaderboard, Dec 2025
.
.
.
#ai #llm #gemini #google #openai #artificialintelligence #chaiovercode`;

// Data from Vectara Hallucination Leaderboard (Dec 18, 2025)
const data = [
  { name: 'Gemini 2.5 Flash Lite', value: 3.3, company: 'google' },
  { name: 'Phi-4', value: 3.7, company: 'microsoft' },
  { name: 'Llama 3.3 70B Turbo', value: 4.1, company: 'meta' },
  { name: 'Gemma 3 12B IT', value: 4.4, company: 'google' },
  { name: 'Mistral Large 2411', value: 4.5, company: 'mistral' },
  { name: 'DeepSeek V3.2 Exp', value: 5.3, company: 'deepseek' },
  { name: 'GPT-4.1 (2025-04)', value: 5.6, company: 'openai' },
  { name: 'Grok-3', value: 5.8, company: 'xai' },
  { name: 'Gemini 2.5 Pro', value: 7.0, company: 'google' },
  { name: 'GPT-5.2 Low', value: 8.4, company: 'openai' },
];

const avgRate = (data.reduce((a, b) => a + b.value, 0) / data.length).toFixed(1);

const FORMAT_PRESETS = {
  portrait: { width: 540, height: 675 },
};

// Simplified narrative colors
const NARRATIVE_COLORS = {
  'Gemini 2.5 Flash Lite': '#c4f441', // Hero: Lime
  'GPT-5.2 Low': '#ffffff', // Comparison/Worst
  'GPT-4.1 (2025-04)': '#10a37f', // Secondary Hero
};

export default function HallucinationChart() {
  const chartRef = useRef(null);
  const format = 'portrait';
  const preset = FORMAT_PRESETS[format];

  // Custom tick for Y-Axis
  const CustomTick = ({ x, y, payload }) => {
    const isWinner = payload.index === 0;
    const isTop3 = payload.index < 3;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={-4}
          y={4}
          textAnchor="end"
          fill={isWinner ? '#c4f441' : isTop3 ? '#ffffff' : '#9ca3af'}
          fontSize={11}
          fontWeight={isTop3 ? 600 : 400}
        >
          {data[payload.index].name}
        </text>
      </g>
    );
  };

  // Custom Label for Bar
  const CustomLabel = (props) => {
    const { x, y, width, value, index } = props;
    const isWinner = index === 0;
    const isTop3 = index < 3;
    return (
      <text
        x={x + width + 8}
        y={y + 14}
        fill={isWinner ? '#c4f441' : '#ffffff'}
        fontSize={isWinner ? 14 : 12}
        fontWeight={isTop3 ? 700 : 500}
      >
        {value}%
      </text>
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#0a0a0a', padding: '20px' }}>
      {/* Chart Container */}
      <div
        id="capture-target"
        style={{
          width: preset.width,
          height: preset.height,
          background: '#000000',
          borderLeft: '4px solid #c4f441',
          boxSizing: 'border-box',
          padding: format === 'square' ? '28px 24px' : '32px 28px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Kicker */}
        <div style={{
          fontSize: '12px',
          fontWeight: 700,
          color: '#c4f441',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: '10px',
        }}>
          Hallucination Leaderboard
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: '32px',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.1,
          margin: '0 0 8px 0',
          letterSpacing: '-0.02em',
        }}>
          Google's Gemini Takes<br />
          the <span style={{ color: '#c4f441' }}>Honesty Crown</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '13px',
          color: '#6b7280',
          margin: 0,
          lineHeight: 1.4,
        }}>
          Hallucination rate when summarizing documents · Lower = More Honest
        </p>

        {/* Key Stats Row (Optional, but kept for consistency with previous) */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginTop: '14px',
          marginBottom: '12px',
        }}>
          {[
            { label: 'Winner', value: '3.3%', color: '#c4f441', subtext: 'Gemini' },
            { label: 'Market Avg', value: `${avgRate}%`, color: '#6b7280', subtext: 'Top 10' },
            { label: 'Laggard', value: '8.4%', color: '#ffffff', subtext: 'GPT-5.2' },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: '#141414',
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid #1f1f1f',
              flex: 1,
            }}>
              <div style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: stat.color }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '10px', color: '#4b5563' }}>{stat.subtext}</div>
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div style={{ flex: 1, marginTop: '16px', minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ left: 10, right: 55, top: 4, bottom: 4 }}
              barCategoryGap="20%"
            >
              <XAxis type="number" hide domain={[0, 9]} />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={<CustomTick />}
                width={130}
              />
              <ReferenceLine
                x={parseFloat(avgRate)}
                stroke="#3f3f46"
                strokeDasharray="4 4"
                strokeWidth={1}
              />
              <Bar
                dataKey="value"
                radius={[0, 4, 4, 0]}
                barSize={20}
              >
                {data.map((entry, index) => {
                  const isWinner = index === 0;
                  const baseColor = NARRATIVE_COLORS[entry.name] || '#3f3f46';
                  return (
                    <Cell
                      key={index}
                      fill={baseColor}
                      style={{
                        filter: isWinner ? 'drop-shadow(0 0 8px rgba(196, 244, 65, 0.4))' : 'none',
                      }}
                    />
                  );
                })}
                <LabelList
                  dataKey="value"
                  content={<CustomLabel />}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Insight Callout */}
        <div style={{
          marginTop: '12px',
          padding: '10px 14px',
          background: 'linear-gradient(90deg, rgba(196, 244, 65, 0.1) 0%, transparent 100%)',
          borderLeft: '3px solid #c4f441',
          borderRadius: '0 6px 6px 0',
        }}>
          <div style={{ fontSize: '12px', color: '#e5e7eb', fontWeight: 500 }}>
            <span style={{ color: '#c4f441', fontWeight: 700 }}>Key Insight:</span>{' '}
            Google's lightweight "Flash Lite" model beats OpenAI's flagship GPT-5.2 in factual consistency.
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px',
          paddingTop: '10px',
          borderTop: '1px solid #1f1f1f',
        }}>
          <span style={{ fontSize: '10px', color: '#4b5563' }}>
            Source: Vectara Hallucination Leaderboard · Dec 2025
          </span>
          <span style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#6b7280',
            letterSpacing: '0.05em',
          }}>
            CHAI<span style={{ color: '#c4f441' }}>OVER</span>CODE
          </span>
        </div>
      </div>
    </div>
  );
}
