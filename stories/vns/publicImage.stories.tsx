import React from "react";
// This pattern works in Storybook, but is not documented in Next.js, that uses a "public" folder instead
// @see https://nextjs.org/docs/basic-features/static-file-serving
// import importedImg from "../../public/vulcan-next-starter-banner_800.png";

export default {
  title: "VNS/publicImage",
};

const MyPublicImage = () => (
  <img src="vulcan-next-starter-banner_800.png"></img>
);

export const publicImg = () => <MyPublicImage />;

//const MyImportedImage = () => <img src={importedImg}></img>;
// export const imported = () => <MyImportedImage />;
