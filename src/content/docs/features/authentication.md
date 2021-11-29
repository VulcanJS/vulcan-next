# Authentication

**Draft documentation**

We use stateful, token-based (with symmetrical encryption) password-based authentication.

At the time of writing (2021 11), authentication is used only to protect API routes.
You don't really need to protect web pages, redirections based on the `useUser` hook 
are sufficient.

We will introduce _middlewares later on for protecting web pages, but think of it as
a very advanced feature (it serves only to protect sensitive content such as paid pages, and
even then you don't really need this feature, it's just a perf optimization).

## Flows

### Signup

- When an user signs up with email and password, we hash the password and store only the hashed version (+ salt)


### Login

- When a user logs in, we hash the password and check it against the password stored in the database
- If we found the user, we return a Set-Cookie header with a token, hashed with a secret value

### Auth flow

- In subsequent requests, the cookie is automatically added to the request headers by your browser.
It is set as `httpOnly` so you can't manipulate the token in JS.
- The protected API route will check the token, decrypt it using the same secret used for encryption 
(hence the "symmetrical" encryption). If the token can be decrypted with this secret, it means it's authentic.
- We also check that the _id matches a user in the database (that user was not deleted already)

### Logout

- When a user logs out, the auth token is removed from the browser cookies using a Set-Header cookie

## API

We provide basic REST endpoints for authentication in `/pages/api/account`.

Note that we do not use GraphQL for this use case, eventhough it's technically possible.
We believe that GraphQL should be used for the use cases where it shines: getting data,
and CRUD operations. 

Authentication workflow, or file upload for instance, do not really
fall into this category, so we prefer using more basic, independant, REST endpoints for those use cases.

## UI

We provide basic UI in the `/pages/account`.
