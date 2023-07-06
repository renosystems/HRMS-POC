import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
// import { TabNavigation, Tab } from "evergreen-ui";
import configData from "../../../config.json";
import { switchLanguage } from "../../../Utils/internationalization/i18n";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { logout } from "../../../Utils/RTK/slices/auth.slice";

function AuthenticatedLayout({ children }) {
  // const [selectedTab, setSelectedTab] = useState(1);
  const dispatch = useDispatch();
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
        logout={() => dispatch(logout())}
        isLoading={false}
        switchLang={handleSwitchLanguage}
        lang={lang}
      />
      {/* <TabNavigation>
        {[
          { id: 1, name: "Employees & departments", route: "/departments" },
        ].map((tab) => {
          return (
            <Tab
              isSelected={selectedTab === tab.id}
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.name}
            </Tab>
          );
        })}
      </TabNavigation> */}
      {children}
      <Footer />
    </>
  );
}

export default AuthenticatedLayout;
