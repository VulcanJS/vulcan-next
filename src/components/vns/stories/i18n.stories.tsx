//import React from "react";
import { useTranslation } from "react-i18next";

export default {
  title: "VN/i18n",
};

const Translated = () => {
  const { t } = useTranslation();
  return <div>{t("__Debug message")}</div>;
};
export const basic = () => <Translated />;
