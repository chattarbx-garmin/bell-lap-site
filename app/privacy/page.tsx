import type { Metadata } from "next";
import { Footer, Header } from "../chrome";

export const metadata: Metadata = { title: "Bell Lap privacy policy" };

export default function Page() {
  return (
    <>
      <Header />
      <main className="doc">

  <h1>Privacy policy</h1>
  <p className="lede">Bell Lap does not collect, store or share any of your data. Everything it shows stays on your watch.</p>

  <h2>What Bell Lap reads</h2>
  <p>To draw its screens, Bell Lap reads data your watch already has:</p>
  <ul>
    <li><strong>On Apple Watch</strong>, with your permission, from Apple Health: running workouts and their distance, sleep, VO2 max, heart rate, resting heart rate, heart rate variability, cardio recovery, respiratory rate, blood oxygen, steps, active energy, exercise minutes and time in daylight.</li>
    <li><strong>On Garmin</strong>, from the watch: the same kinds of readings through Garmin's Connect IQ platform, such as weekly run distance, heart rate, VO2 max, recovery time, Body Battery and sleep score.</li>
  </ul>

  <h2>What happens to it</h2>
  <p>The readings are used only to draw Bell Lap on your watch, at the moment it is drawn. Bell Lap has no servers, no accounts, no analytics and no advertising. It never sends your data off the watch, never writes anything to Apple Health, and never shares data with anyone.</p>
  <p>Your settings, such as your weekly goal and which readings to show, are kept on the watch. On Garmin they are also synced by Garmin's Connect IQ app if you change them from your phone, under Garmin's own privacy policy.</p>

  <h2>Your control</h2>
  <p>On Apple Watch you can turn off Bell Lap's access to any Health data at any time in the Settings app, under Health, Data Access &amp; Devices, Bell Lap. Deleting Bell Lap from your watch removes its settings.</p>

  <h2>Children</h2>
  <p>Bell Lap collects no data from anyone, including children.</p>

  <h2>Changes and contact</h2>
  <p>If this policy changes, the new version will be published on this page with its date. Questions can be raised by <a href="https://github.com/chattarbx-garmin/bell-lap-site/issues/new">opening an issue</a>.</p>
  
      </main>
      <Footer />
    </>
  );
}
