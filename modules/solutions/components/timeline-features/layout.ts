// Zigzag path for the "Le détail" section: draws on scroll (pinned) while
// a close tracking camera follows the drawing tip point by point, starting
// zoomed in on the path's own starting point.

export type Stop = { x: number; y: number; frac: number };
export type Segment =
  | {
      kind: "line";
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      start: number;
      len: number;
    }
  | {
      kind: "arc";
      cx: number;
      cy: number;
      r: number;
      dir: 1 | -1;
      start: number;
      len: number;
    };

const PER_ROW = 2;
export const W = 1300;
const ROW_H = 380;
// the turn's radius spans the *entire* row gap, so the arc's own start/end
// tangents (horizontal, at its pole points) blend straight into the row
// lines with zero kink — no straight "stub" segments, no sharp corners
const TURN_R = ROW_H / 2;
export const STROKE = 14;
// rows must stay inset from the viewBox edges by at least TURN_R (+ half
// the stroke), otherwise the U-turn arcs bulge past 0/W and get clipped
const LEFT_X = TURN_R + STROKE / 2 + 10;
const RIGHT_X = W - LEFT_X;
// plain top inset, symmetric with PAD_BOTTOM — row 0 is a normal row like
// every other, no special lead-in bridging it to anything above
const PAD_TOP = 40;
const ROW0_Y = PAD_TOP;
const PAD_BOTTOM = 40;
export const DRAW_START = 0.005;
export const DRAW_END = 0.92;
export const CAMERA_ZOOM = 1.9;
// where the tracked point sits, as a fraction of the viewport height from
// the top — constant and dead center for every point on the path, row 0
// included. No time-varying anchor: any change of this value over the
// scroll, wherever it happens, biases whichever points are in that window
// off-center and/or adds a diagonal to what should be horizontal panning.
export const CAMERA_Y_ANCHOR = 0.5;
// fraction of the viewport height (from the top) where point 0 sits, still
// well below center, at the moment filling begins — bigger than 0.5 means
// the trigger fires earlier in the scroll, while point 0 is lower on screen
export const FILL_START_VIEWPORT_Y = 0.7;

export function buildLayout(featureCount: number) {
  const rows = Math.ceil(featureCount / PER_ROW);
  const lineLen = RIGHT_X - LEFT_X;
  const arcLen = Math.PI * TURN_R;
  const H = ROW0_Y + Math.max(rows - 1, 0) * ROW_H + PAD_BOTTOM;

  let d = "";
  let cumulative = 0;
  let featureIndex = 0;
  const stops: Stop[] = [];
  const segments: Segment[] = [];

  for (let i = 0; i < rows; i++) {
    const y = ROW0_Y + i * ROW_H;
    const goingRight = i % 2 === 0;
    const x1 = goingRight ? LEFT_X : RIGHT_X;
    const x2 = goingRight ? RIGHT_X : LEFT_X;
    const rowLineLen = lineLen;

    d += i === 0 ? `M ${x1} ${y} L ${x2} ${y} ` : `L ${x2} ${y} `;
    segments.push({
      kind: "line",
      x1,
      y1: y,
      x2,
      y2: y,
      start: cumulative,
      len: rowLineLen,
    });

    const itemsThisRow = Math.min(PER_ROW, featureCount - featureIndex);
    for (let k = 0; k < itemsThisRow; k++) {
      const t = (k + 0.5) / itemsThisRow;
      const x = goingRight ? x1 + t * rowLineLen : x1 - t * rowLineLen;
      // frac holds the raw cumulative length for now; normalized below once totalLen is known
      stops.push({ x, y, frac: cumulative + t * rowLineLen });
      featureIndex++;
    }

    cumulative += rowLineLen;

    if (i < rows - 1) {
      const yNext = y + ROW_H;
      const sweep = goingRight ? 1 : 0;
      d += `A ${TURN_R} ${TURN_R} 0 0 ${sweep} ${x2} ${yNext} `;
      segments.push({
        kind: "arc",
        cx: x2,
        cy: y + TURN_R,
        r: TURN_R,
        dir: goingRight ? 1 : -1,
        start: cumulative,
        len: arcLen,
      });
      cumulative += arcLen;
    }
  }

  const totalLen = cumulative;
  for (const stop of stops) stop.frac = stop.frac / totalLen;

  function pointAtLength(len: number) {
    const target = Math.min(Math.max(len, 0), totalLen);
    const seg =
      segments.find((s) => target >= s.start && target <= s.start + s.len) ??
      segments[segments.length - 1];
    const f = seg.len === 0 ? 0 : (target - seg.start) / seg.len;

    if (seg.kind === "line") {
      return {
        x: seg.x1 + (seg.x2 - seg.x1) * f,
        y: seg.y1 + (seg.y2 - seg.y1) * f,
      };
    }
    const theta = -Math.PI / 2 + seg.dir * f * Math.PI;
    return {
      x: seg.cx + seg.r * Math.cos(theta),
      y: seg.cy + seg.r * Math.sin(theta),
    };
  }

  return {
    d,
    H,
    rows,
    stops,
    pointAt: (t: number) => pointAtLength(t * totalLen),
  };
}
