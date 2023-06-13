import React from "react";
import { useAuth } from "../../../Utils/Auth/AuthProvider";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function AuthenticatedLayout({ children }) {
  const { logout, isLoading } = useAuth();

  return (
    <>
      <Header logout={logout} isLoading={isLoading} />
      {children}
      <Footer />
    </>
  );
}

export default AuthenticatedLayout;
