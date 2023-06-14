import React from "react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} {t("COPYRIGHT")}
      </p>
    </footer>
  );
}

export default Footer;
