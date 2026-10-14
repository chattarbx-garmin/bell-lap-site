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
    <li><strong>Garmin:</strong> on the watch, hold the middle left button, open Watch Face, choose Bell Lap and then Customize. On older watches, change the settings in the Connect IQ app on your phone.</li>
    <li><strong>Apple Watch:</strong> tap the Bell Lap screen to choose what each stat and edge shows. To add a complication, touch and hold your watch face, tap Edit, and pick a Bell Lap reading for a slot.</li>
  </ul>
  <p>Something wrong, or a reading you&apos;d like added? <a href="https://github.com/chattarbx-garmin/bell-lap-site/issues/new">Open an issue</a> and describe your watch model and what you see.</p>

  
      </main>
      <Footer />
    </>
  );
}
