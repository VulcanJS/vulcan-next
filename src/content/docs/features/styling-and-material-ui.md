## Styling

### Polished

We include [Polished](https://polished.js.org/), a kind of Lodash for styling supported by the Styled Components community.

### Alternative 1: Material UI v5 (+ Emotion)

Initial setup based on [official Next example](https://github.com/mui-org/material-ui/tree/master/examples/nextjs).

We try to reduce the footprint of Material UI for an easy remove. In next iterations, we'll try to make it fully pluggable, like in Vulcan Meteor, so you can easily swap your UI system.

Previous version of Vulcan Next was already using Styled Components with Material UI v4. Material UI v5 uses Emotion out-of-the-box

### Theme switch demo

We demo a theme switch button, using React context. See `lib/providers` for sources and sample Storybook stories.
NOTE: this is currently broken (07/2021) as we are using preview version of Material UI v5.

### Alternative 2: Styled-jsx and PostCSS (+ your CSS framework of choice)

[Styled-jsx is the builtin styling solution of Next](https://nextjs.org/docs/basic-features/built-in-css-support).

#### PostCSS for easier override using Next

In VN, we favour out-of-the-box solutions from Next to style the app, so basically [styled-jsx](https://github.com/vercel/styled-jsx) and CSS modules.
However, [usage with Material UI and more broadly override of child components is not very elegant.](https://github.com/vercel/styled-jsx/issues/142)
We include PostCSS with the "nesting" plugin to allow a cleaner syntax.
