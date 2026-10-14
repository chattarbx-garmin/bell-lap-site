import type { Metadata } from "next";
import { Footer, Header } from "../chrome";

export const metadata: Metadata = { title: "Bell Lap support" };

export default function Page() {
  return (
    <>
      <Header />
      <main className="doc">
<h1>Support</h1>
  <p>To set Bell Lap up:</p>
  <ul>
    <li>Tap the Bell Lap screen to choose what each stat and edge shows. To add a complication, touch and hold your watch face, tap Edit, and pick a Bell Lap reading for a slot.</li>
    <li>Bell Lap needs watchOS 10 or later, and permission to read Health. If a reading shows “--”, check Settings, Health, Data Access &amp; Devices, Bell Lap.</li>
  </ul>
  <p>Something wrong, or a reading you&apos;d like added? <a href="/report/">Tell us here</a>. Say which watch you have and what you see.</p>

  
      </main>
      <Footer />
    </>
  );
}
