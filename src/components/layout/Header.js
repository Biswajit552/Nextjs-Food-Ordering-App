import Link from "next/link";

export default function Header() {
  return (
    <header className="flex  items-center justify-between">
      <Link className="text-primary font-semibold" href="">
        ST PIZZA
      </Link>
      <nav className="flex gap-8 items-center font-semibold ">
        <Link href="">Home</Link>
        <Link href="">Menu</Link>
        <Link href="">About</Link>
        <Link href="">Contact</Link>
        <Link className="bg-primary rounded-full text-white px-8 py-2" href="">
          login
        </Link>
      </nav>
    </header>
  );
}
