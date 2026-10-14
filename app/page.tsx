/* eslint-disable @next/next/no-img-element */
import { Footer, Header } from "./chrome";
import { Bell, CountUp, Lane, NightRings, Reveal, Week, Yours } from "./story";

// The page is one runner's week, Monday to Sunday, ending on the bell for the last lap.
export default function Home() {
  return (
    <>
      <Lane />
      <Header />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <Reveal as="h1">Every week<br />is a lap.</Reveal>
            <Reveal as="p" className="lede" delay={0.08}>
              Bell Lap puts your running week, your sleep and your recovery on your wrist, so you always know how much of the lap is left.
            </Reveal>
            <Reveal as="p" className="where" delay={0.16}>
              For <strong>Apple Watch</strong>, with complications for the face you already wear. Coming soon to the App Store.
            </Reveal>
          </div>
          <div className="hero-watches">
            <Reveal className="watch-apple hero-back" delay={0.1}>
              <img src="/assets/apple-settings.png"
                   alt="Bell Lap settings on the watch: weekly goal, edges and stats" />
            </Reveal>
            <Reveal className="watch-apple hero-front" delay={0.3}>
              <img src="/assets/apple-week.png"
                   alt="Bell Lap on Apple Watch: 32.4 of 40 km this week, a bar for each day, VO2 max, resting heart rate and HRV, with sleep and goal gauges down the edges" />
            </Reveal>
          </div>
        </section>

        <section className="day">
          <div className="day-copy">
            <Reveal as="h2"><span className="when">Monday</span>The first run sets the week going.</Reveal>
            <Reveal as="p" delay={0.07}>Eight kilometres before work. On your wrist it becomes the first bar of the week, and the total starts counting toward your goal.</Reveal>
          </div>
          <Week upto={0} total={8.2} />
        </section>

        <section className="day">
          <div className="day-copy">
            <Reveal as="h2"><span className="when">Thursday</span>The long one, then an easy one.</Reveal>
            <Reveal as="p" delay={0.07}>Rest days stay flat and that&apos;s fine. You see the shape of your week at a glance, the long run standing tallest, today in black.</Reveal>
          </div>
          <Week upto={3} total={24.8} />
        </section>

        <section className="night">
          <div className="night-inner">
            <div className="day-copy">
              <Reveal as="h2"><span className="when">Friday night</span>Rest is training too.</Reveal>
              <Reveal as="p" delay={0.07}>Last night&apos;s sleep hugs one edge of the screen and your weekly goal the other. Glance at them before you decide how hard tomorrow goes.</Reveal>
              <Reveal className="gauges" delay={0.14}>
                <div><span className="gauge-name">Sleep</span><CountUp to={7.7} format="sleep" /></div>
                <div><span className="gauge-name">Weekly goal</span><CountUp to={81} format="percent" /></div>
              </Reveal>
            </div>
            <div className="night-watches">
              <NightRings />
              <Reveal className="watch-apple night-apple" delay={0.2}>
                <img src="/assets/apple-week.png" alt="Bell Lap on Apple Watch: sleep on the left edge, the weekly goal on the right" />
              </Reveal>
            </div>
          </div>
        </section>

        <Yours />

        <section className="sunday">
          <Bell />
          <Reveal as="h2"><span className="when">Sunday</span>The bell lap.</Reveal>
          <Reveal as="p" delay={0.07}>32.4 of 40 km. One more run closes the week. The bell is for the last lap, and Bell Lap makes sure you hear it.</Reveal>
          <Reveal className="get" delay={0.14}>
            <div><h3>On your wrist</h3><p>Free for Apple Watch on watchOS 10 and later: Series 4 and newer, every SE and every Ultra. Coming soon to the App Store.</p></div>
            <div><h3>On your face</h3><p>Add your running week as a large complication, and sleep, VO2 max, HRV or any of 15 readings as round or corner gauges. They show in the Smart Stack too.</p></div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
