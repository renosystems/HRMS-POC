import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "evergreen-ui";
import { I18nextProvider } from "react-i18next";
import i18n from "./Utils/internationalization/i18n";
import App from "./App";
import { store } from "./Utils/RTK/store";
import { getTheme } from "./Utils/Themes/Themes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      {/* The theme id to be fetched from user profile/settings or whatever structure provided by BE in future */}
      <ThemeProvider value={getTheme("default")}>
        <App />
      </ThemeProvider>
    </I18nextProvider>
  </Provider>
);
