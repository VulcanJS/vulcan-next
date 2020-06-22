//import React from "react";
import { useTranslation } from "react-i18next";

export default {
  title: "VNS/i18n",
};

const Translated = () => {
  const { t } = useTranslation();
  return <div>{t("__Debug message")}</div>;
};
export const basic = () => <Translated />;
