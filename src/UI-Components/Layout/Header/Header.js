import React from "react";
import { Pane, Heading, Button } from "evergreen-ui";
import { useTranslation } from "react-i18next";

/**
 * @param {Object} logout logout fn
 * @param {Boolean} isLoading loading state indicator
 * @param {Object} switchLang switch language fn
 * @returns
 */
function Header({ logout, isLoading, switchLang }) {
  const { t } = useTranslation();

  return (
    <Pane
      is="header"
      display="flex"
      background="blue700"
      paddingY={12}
      paddingX={40}
      width="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading size={900} color="white">
        HRMS
      </Heading>
      <Pane>
        <Button
          onClick={logout}
          isLoading={isLoading}
          style={{ marginInlineEnd: "10px" }}
        >
          {t("LOGOUT")}
        </Button>
        <Button onClick={switchLang}>{t("LANG_BTN_TEXT")}</Button>
      </Pane>
    </Pane>
  );
}

export default Header;
