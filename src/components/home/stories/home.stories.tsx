import React from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";
import Home from "../home";

export default {
  title: "VNS/Home",
  component: Home,
};

export const HomeStory = () => <Home />;
HomeStory.storyName = "Home";
