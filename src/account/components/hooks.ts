// It won't reload if there are no remount => we need to find a way to mutate on login
// @see https://github.com/vercel/next.js/discussions/19601
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import useSWR from "swr";
import { UserType } from "~/account/models/user";
import { apiRoutes } from "~/core/server/apiRoutes";

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });

/**
 * Get the current user, optionally redirect if not found
 */
export function useUser({
  redirectTo,
  rememberCurrentRoute,
  redirectIfFound,
}: {
  redirectTo?: string;
  /**
   * Will add from=currentRoute parameter so auth can redirect back to the page
   */
  rememberCurrentRoute?: boolean;
  redirectIfFound?: boolean;
} = {}) {
  const { data, error } = useSWR<{ user?: UserType }>(
    apiRoutes.account.user.href,
    fetcher
  );
  const router = useRouter();
  const user = data?.user;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      const redirectUrl = rememberCurrentRoute
        ? `${redirectTo}?from=${encodeURIComponent(router.pathname)}`
        : redirectTo;
      Router.push(redirectUrl);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return error ? null : user;
}
