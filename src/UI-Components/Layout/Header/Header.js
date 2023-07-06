import React from "react";
import { Pane, Heading, Button, SelectMenu } from "evergreen-ui";
import { useTranslation } from "react-i18next";
import configData from "../../../config.json";

/**
 * @param {Object} logout logout fn
 * @param {Boolean} isLoading loading state indicator
 * @param {Object} switchLang switch language fn
 * @param {String} lang current selected language
 * @returns
 */
function Header({ logout, isLoading, switchLang, lang }) {
  const { t } = useTranslation();

  return (
    <Pane
      is="header"
      display="flex"
      background="gray300"
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
          appearance="main"
          onClick={logout}
          isLoading={isLoading}
          style={{ marginInlineEnd: "10px" }}
        >
          {t("LOGOUT")}
        </Button>

        <SelectMenu
          hasFilter={false}
          hasTitle={false}
          closeOnSelect={true}
          selected={lang.value}
          onSelect={(item) => switchLang(item)}
          options={configData.LANGUAGES.LIST.map((lang) => ({
            label: lang.NAME,
            value: lang.CODE,
            icon: `${process.env.PUBLIC_URL}/Icons/Flags/${lang.FLAG}.svg`,
          }))}
        >
          <Button>
            <Pane style={{ marginInlineEnd: "5px" }}>
              <img width="20" alt={`${lang.label}-flag`} src={lang.icon} />
            </Pane>
            {lang.label}
          </Button>
        </SelectMenu>
      </Pane>
    </Pane>
  );
}

export default Header;
