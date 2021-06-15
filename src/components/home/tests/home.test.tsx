import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
// @see https://storybook.js.org/addons/@storybook/react-testing
import { composeStories } from "@storybook/testing-react";
// import all stories from the stories file
import * as stories from "../stories/home.stories";

// Every component that is returned maps 1:1 with the stories, but they already contain all decorators from story level, meta level and global level.
const { HomeStory } = composeStories(stories);

describe('components/home', () => {
  test("renders home with testing-react", () => {
    const { queryAllByText } = render(<HomeStory />);
    expect(queryAllByText("Vulcan Next", { exact: false })).not.toBeNull();
    expect(
      queryAllByText("Vulcan Next", { exact: false }).length
    ).toBeGreaterThan(0);
  });
});