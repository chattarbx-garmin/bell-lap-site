"use client";

import { useState, type FormEvent } from "react";

const WATCHES = ["Apple Watch Ultra", "Apple Watch Series 10 or later", "Apple Watch Series 4 to 9", "Apple Watch SE", "Not sure"];
const TOPICS = [
  { value: "problem", label: "Something is wrong" },
  { value: "idea", label: "An idea or a reading to add" },
  { value: "question", label: "A question" },
];

type State = "idle" | "sending" | "sent" | "failed";

/** Sends a report to Netlify Forms, which stores it and emails it on. */
export function ReportForm() {
  const [state, setState] = useState<State>("idle");

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      setState(response.ok ? "sent" : "failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className="report-done" role="status">
        <h2>Thanks, that&apos;s in.</h2>
        <p>Every report is read. If you left an email address, the reply goes there.</p>
      </div>
    );
  }

  return (
    <form className="report" name="report" onSubmit={send}>
      <input type="hidden" name="form-name" value="report" />
      <p className="trap"><label>Leave this empty <input name="company" tabIndex={-1} autoComplete="off" /></label></p>

      <fieldset>
        <legend>What is it about?</legend>
        <div className="choices">
          {TOPICS.map((topic, i) => (
            <label key={topic.value} className="choice">
              <input type="radio" name="topic" value={topic.value} defaultChecked={i === 0} required />
              <span>{topic.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="field">
        <span>Your watch</span>
        <select name="watch" defaultValue="">
          <option value="" disabled>Choose your watch</option>
          {WATCHES.map(watch => <option key={watch}>{watch}</option>)}
        </select>
      </label>

      <label className="field">
        <span>What happened, or what would you like?</span>
        <textarea name="message" rows={6} required minLength={10} maxLength={4000}
                  placeholder="For a problem: what you did, what you expected, and what you saw instead." />
      </label>

      <div className="pair">
        <label className="field">
          <span>Name <em>optional</em></span>
          <input name="name" autoComplete="name" maxLength={100} />
        </label>
        <label className="field">
          <span>Email <em>optional, for a reply</em></span>
          <input name="email" type="email" autoComplete="email" maxLength={200} />
        </label>
      </div>

      <button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send report"}</button>
      {state === "failed" && <p className="report-error" role="alert">That didn&apos;t go through. Check your connection and send it again.</p>}
    </form>
  );
}
