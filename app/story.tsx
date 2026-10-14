"use client";

import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const WEEK = [8.2, 0, 10.5, 6.1, 0, 7.6, 0];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

/** Rises and fades in once, as it reaches the reader. */
export function Reveal({ children, delay = 0, className, as = "div" }: {
  children: ReactNode; delay?: number; className?: string; as?: "div" | "p" | "h1" | "h2";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, transform: reduce ? "none" : "translateY(28px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reduce ? 0.4 : 0.9, ease: EASE_OUT, delay }}
    >
      {children}
    </Tag>
  );
}

/** The strip of running track down the left edge; its runner follows the scroll. */
export function Lane() {
  const { scrollYProgress } = useScroll();
  const [size, setSize] = useState({ width: 0, height: 0, narrow: false });
  useEffect(() => {
    const measure = () => setSize({ width: innerWidth, height: innerHeight, narrow: innerWidth <= 860 });
    measure();
    addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, []);
  const transform = useTransform(scrollYProgress, p =>
    size.narrow ? `translateX(${p * (size.width - 18)}px)` : `translateY(${p * (size.height - 12) + 6}px)`);
  return (
    <div className="lane" aria-hidden="true">
      <motion.div className="lane-runner" style={{ transform }} />
    </div>
  );
}

/** A number that counts up from zero the first time it is seen. */
export function CountUp({ to, format = "decimal" }: { to: number; format?: "decimal" | "sleep" | "whole" | "percent" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const show = (v: number) => format === "sleep"
    ? `${Math.floor(v)}h ${String(Math.round((v % 1) * 60)).padStart(2, "0")}`
    : format === "whole" ? String(Math.round(v)) : format === "percent" ? `${Math.round(v)}%` : v.toFixed(1);
  const [text, setText] = useState(show(0));
  useEffect(() => {
    if (!seen) return;
    if (reduce) { setText(show(to)); return; }
    const controls = animate(0, to, { duration: 1.4, ease: EASE_OUT, onUpdate: v => setText(show(v)) });
    return () => controls.stop();
    // show is stable for a given format
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, to, reduce]);
  return <span ref={ref} className="count">{text}</span>;
}

/** The week so far: a bar per day up to `upto`, the days after it still to come. */
export function Week({ upto, total }: { upto: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const longest = Math.max(...WEEK);
  return (
    <Reveal className="week">
      <p className="km"><CountUp to={total} /><small>of 40 km</small></p>
      <div className="bars" ref={ref}>
        {WEEK.map((km, day) => {
          const state = day > upto ? "future" : day === upto ? "today" : km ? "ran" : "rest";
          const height = state === "ran" || state === "today" ? `${Math.max((km / longest) * 100, 4)}%` : "6px";
          return (
            <div className={`bar ${state}`} key={day}>
              <motion.i
                style={{ height, transformOrigin: "bottom" }}
                initial={{ transform: reduce ? "scaleY(1)" : "scaleY(0.03)" }}
                animate={seen ? { transform: "scaleY(1)" } : undefined}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: day * 0.07 }}
              />
              <b>{DAYS[day]}</b>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

/** Sleep and the weekly goal as two rings that fill when the night comes round. */
export function NightRings() {
  return (
    <svg className="rings" viewBox="0 0 200 200" aria-hidden="true">
      {[{ r: 88, to: 0.96, cls: "sleep" }, { r: 72, to: 0.81, cls: "battery" }].map(({ r, to, cls }, i) => (
        <g key={cls}>
          <circle className="ring-track" cx="100" cy="100" r={r} />
          <motion.circle
            className={`ring-fill ${cls}`} cx="100" cy="100" r={r}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: to }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.2 + i * 0.25 }}
          />
        </g>
      ))}
    </svg>
  );
}

const READINGS = ["Sleep", "Weekly goal", "VO2 max", "Resting heart rate", "HRV", "Heart rate", "Cardio recovery",
  "Runs this week", "Longest run", "Steps", "Active energy", "Exercise minutes", "Respiratory rate",
  "Blood oxygen", "Time in daylight"];

const LOOKS = [
  { src: "/assets/apple-week.png", alt: "Bell Lap with short edge gauges that stop below the clock" },
  { src: "/assets/apple-full-edge.png", alt: "Bell Lap with full edge gauges running round the whole screen" },
  { src: "/assets/apple-settings.png", alt: "Bell Lap settings on the watch: weekly goal, edges and stats" },
];

/** The screen trading its looks while the readings it can show light up in turn. */
export function Yours() {
  const [tick, setTick] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    const id = setInterval(() => { if (!document.hidden) setTick(t => t + 1); }, reduce ? 4000 : 2400);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <section className="yours">
      <div className="day-copy">
        <Reveal as="h2"><span className="when">Saturday</span>Make it yours.</Reveal>
        <Reveal as="p" delay={0.07}>Tap the screen to choose what each of the three stats and both edges show, from 15 readings. Keep the edges short, or run them all the way round.</Reveal>
        <Reveal as="p" delay={0.14} className="readings">
          {READINGS.map((reading, i) => (
            <span key={reading} className={i % 5 === tick % 5 ? "on" : undefined}>{reading} </span>
          ))}
        </Reveal>
      </div>
      <Reveal className="themes looks">
        {LOOKS.map(({ src, alt }, i) => (
          <figure key={src} className={`watch-apple ${i === tick % LOOKS.length ? "on" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} />
          </figure>
        ))}
      </Reveal>
    </section>
  );
}

/** The lap closes, then the bell rings once. */
export function Bell() {
  const ref = useRef<SVGSVGElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  return (
    <svg ref={ref} className="bell" viewBox="0 0 512 512" aria-hidden="true">
      <motion.circle
        className="lap" cx="256" cy="256" r="196"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={seen ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.8, ease: EASE_OUT }}
      />
      <g className={seen && !reduce ? "bell-body rung" : "bell-body"}>
        <path d="M256 138c-52 0-84 40-84 96v52l-30 44h228l-30-44v-52c0-56-32-96-84-96z" />
        <circle cx="256" cy="366" r="24" />
      </g>
    </svg>
  );
}
