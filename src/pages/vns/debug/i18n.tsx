import { useTranslation } from "react-i18next";

const I18nDebugPage = () => {
  const { t } = useTranslation();
  return <div>{t("__Debug message")}</div>;
};

// TODO: test with SSR
export default I18nDebugPage;
