import React from "react";
import Home from "~/components/home";
// Testing a magic import ~

export default {
  title: "VNS/Home",
  component: Home,
};

export const HomeStory = () => <Home />;
HomeStory.storyName = "Home";
