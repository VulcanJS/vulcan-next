import { useRouter } from "next/router";
import { useEffect } from "react";

const LearnIndex = () => {
  // Redirect user based on the url
  const router = useRouter();
  useEffect(() => {
    const isLocalhost = window.location.hostname.match(/localhost/);
    const isOfficialWebsite =
      !isLocalhost && window.location.hostname.match(/vulcan-next/);
    if (isOfficialWebsite) {
      router.push("/learn/intro-online");
    } else if (isLocalhost) {
      router.push("/learn/intro-offline");
    } else {
      router.push("https://vulcan-next.vercel.app/learn");
    }
  }, []);
  return null;
};
export default LearnIndex;
