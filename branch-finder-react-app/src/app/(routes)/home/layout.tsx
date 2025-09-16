export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>sub-layout{children}</div>;
}
