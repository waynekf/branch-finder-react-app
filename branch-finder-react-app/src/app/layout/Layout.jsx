import Root from "./Root";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <Root>
      <div className="page-wrapper">
        <Header />
        {children}
        <Footer />
      </div>
    </Root>
  );
}

export default Layout;
