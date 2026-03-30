import { useState, useEffect, useCallback, useRef } from "react";

interface ManometerGaugeProps {
  /** Current pressure in mmHg (0–300) */
  pressure: number;
  /** Target systolic for highlighting */
  targetSystolic?: number;
  /** Target diastolic for highlighting */
  targetDiastolic?: number;
  /** Whether simulation is actively deflating */
  isDeflating?: boolean;
  /** Size in pixels */
  size?: number;
  /** Show target zone markers */
  showTargets?: boolean;
}

const MIN_PRESSURE = 0;
const MAX_PRESSURE = 300;
const TICK_INTERVAL_MAJOR = 20;
const TICK_INTERVAL_MINOR = 2;

/**
 * Converts a pressure value (0–300 mmHg) to an angle on the gauge.
 * The gauge sweeps 270° starting from 225° (bottom-left) clockwise to -45° (bottom-right).
 */
const pressureToAngle = (pressure: number): number => {
  const clamped = Math.max(MIN_PRESSURE, Math.min(MAX_PRESSURE, pressure));
  const fraction = clamped / MAX_PRESSURE;
  // Sweep from 135° to -135° (270° arc), going clockwise
  return 135 - fraction * 270;
};

const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy - r * Math.sin(rad),
  };
};

const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const sweep = startAngle - endAngle;
  const largeArc = Math.abs(sweep) > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
};

const ManometerGauge = ({
  pressure,
  targetSystolic,
  targetDiastolic,
  isDeflating = false,
  size = 360,
  showTargets = false,
}: ManometerGaugeProps) => {
  const viewBox = "0 0 400 400";
  const cx = 200;
  const cy = 200;
  const outerRadius = 170;
  const tickRadiusOuter = 155;
  const tickRadiusMajor = 130;
  const tickRadiusMinor = 140;
  const labelRadius = 115;
  const needleLength = 125;

  const needleAngle = pressureToAngle(pressure);

  // Generate tick marks
  const ticks = [];
  for (let p = MIN_PRESSURE; p <= MAX_PRESSURE; p += TICK_INTERVAL_MINOR) {
    const isMajor = p % TICK_INTERVAL_MAJOR === 0;
    const isMid = p % 10 === 0 && !isMajor;
    const angle = pressureToAngle(p);
    const outer = polarToCartesian(cx, cy, tickRadiusOuter, angle);
    const inner = polarToCartesian(
      cx,
      cy,
      isMajor ? tickRadiusMajor : isMid ? tickRadiusMinor - 3 : tickRadiusMinor,
      angle
    );

    ticks.push(
      <line
        key={`tick-${p}`}
        x1={outer.x}
        y1={outer.y}
        x2={inner.x}
        y2={inner.y}
        stroke={
          isMajor
            ? "hsl(210 40% 85%)"
            : isMid
            ? "hsl(215 20% 45%)"
            : "hsl(225 15% 28%)"
        }
        strokeWidth={isMajor ? 2.5 : isMid ? 1.5 : 0.8}
        strokeLinecap="round"
      />
    );

    // Labels for major ticks
    if (isMajor) {
      const labelPos = polarToCartesian(cx, cy, labelRadius, angle);
      ticks.push(
        <text
          key={`label-${p}`}
          x={labelPos.x}
          y={labelPos.y}
          textAnchor="middle"
          dominantBaseline="central"
          fill="hsl(210 40% 80%)"
          fontSize={p % 40 === 0 ? "13" : "10"}
          fontFamily="'JetBrains Mono', monospace"
          fontWeight={p % 40 === 0 ? "600" : "400"}
        >
          {p}
        </text>
      );
    }
  }

  // Target zone arcs
  const targetArcs = [];
  if (showTargets && targetSystolic !== undefined && targetDiastolic !== undefined) {
    const sysAngle = pressureToAngle(targetSystolic);
    const diaAngle = pressureToAngle(targetDiastolic);

    // Systolic marker
    const sysOuter = polarToCartesian(cx, cy, tickRadiusOuter + 8, sysAngle);
    const sysInner = polarToCartesian(cx, cy, tickRadiusMajor - 5, sysAngle);
    targetArcs.push(
      <line
        key="sys-marker"
        x1={sysOuter.x}
        y1={sysOuter.y}
        x2={sysInner.x}
        y2={sysInner.y}
        stroke="hsl(350 90% 65%)"
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.8}
      />
    );

    // Diastolic marker
    const diaOuter = polarToCartesian(cx, cy, tickRadiusOuter + 8, diaAngle);
    const diaInner = polarToCartesian(cx, cy, tickRadiusMajor - 5, diaAngle);
    targetArcs.push(
      <line
        key="dia-marker"
        x1={diaOuter.x}
        y1={diaOuter.y}
        x2={diaInner.x}
        y2={diaInner.y}
        stroke="hsl(185 85% 50%)"
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.8}
      />
    );

    // Zone arc between systolic and diastolic
    targetArcs.push(
      <path
        key="zone-arc"
        d={describeArc(cx, cy, tickRadiusOuter + 5, sysAngle, diaAngle)}
        fill="none"
        stroke="hsl(160 85% 45%)"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.4}
      />
    );
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox={viewBox}
        width={size}
        height={size}
        className="drop-shadow-2xl"
      >
        <defs>
          {/* Gauge face gradient */}
          <radialGradient id="gaugeFace" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="hsl(225 20% 16%)" />
            <stop offset="80%" stopColor="hsl(225 25% 8%)" />
            <stop offset="100%" stopColor="hsl(225 25% 5%)" />
          </radialGradient>

          {/* Bezel gradient */}
          <linearGradient id="bezel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(225 15% 25%)" />
            <stop offset="50%" stopColor="hsl(225 15% 15%)" />
            <stop offset="100%" stopColor="hsl(225 15% 20%)" />
          </linearGradient>

          {/* Needle gradient */}
          <linearGradient id="needleGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(350 90% 55%)" />
            <stop offset="100%" stopColor="hsl(350 90% 70%)" />
          </linearGradient>

          {/* Glow filter for needle */}
          <filter id="needleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Outer glow */}
          <filter id="outerGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer bezel ring */}
        <circle
          cx={cx}
          cy={cy}
          r={outerRadius + 14}
          fill="url(#bezel)"
          stroke="hsl(225 15% 30%)"
          strokeWidth={1}
        />
        <circle
          cx={cx}
          cy={cy}
          r={outerRadius + 10}
          fill="none"
          stroke="hsl(225 15% 22%)"
          strokeWidth={0.5}
        />

        {/* Gauge face */}
        <circle cx={cx} cy={cy} r={outerRadius + 8} fill="url(#gaugeFace)" />

        {/* Subtle arc track */}
        <path
          d={describeArc(cx, cy, tickRadiusOuter, 135, -135)}
          fill="none"
          stroke="hsl(225 15% 18%)"
          strokeWidth={8}
          strokeLinecap="round"
        />

        {/* Color zones on the arc */}
        {/* Normal: 0–120 */}
        <path
          d={describeArc(cx, cy, tickRadiusOuter, pressureToAngle(0), pressureToAngle(120))}
          fill="none"
          stroke="hsl(160 85% 45%)"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.2}
        />
        {/* Elevated: 120–140 */}
        <path
          d={describeArc(cx, cy, tickRadiusOuter, pressureToAngle(120), pressureToAngle(140))}
          fill="none"
          stroke="hsl(40 95% 55%)"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.25}
        />
        {/* High: 140–300 */}
        <path
          d={describeArc(cx, cy, tickRadiusOuter, pressureToAngle(140), pressureToAngle(300))}
          fill="none"
          stroke="hsl(350 90% 65%)"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.2}
        />

        {/* Target zone markers */}
        {targetArcs}

        {/* Tick marks & labels */}
        {ticks}

        {/* mmHg label */}
        <text
          x={cx}
          y={cy + 50}
          textAnchor="middle"
          fill="hsl(215 20% 45%)"
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="2"
        >
          mmHg
        </text>

        {/* Needle */}
        <g
          transform={`rotate(${-needleAngle}, ${cx}, ${cy})`}
          filter="url(#needleGlow)"
          style={{
            transition: isDeflating ? "transform 0.15s linear" : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Needle body - tapered */}
          <polygon
            points={`
              ${cx + needleLength},${cy}
              ${cx - 15},${cy - 4}
              ${cx - 15},${cy + 4}
            `}
            fill="url(#needleGrad)"
          />
          {/* Counterweight */}
          <circle cx={cx - 12} cy={cy} r={5} fill="hsl(350 70% 40%)" />
        </g>

        {/* Center hub */}
        <circle cx={cx} cy={cy} r={12} fill="hsl(225 20% 20%)" stroke="hsl(225 15% 30%)" strokeWidth={2} />
        <circle cx={cx} cy={cy} r={6} fill="hsl(225 15% 35%)" />
        <circle cx={cx} cy={cy} r={2} fill="hsl(350 90% 65%)" />

        {/* Digital readout */}
        <rect
          x={cx - 40}
          y={cy + 65}
          width={80}
          height={32}
          rx={6}
          fill="hsl(225 25% 5%)"
          stroke="hsl(225 15% 22%)"
          strokeWidth={1}
        />
        <text
          x={cx}
          y={cy + 85}
          textAnchor="middle"
          fill="hsl(185 85% 50%)"
          fontSize="18"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="700"
        >
          {Math.round(pressure)}
        </text>
      </svg>

      {/* Deflating indicator */}
      {isDeflating && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <span className="text-xs font-mono text-warning animate-pulse">▼ Deflating</span>
        </div>
      )}
    </div>
  );
};

export default ManometerGauge;
