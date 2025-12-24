import { useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';

// Instagram caption
export const caption = `The AI seed round arms race is insane.

2015: OpenAI raised $130M - seemed huge at the time
2021: Anthropic raised $124M
2024: SSI (Ilya Sutskever) raised $1B
2025: Thinking Machines (Mira Murati) raised $2B

That's 15x growth in 10 years.

And Thinking Machines hasn't even shipped a product yet.

Welcome to the AI gold rush.

---
Source: Crunchbase, TechCrunch | Dec 2025
.
.
.
#ai #startup #venturecapital #technews #funding #chaiovercode`;

// AI Seed Rounds Data - chronologically sorted
const data = [
  { name: 'OpenAI', year: 2015, value: 130, display: '$130M' },
  { name: 'Anthropic', year: 2021, value: 124, display: '$124M' },
  { name: 'Mistral', year: 2023, value: 113, display: '$113M' },
  { name: 'SSI', year: 2024, value: 1000, display: '$1B', note: 'Ilya Sutskever' },
  { name: 'Upscale AI', year: 2025, value: 100, display: '$100M' },
  { name: 'Periodic Labs', year: 2025, value: 300, display: '$300M' },
  { name: 'Unconventional', year: 2025, value: 475, display: '$475M', note: 'Naveen Rao' },
  { name: 'Thinking Machines', year: 2025, value: 2000, display: '$2B', note: 'Mira Murati' },
];

const FORMAT_PRESETS = {
  square: { width: 540, height: 540 },
  portrait: { width: 540, height: 675 },
};

export default function AISeedRoundsChart() {
  const chartRef = useRef(null);
  const format = 'portrait';
  const preset = FORMAT_PRESETS[format];

  const chartHeight = 380;

  const handleExport = async () => {
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(chartRef.current, {
      scale: 2,
      backgroundColor: '#0a0a0a',
    });
    const link = document.createElement('a');
    link.download = `ai-seed-rounds-${format}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Custom tick to show year + company
  const CustomTick = ({ x, y, payload }) => {
    const item = data[payload.index];
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={4}
          textAnchor="end"
          fill="#ffffff"
          fontSize={11}
          fontWeight={500}
        >
          {item.name}
        </text>
        <text
          x={0}
          y={14}
          textAnchor="end"
          fill="#6b7280"
          fontSize={9}
        >
          {item.year}{item.note ? ` · ${item.note}` : ''}
        </text>
      </g>
    );
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: '#111', padding: '20px' }}>
      {/* Chart Container */}
      <div
        id="capture-target"
        style={{
          width: preset.width,
          height: preset.height,
          background: '#000000',
          borderLeft: '4px solid #c4f441',
          boxSizing: 'border-box',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Kicker */}
        <p style={{
          fontSize: '12px',
          fontWeight: 700,
          color: '#c4f441',
          margin: '0 0 8px 0',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          The AI Funding Arms Race
        </p>

        {/* Headline */}
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#ffffff',
          margin: 0,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
        }}>
          AI Seed Rounds: From $130M<br />
          to <span style={{ color: '#c4f441' }}>$2 Billion</span> in 10 Years
        </h2>

        {/* Subtitle */}
        <p style={{
          fontSize: '12px',
          color: '#6b7280',
          margin: '8px 0 0 0',
        }}>
          First funding rounds of major AI labs (USD)
        </p>

        {/* Chart */}
        <div style={{ flex: 1, marginTop: '16px' }}>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ left: 10, right: 50, top: 10, bottom: 10 }}
              barCategoryGap="18%"
            >
              <XAxis type="number" hide domain={[0, 2200]} />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                width={115}
                tick={<CustomTick />}
              />
              <Bar
                dataKey="value"
                radius={[0, 4, 4, 0]}
                barSize={24}
              >
                {data.map((entry, index) => {
                  // Simplified color scheme to reduce visual noise while keeping impact
                  // Focus on the narrative arc: The Start (OpenAI) -> The Escalation (SSI) -> The Explosion (Thinking Machines)
                  const keyPlayers = {
                    'Thinking Machines': '#c4f441', // Hero: Lime
                    'SSI': '#ffffff',               // Previous Record: White for high contrast
                    'OpenAI': '#10a37f',            // The Origin: OpenAI Teal
                  };

                  // Others get a subtle varying shade of grey/zinc to maintain separation without rainbow noise
                  const fill = keyPlayers[entry.name] || '#3f3f46';

                  return <Cell key={index} fill={fill} />;
                })}
                <LabelList
                  dataKey="display"
                  position="right"
                  style={{
                    fill: '#ffffff',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
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
            Thinking Machines raised $2B with no product — just Mira Murati's reputation from building ChatGPT at OpenAI.
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
          <span style={{ fontSize: '9px', color: '#6b7280' }}>
            Source: Crunchbase, TechCrunch | Dec 2025
          </span>
          <span style={{
            fontSize: '11px',
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
