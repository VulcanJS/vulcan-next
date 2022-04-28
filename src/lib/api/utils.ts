import { NextApiRequest } from "next";

export const getRootUrl = (req: NextApiRequest) => {
  const { headers } = req;
  // TODO: this might not be the most robust approach when a proxy/gateway is setup
  return headers.origin;
};
