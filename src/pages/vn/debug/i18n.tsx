import { i18n, useTranslation } from "~/lib/i18n";

function toggleLanguage() {
  i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
}

const I18nDebugPage = () => {
  const { t } = useTranslation("common"); // common namespace is important for SSR
  return (
    <div>
      <div>{t("__Debug message")}</div>
      <div>
        <button id="language-toggle" onClick={() => toggleLanguage()}>
          toggle language
        </button>
      </div>
    </div>
  );
};

I18nDebugPage.getInitialProps = async () => ({
  namespacesRequired: ["common"],
  hello: "world",
});

// TODO: test with SSR
export default I18nDebugPage;
