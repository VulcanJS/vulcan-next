import { List, ListItem, ListItemButton } from "@mui/material";
import { useEffect, useState } from "react";

/**
 * @client-only
 */
const detectStep = () => {
  const { host, pathname } = window.location;
  // Running on vulcan-next.vercel.app => step 0
  if (host.match(/vulcan-next.vercel.app/) || pathname.match(/intro-online/)) {
    return 0;
  }
  // Vulcan Next installed and running locally => step 1
  return 1;
  // If Mongo URL is local => next step
  // etc.
};
const useCurrentStep = () => {
  const [step, setStep] = useState<number>(-1);
  useEffect(() => {
    const nextStep = detectStep();
    if (nextStep !== step) {
      setStep(detectStep);
    }
  });
  return step;
};
export const Steps = () => {
  const currentStep = useCurrentStep();
  // TODO: also associate a link to step
  // be careful with step 0, that happens online
  return (
    <List>
      {["Step 0", "Step 1"].map((stepName, stepIdx) => {
        return (
          <ListItem key={stepName}>
            <ListItemButton
              disabled={stepIdx > currentStep}
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
