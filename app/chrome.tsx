import Link from "next/link";

export function Header() {
  return (
    <header className="top">
      <Link className="wordmark" href="/">Bell Lap</Link>
      <nav><Link href="/support/">Support</Link><Link href="/privacy/">Privacy</Link></nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bottom">
      <span>Bell Lap</span>
      <nav><Link href="/support/">Support</Link><Link href="/privacy/">Privacy</Link></nav>
    </footer>
  );
}
