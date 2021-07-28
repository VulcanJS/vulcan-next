import { Request } from "express";
import { NextApiRequest, NextApiResponse } from "next";
import { UserConnector } from "~/models/user";
import { encryptSession } from "~/api/passport/iron";

// TODO: factor the context creation so we can reuse it for graphql and REST endpoints
import { contextFromReq } from "~/api/context";

export default async function sendVerificationEmail(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // TODO: check if this is ok to compute the context from a NextApiRequest like this
        const context = await contextFromReq((req as unknown) as Request);

        const email: string = req.body?.email;
        if (!email) {
            res.status(500).end("email not found");
        }

        // verify that an user corresponds to this email adress
        const user = await UserConnector.findOne({ email });
        if (!user) {
            res.status(500).end(`user not found: no user correspond to the adress ${email}`);
        }

        // create the url
        const token = await encryptSession({ email });
        // TODO: put the app URL here, maybe imported from src/pages/vns/debug/about.tsx but it doesn't seems complete right now
        const url = `rootUrl/verify-email/${token}`

        // send the mail
        console.log(`MAIL: verify email ${email}\with the url ${url}`); //TODO: send the real email
        res.status(200).send({ done: true });
    } catch (error) {
        console.error(error);
        res.status(500).end(error.message);
    }
}

