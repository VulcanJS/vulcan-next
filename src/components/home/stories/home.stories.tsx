import React from "react";
// Testing a magic import ~
import Home from "~/components/home";

export default {
  title: "VNS/Home",
  component: Home,
};

export const HomeStory = () => <Home />;
HomeStory.storyName = "Home";
