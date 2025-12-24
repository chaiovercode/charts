import { useState, useEffect } from 'react'

// Import all chart components from the charts folder
const chartModules = import.meta.glob('../charts/*.jsx', { eager: true })

// Build a list of available charts
const charts = Object.entries(chartModules).map(([path, module]) => {
  const name = path.replace('../charts/', '').replace('.jsx', '')
  return {
    name,
    component: module.default,
    // Charts can export caption metadata
    caption: module.caption || null,
  }
})

// Default caption template
const getDefaultCaption = (chartName) => `[Hook: Key insight from the data]

[1-2 sentences explaining what the data shows]

[Question or CTA to drive comments]

---
Source: [Add source]
.
.
.
#ai #tech #data #${chartName.split('-')[0]} #chaiovercode`

function LiveClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {time.toLocaleTimeString('en-US', { hour12: false })}
    </span>
  )
}

function CaptionPanel({ chartName, chartCaption }) {
  const [caption, setCaption] = useState('')
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setCaption(chartCaption || getDefaultCaption(chartName))
    setCopied(false)
  }, [chartName, chartCaption])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(caption)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const charCount = caption.length
  const hashtagCount = (caption.match(/#\w+/g) || []).length

  return (
    <div style={{
      marginTop: '24px',
      background: '#111111',
      borderRadius: '8px',
      border: '1px solid #1f1f1f',
      overflow: 'hidden',
    }}>
      {/* Header - clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '16px 20px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'inherit',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px' }}>&#x1F4CB;</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>
            Instagram Caption
          </span>
          <span style={{
            fontSize: '10px',
            color: '#0a0a0a',
            background: '#c4f441',
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: 600,
          }}>
            ALGO-OPTIMIZED
          </span>
        </div>
        <span style={{ color: '#6b7280', fontSize: '18px' }}>
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {/* Content */}
      {isOpen && (
        <div style={{ padding: '0 20px 20px' }}>
          {/* Tips */}
          <div style={{
            fontSize: '11px',
            color: '#6b7280',
            marginBottom: '12px',
            padding: '12px',
            background: '#0a0a0a',
            borderRadius: '6px',
            lineHeight: 1.6,
          }}>
            <strong style={{ color: '#c4f441' }}>2025 Instagram Tips:</strong>
            <br />
            • Hook in first line (shows in preview)
            <br />
            • Keywords {'>'} hashtags (algo reads sentences)
            <br />
            • 3-5 niche hashtags max
            <br />
            • End with question/CTA for comments
          </div>

          {/* Textarea */}
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '16px',
              background: '#0a0a0a',
              border: '1px solid #1f1f1f',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '13px',
              fontFamily: 'inherit',
              lineHeight: 1.6,
              resize: 'vertical',
              outline: 'none',
            }}
            placeholder="Write your caption..."
          />

          {/* Stats & Copy */}
          <div style={{
            marginTop: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#6b7280' }}>
              <span>{charCount} chars</span>
              <span style={{ color: hashtagCount > 5 ? '#ef4444' : hashtagCount >= 3 ? '#22c55e' : '#6b7280' }}>
                {hashtagCount} hashtags {hashtagCount > 5 ? '(too many!)' : hashtagCount >= 3 ? '(good)' : '(add more)'}
              </span>
            </div>
            <button
              onClick={handleCopy}
              style={{
                padding: '10px 20px',
                background: copied ? '#22c55e' : '#c4f441',
                color: '#0a0a0a',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {copied ? 'Copied!' : 'Copy Caption'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [activeChart, setActiveChart] = useState(charts[0]?.name || null)
  const [isGridView, setIsGridView] = useState(false)
  const activeChartData = charts.find(c => c.name === activeChart)
  const ActiveComponent = activeChartData?.component

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (charts.length <= 1) return
      const currentIndex = charts.findIndex(c => c.name === activeChart)

      if (e.key === 'ArrowRight' || e.key === 'j') {
        const next = (currentIndex + 1) % charts.length
        setActiveChart(charts[next].name)
      } else if (e.key === 'ArrowLeft' || e.key === 'k') {
        const prev = (currentIndex - 1 + charts.length) % charts.length
        setActiveChart(charts[prev].name)
      } else if (e.key === 'g') {
        setIsGridView(v => !v)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeChart])

  // Empty state
  if (charts.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          background: '#111111',
          border: '1px solid #1f1f1f',
          borderRadius: '8px',
          padding: '48px 56px',
          maxWidth: '480px',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #c4f441 0%, #a3d934 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            fontSize: '24px',
          }}>
            +
          </div>
          <h2 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 600 }}>
            No charts yet
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '24px', lineHeight: 1.6 }}>
            Drop your .jsx files into the charts folder to get started
          </p>
          <div style={{
            background: '#0a0a0a',
            padding: '16px 20px',
            borderRadius: '6px',
            fontSize: '13px',
            border: '1px solid #1f1f1f',
          }}>
            <div style={{ color: '#6b7280', marginBottom: '8px' }}>// example</div>
            <code style={{ color: '#c4f441' }}>charts/my-chart.jsx</code>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 0',
        marginBottom: '32px',
        borderBottom: '1px solid #1f1f1f',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#c4f441',
              boxShadow: '0 0 16px #c4f441, 0 0 32px rgba(196, 244, 65, 0.3)',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#3f3f46',
            }} />
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#3f3f46',
            }} />
          </div>
          <span style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '0.02em' }}>
            CHAI<span style={{ color: '#c4f441' }}>OVER</span>CODE
          </span>
          <span style={{
            fontSize: '10px',
            color: '#0a0a0a',
            background: '#c4f441',
            padding: '3px 8px',
            borderRadius: '4px',
            fontWeight: 600,
          }}>
            CHARTS
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            <LiveClock />
          </div>
          {charts.length > 1 && (
            <button
              onClick={() => setIsGridView(v => !v)}
              style={{
                padding: '8px 12px',
                background: isGridView ? '#c4f441' : 'transparent',
                color: isGridView ? '#0a0a0a' : '#6b7280',
                border: '1px solid #1f1f1f',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '11px',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '14px' }}>{isGridView ? '▤' : '◫'}</span>
              {isGridView ? 'grid' : 'single'}
            </button>
          )}
        </div>
      </header>

      {/* Stats Bar */}
      <div style={{
        display: 'flex',
        gap: '24px',
        marginBottom: '32px',
        padding: '20px 24px',
        background: '#111111',
        borderRadius: '8px',
        border: '1px solid #1f1f1f',
      }}>
        <div>
          <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Charts
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#c4f441' }}>
            {charts.length}
          </div>
        </div>
        <div style={{ width: '1px', background: '#1f1f1f' }} />
        <div>
          <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Active
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>
            {activeChart?.split('-').slice(0, 2).join('-') || '—'}
          </div>
        </div>
        <div style={{ width: '1px', background: '#1f1f1f' }} />
        <div>
          <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Status
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#22c55e' }}>
            ready
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#6b7280' }}>
          <span style={{ padding: '4px 8px', background: '#1f1f1f', borderRadius: '4px' }}>←→</span>
          <span>navigate</span>
          <span style={{ padding: '4px 8px', background: '#1f1f1f', borderRadius: '4px', marginLeft: '8px' }}>G</span>
          <span>toggle grid</span>
        </div>
      </div>

      {/* Chart Navigation */}
      {charts.length > 1 && !isGridView && (
        <nav style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}>
          {charts.map((chart, i) => {
            const isActive = activeChart === chart.name
            return (
              <button
                key={chart.name}
                onClick={() => setActiveChart(chart.name)}
                style={{
                  padding: '12px 20px',
                  background: isActive
                    ? 'linear-gradient(135deg, #c4f441 0%, #b8e83d 100%)'
                    : '#111111',
                  color: isActive ? '#0a0a0a' : '#9ca3af',
                  border: `1px solid ${isActive ? 'transparent' : '#1f1f1f'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: isActive ? '0 4px 24px rgba(196, 244, 65, 0.25)' : 'none',
                }}
              >
                <span style={{
                  fontSize: '10px',
                  opacity: isActive ? 0.7 : 0.4,
                  fontWeight: 600,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {chart.name}
              </button>
            )
          })}
        </nav>
      )}

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {isGridView ? (
          // Grid View
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '24px',
          }}>
            {charts.map((chart) => {
              const ChartComponent = chart.component
              return (
                <div
                  key={chart.name}
                  onClick={() => {
                    setActiveChart(chart.name)
                    setIsGridView(false)
                  }}
                  style={{
                    cursor: 'pointer',
                    padding: '20px',
                    background: '#111111',
                    borderRadius: '12px',
                    border: `1px solid ${activeChart === chart.name ? '#c4f441' : '#1f1f1f'}`,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    marginBottom: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                    <span>{chart.name}</span>
                    <span style={{ color: '#c4f441' }}>click to expand</span>
                  </div>
                  <div style={{
                    transform: 'scale(0.6)',
                    transformOrigin: 'top left',
                    pointerEvents: 'none',
                    height: '300px',
                    overflow: 'hidden',
                  }}>
                    <ChartComponent />
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          // Single View
          <>
            <div style={{
              fontSize: '11px',
              color: '#6b7280',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                color: '#c4f441',
                animation: 'blink 1s step-end infinite',
              }}>▶</span>
              <span>rendering</span>
              <span style={{ color: '#c4f441' }}>{activeChart}</span>
            </div>
            {ActiveComponent && <ActiveComponent />}

            {/* Universal Actions Bar */}
            <div style={{
              marginTop: '24px',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
            }}>
              <button
                onClick={async () => {
                  const element = document.getElementById('capture-target');
                  if (!element) {
                    alert('No chart element found with id="capture-target"');
                    return;
                  }
                  const html2canvas = (await import('html2canvas')).default;
                  await document.fonts.ready;
                  const canvas = await html2canvas(element, {
                    scale: 2,
                    backgroundColor: null, // Transparent to respect CSS or use detected
                  });
                  const link = document.createElement('a');
                  link.download = `${activeChart}.png`;
                  link.href = canvas.toDataURL('image/png');
                  link.click();
                }}
                style={{
                  padding: '12px 24px',
                  background: '#c4f441',
                  color: '#0a0a0a',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 700,
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(196, 244, 65, 0.2)',
                }}
              >
                <span>↓</span> Download {activeChart}.png
              </button>
            </div>

            {/* Caption Panel */}
            <CaptionPanel
              chartName={activeChart}
              chartCaption={activeChartData?.caption}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        marginTop: '64px',
        paddingTop: '24px',
        borderTop: '1px solid #1f1f1f',
        fontSize: '11px',
        color: '#6b7280',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>charts/ directory</span>
          <span style={{ color: '#3f3f46' }}>•</span>
          <span>recharts + html2canvas</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>built with vite</span>
          <span style={{ color: '#3f3f46' }}>•</span>
          <span style={{ color: '#9ca3af' }}>@vivek.tiwari</span>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
