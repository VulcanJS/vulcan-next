import { List, ListItem, ListItemButton } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useMulti } from "@vulcanjs/react-hooks";
import { User } from "~/models/user";
import { UserType } from "~/models/user";
import { useRouter } from "next/router";
import { S_IFSOCK } from "constants";

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
  return step;
};

const useCurrentStep = () => {
  const router = useRouter();
  const { pathname } = router;
  const stepPaths = [
    ["intro-online", 0],
    ["intro-offline", 1],
    ["mongo", 2],
  ] as const;
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
      {[
        { name: "Step 0", path: "/learn/intro-online" },
        { name: "Step 1", path: "/learn/intro-offline" },
        { name: "Step 2", path: "/learn/mongo" },
        { name: "Step 3", path: "/learn/mongo" },
      ].map((step, stepIdx) => {
        return (
          <ListItem key={step.name}>
            <ListItemButton
              disabled={stepIdx > maxStep}
              selected={stepIdx === currentStep}
            >
              {step.name}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

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
