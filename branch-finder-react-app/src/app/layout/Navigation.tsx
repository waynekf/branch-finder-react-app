import Link from 'next/link';

function Navigation() {
  return (
    <>
      |
      <Link href="/home">
        <small>Home</small>
      </Link>
      |
      <Link href="/about">
        <small>About</small>
      </Link>
      |
      <Link href="/map">
        <small>Map</small>
      </Link>
      |
    </>
  );
}

export default Navigation;
