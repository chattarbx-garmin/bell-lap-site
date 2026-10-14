import type { Metadata } from "next";
import { Footer, Header } from "../chrome";
import { ReportForm } from "./form";

export const metadata: Metadata = { title: "Report a problem or an idea for Bell Lap" };

export default function Page() {
  return (
    <>
      <Header />
      <main className="doc">
        <h1>Tell us</h1>
        <p className="lede">Something not right, a reading you&apos;d like added, or a question. It comes straight to the person who makes Bell Lap.</p>
        <ReportForm />
      </main>
      <Footer />
    </>
  );
}
