import { addons } from "@storybook/addons";
// import { themes } from "@storybook/theming"; // premade themes, you can try dark
import vulcanStorybook from "./themes/vulcanStorybook";

addons.setConfig({
  theme: vulcanStorybook,
});
