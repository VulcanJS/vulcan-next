import React from "react";
// import { linkTo } from "@storybook/addon-links";
import { Welcome } from "@storybook/react/demo";
import { Typography } from "@material-ui/core";

export default {
  title: "Welcome",
  component: Welcome,
};

export const ToStorybook = () => {
  return (
    <div>
      <Typography variant="h2"> Welcome to Storybook - VN Edition</Typography>
      <Typography variant="body1">
        Explore existing stories using the left menu, or{" "}
        <a
          href="https://storybook.js.org/docs/basics/writing-stories/"
          target="_blank"
          rel="noreferrer"
        >
          read the docs and learn to write your own stories.
        </a>
      </Typography>
    </div>
  );

  //<Welcome showApp={linkTo('Button')} />;
};

ToStorybook.story = {
  name: "to Storybook",
};
