import { useCallback, useState } from "react";
import configData from "../../../config.json";
// import { useAuth } from "../../../Utils/Auth/AuthProvider";
import { switchLanguage } from "../../../Utils/internationalization/i18n";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function AuthenticatedLayout({ children }) {
  const [lang, setLang] = useState({
    label: configData.LANGUAGES.DEFAULT.NAME,
    value: configData.LANGUAGES.DEFAULT.CODE,
    icon: `${process.env.PUBLIC_URL}/Icons/Flags/${configData.LANGUAGES.DEFAULT.FLAG}.svg`,
  });
  // const { logout, isLoading } = useAuth();
  const handleSwitchLanguage = useCallback((newLang) => {
    setLang(newLang);
    switchLanguage(newLang.value);
  }, []);

  return (
    <>
      <Header
        logout={() => {}}
        isLoading={false}
        switchLang={handleSwitchLanguage}
        lang={lang}
      />
      {children}
      <Footer />
    </>
  );
}

export default AuthenticatedLayout;
