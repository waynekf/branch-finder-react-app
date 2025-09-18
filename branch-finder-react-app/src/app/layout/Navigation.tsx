import Link from 'next/link';

function Navigation() {
  return (
    <>
      <Link href="/home">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/map">Map</Link>
    </>
  );
}

export default Navigation;
