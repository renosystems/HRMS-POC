import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function AuthenticatedLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default AuthenticatedLayout;
