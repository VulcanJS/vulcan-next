import { List, ListItem, ListItemButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useMulti } from "@vulcanjs/react-hooks";
import { User } from "~/models/user";
import { UserType } from "~/models/user";
import { useRouter } from "next/router";

/**
 * @client-only
 */
const detectStep = ({ users }) => {
  const { host, pathname } = window.location;
  // the demo database doesn't have any user, while the local db will have at least the admin
  if (users?.length >= 1 /* TODO */) {
    return 2;
  }
  // Running on vulcan-next.vercel.app => step 0
  if (host.match(/vulcan-next.vercel.app/) || pathname.match(/intro-online/)) {
    return 0;
  }
  // Vulcan Next installed and running locally => step 1
  return 1;
  // If Mongo URL is local => next step
  // etc.
};
const useMaxStep = () => {
  const [step, setStep] = useState<number>(-1);

  // various data needed to detect the step
  const usersResult = useMulti<UserType>({ model: User });

  useEffect(() => {
    const nextStep = detectStep({ users: usersResult.documents });
    if (nextStep !== step) {
      setStep(nextStep);
    }
  }, [usersResult]);
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
      {["Step 0", "Step 1", "Step 3"].map((stepName, stepIdx) => {
        return (
          <ListItem key={stepName}>
            <ListItemButton
              disabled={stepIdx > maxStep}
              selected={stepIdx === currentStep}
            >
              {stepName}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
