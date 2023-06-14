import React, { useCallback } from "react";
import { useAuth } from "../../../Utils/Auth/AuthProvider";
import { switchLanguage } from "../../../Utils/internationalization/i18n";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function AuthenticatedLayout({ children }) {
  const { logout, isLoading } = useAuth();
  const handleSwitchLanguage = useCallback(() => {
    switchLanguage();
  }, []);

  return (
    <>
      <Header
        logout={logout}
        isLoading={isLoading}
        switchLang={handleSwitchLanguage}
      />
      {children}
      <Footer />
    </>
  );
}

export default AuthenticatedLayout;
