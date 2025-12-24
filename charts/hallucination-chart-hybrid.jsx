import { useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList, ReferenceLine } from 'recharts';

// Instagram caption (algo-optimized)
export const caption = `Google's Gemini just became the most honest AI model.

According to Vectara's Hallucination Leaderboard, Gemini 2.0 Flash hallucinates only 0.7% of the time - that's 8x less than Claude.

OpenAI dominates 4 of the top 5 spots, but Google takes the crown.

The AI honesty race is heating up. Which model do you trust most?

---
Source: Vectara Hallucination Leaderboard, Dec 2025
.
.
.
#ai #llm #gemini #openai #claude #artificialintelligence #chaiovercode`;

// Data from Vectara Hallucination Leaderboard (Dec 2025)
// Source: github.com/vectara/hallucination-leaderboard
const data = [
  { name: 'Gemini 2.0 Flash', value: 0.7, company: 'google', rank: 1 },
  { name: 'o3-mini (high)', value: 0.8, company: 'openai', rank: 2 },
  { name: 'GPT-4.5 Preview', value: 1.2, company: 'openai', rank: 3 },
  { name: 'GPT-5 (high)', value: 1.4, company: 'openai', rank: 4 },
  { name: 'GPT-4o', value: 1.5, company: 'openai', rank: 5 },
  { name: 'Grok-3 Beta', value: 2.1, company: 'xai', rank: 6 },
  { name: 'DeepSeek V3', value: 3.9, company: 'deepseek', rank: 7 },
  { name: 'Llama 3.3 70B', value: 4.0, company: 'meta', rank: 8 },
  { name: 'Claude 3.7 Sonnet', value: 4.4, company: 'anthropic', rank: 9 },
  { name: 'Claude Sonnet 4.5', value: 5.5, company: 'anthropic', rank: 10 },
];

const avgRate = (data.reduce((a, b) => a + b.value, 0) / data.length).toFixed(1);
const worstRate = Math.max(...data.map(d => d.value));
const bestRate = Math.min(...data.map(d => d.value));

const FORMAT_PRESETS = {
  portrait: { width: 540, height: 675 },
};

// Simplified narrative colors
// Hero (Gemini): Lime
// Comparison/Adversary (Claude): White
// Others: Neutral Grey
const NARRATIVE_COLORS = {
  'Gemini 2.0 Flash': '#c4f441',
  'Claude Sonnet 4.5': '#ffffff',
};

// Custom label component
const CustomLabel = (props) => {
  const { x, y, width, value, index } = props;
  const isWinner = index === 0;
  const isTop3 = index < 3;

  return (
    <g>
      <text
        x={x + width + 8}
        y={y + 14}
        fill={isWinner ? '#c4f441' : '#ffffff'}
        fontSize={isWinner ? 14 : 13}
        fontWeight={isTop3 ? 700 : 500}
      >
        {value}%
      </text>
    </g>
  );
};

export default function HallucinationChart() {
  const chartRef = useRef(null);
  const format = 'portrait';
  const preset = FORMAT_PRESETS[format];

  const handleExport = async () => {
    const html2canvas = (await import('html2canvas')).default;
    await document.fonts.ready;
    const canvas = await html2canvas(chartRef.current, {
      scale: 2,
      backgroundColor: '#0a0a0a',
    });
    const link = document.createElement('a');
    link.download = `llm-hallucination-rates-${format}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
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
          padding: format === 'square' ? '28px 24px' : '32px 28px',
          boxSizing: 'border-box',
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
          Hallucination Leaderboard 2025
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: format === 'square' ? '28px' : '30px',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.1,
          margin: '0 0 8px 0',
          letterSpacing: '-0.02em',
        }}>
          Google's AI Lies <span style={{ color: '#c4f441' }}>8x Less</span><br />
          Than Claude
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

        {/* Key Stats Row */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginTop: '14px',
          marginBottom: '12px',
        }}>
          {[
            { label: 'Best', value: `${bestRate}%`, color: '#22c55e', subtext: 'Gemini' },
            { label: 'Average', value: `${avgRate}%`, color: '#eab308', subtext: '10 models' },
            { label: 'Worst', value: `${worstRate}%`, color: '#ef4444', subtext: 'Claude' },
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
        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ left: 0, right: 55, top: 4, bottom: 4 }}
              barCategoryGap="15%"
            >
              <XAxis type="number" hide domain={[0, 6]} />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={({ x, y, payload, index }) => {
                  const isWinner = index === 0;
                  const isTop3 = index < 3;
                  return (
                    <g>
                      <text
                        x={x - 4}
                        y={y}
                        dy={4}
                        textAnchor="end"
                        fill={isWinner ? '#c4f441' : isTop3 ? '#ffffff' : '#9ca3af'}
                        fontSize={11}
                        fontWeight={isTop3 ? 600 : 400}
                      >
                        {payload.value}
                      </text>
                    </g>
                  );
                }}
                width={110}
              />
              {/* Average line */}
              <ReferenceLine
                x={parseFloat(avgRate)}
                stroke="#eab308"
                strokeDasharray="4 4"
                strokeWidth={1}
              />
              <Bar
                dataKey="value"
                radius={[0, 4, 4, 0]}
                barSize={format === 'square' ? 20 : 24}
              >
                {data.map((entry, index) => {
                  const isWinner = index === 0;
                  // Narrative colors: Winner (Lime), Comparison (White), Others (Grey)
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
            OpenAI has 4 models in top 5, but Google's Gemini takes the crown
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
