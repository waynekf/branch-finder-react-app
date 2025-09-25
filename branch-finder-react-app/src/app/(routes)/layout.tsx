import Footer from '../layout/Footer';
import Header from '../layout/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        ></link>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.15.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <script
          src="https://api.mapbox.com/mapbox-gl-js/v3.15.0/mapbox-gl.js"
          defer
        ></script>
      </head>
      <body
        style={{
          backgroundImage: `url(/img/grid.png)`,
          opacity: 0.95,
          backgroundRepeat: 'repeat',
        }}
      >
        <Header></Header>
        <main className="container">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
