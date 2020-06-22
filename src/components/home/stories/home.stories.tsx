import React from "react";
// Testing a magic import ~
import Home from "~/components/home";
import { MDXMuiLayout } from "~/components/layout";

export default {
  title: "VNS/Home",
  component: Home,
  decorators: [(storyFn) => <MDXMuiLayout>{storyFn()}</MDXMuiLayout>],
};

export const HomeStory = () => <Home />;
HomeStory.storyName = "Home";
