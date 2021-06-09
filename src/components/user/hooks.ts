// It won't reload if there are no remount => we need to find a way to mutate on login
// @see https://github.com/vercel/next.js/discussions/19601
import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
/**
 * Version that uses Meteor backend
 */
import { VulcanMeteorHooks } from "@vulcanjs/meteor-legacy";
const { useCurrentUser } = VulcanMeteorHooks;

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });

export function useUser({
  redirectTo,
  redirectIfFound,
}: {
  redirectTo?: string;
  redirectIfFound?: boolean;
} = {}) {
  /**
   * Version that uses Next backend
   */
  // const { data, error } = useSWR("/api/user", fetcher);
  // const user = data?.user;
  /**
   * Version that uses Meteor backend
   */
  const currentUserResult = useCurrentUser();
  const data = currentUserResult?.data;
  const error = currentUserResult?.error;
  const user = data?.currentUser;

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
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return error ? null : user;
}
