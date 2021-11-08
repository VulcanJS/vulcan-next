import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n, useTranslation } from "next-i18next";

/**
 * Client only method to change the language
 *
 * This toggle is not persistent. If you need to persist the
 * language, set the relevant Next.js cookie and redirect user,
 * instead of just calling i18n.changeLanguage
 * @see https://nextjs.org/docs/advanced-features/i18n-routing
 *
 * @client
 */
function toggleLanguage() {
  if (!i18n) throw new Error("Cannot call toggleLanguage server-side");
  i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
}

// Add all namespaces used by this page
// This will prevent loading unnecessary namespaces.
const i18nNamespaces = ["common"];

const I18nDebugPage = () => {
  const { t } = useTranslation(i18nNamespaces);
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

/**
 * We must use "serverSideTranslations" to pick only
 * relevant namespaces.
 * However for smaller apps, we can have only 1 namespace and
 * remove this => next-i18next will automatically load all
 * existing namespaces.
 */
export async function getStaticProps({ locale }) {
  return {
    props: {
      // Will be passed to the page component as props
      ...(await serverSideTranslations(locale, i18nNamespaces)),
    },
  };
}

// TODO: test with SSR
export default I18nDebugPage;
