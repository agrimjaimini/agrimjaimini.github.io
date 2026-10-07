import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'Agrim Jaimini';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const COLS = 60;
const ROWS = 14;

// A frozen, Ising-like pattern: smooth interfering waves thresholded into domains
function dot(c: number, r: number) {
    const v = Math.sin(c * 0.21 + r * 0.05) + Math.sin(r * 0.42 - c * 0.08) + Math.sin((c + r) * 0.11 + 1.3);
    return v > 0.35;
}

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#0d0d0d',
                    color: '#ededed',
                    padding: '72px 80px',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ fontSize: 56, letterSpacing: '-0.03em' }}>Agrim Jaimini</div>
                    <div style={{ fontSize: 30, color: '#8a8a8a' }}>ML systems and the infrastructure behind them</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {Array.from({ length: ROWS }, (_, r) => (
                        <div key={r} style={{ display: 'flex', gap: 13 }}>
                            {Array.from({ length: COLS }, (_, c) => (
                                <div
                                    key={c}
                                    style={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: 4,
                                        background: dot(c, r) ? '#ededed' : '#2a2a2a',
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#5c5c5c' }}>
                    <span>agrimjaimini.github.io</span>
                    <span>Cornell · CS &amp; Math</span>
                </div>
            </div>
        ),
        size
    );
}
