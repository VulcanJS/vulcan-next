import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useMulti } from "@vulcanjs/react-hooks";
import { User } from "~/models/user";
import { UserType } from "~/models/user";
import { useRouter } from "next/router";
import { NextMuiListItemButton } from "@vulcanjs/next-mui";

const steps = [
  { name: "0 - Install", path: "/learn/intro-online" },
  { name: "1 - Run", path: "/learn/intro-offline" },
  { name: "2 - Mongo", path: "/learn/mongo" },
  { name: "3 - Models", path: "/learn/about-models" },
  { name: "4 - Server models", path: "/learn/server-only-models" },
  { name: "5 - GraphQL server", path: "/learn/graphql-server" },
  { name: "Done!", path: "/learn/final" },
];
const stepPaths = steps.map((s, idx) => {
  return [s.path, idx] as const;
});

/**
 * @client-only
 */
const detectStep = ({ usersCount }) => {
  const { host, pathname } = window.location;
  // Running on vulcan-next.vercel.app => step 0
  if (host.match(/vulcan-next.vercel.app/) || pathname.match(/intro-online/)) {
    return 0;
  }
  // LOCAL
  // the demo database doesn't have any user, while the local db will have at least the admin
  // TODO: we should maybe use a specific collection to debug this, instead of users
  // because for security reasons guests might not see users
  // For instance, use a specific "learn" collection or "sample" model that we seed also for guests
  if (usersCount >= 1 /* TODO */) {
    return 3;
  }
  // Vulcan Next installed and running locally => step 1 and 2 are ok
  return 2;
  // If Mongo URL is local => next step
  // etc.
};
const useMaxStep = () => {
  const currentStep = useCurrentStep();
  const [step, setStep] = useState<number>(-1);

  // various data needed to detect the step
  const usersResult = useMulti<UserType>({
    model: User,
    //queryOptions: { pollInterval: 2000 },
  });
  // NOTE: guest users cannot see users, they only have to count
  // TODO: in future version even the count might not be available,
  // so we'll need another way to figure if using the local db
  const usersCount = usersResult?.data?.vulcanUsers?.totalCount;
  useEffect(() => {
    const nextStep = detectStep({ usersCount });
    if (nextStep !== step) {
      setStep(nextStep);
    }
  }, [usersCount]);
  // NOTE: when "forcing" a step, by accessing its url, it becomes the max step automatically
  // (it's ok to access a step manually)
  return Math.max(step, currentStep);
};

const useCurrentStep = () => {
  const router = useRouter();
  const { pathname } = router;
  const currentStep = stepPaths.find(([pathMatch, step]) => {
    if (pathname.match(pathMatch)) {
      return true;
    }
    return false;
  });
  if (!currentStep) return -1;
  return currentStep[1];
};
export const Steps = () => {
  const maxStep = useMaxStep();
  const currentStep = useCurrentStep();
  // TODO: also associate a link to step
  // be careful with step 0, that happens online
  return (
    <List>
      {steps.map((step, stepIdx) => {
        return (
          <ListItem key={step.name}>
            <NextMuiListItemButton
              href={step.path}
              disabled={stepIdx > maxStep}
              selected={stepIdx === currentStep}
            >
              {step.name}
            </NextMuiListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

/**
 * Enable a step button or show a message if disabled
 * @param param0
 * @returns
 */
export const StepIfElse = ({
  ifOk,
  ifNotOk = null,
  step,
}: {
  ifOk: ReactNode;
  ifNotOk?: ReactNode;
  step: number;
}) => {
  const maxStep = useMaxStep();
  if (step <= maxStep) return ifOk;
  else return ifNotOk;
};
