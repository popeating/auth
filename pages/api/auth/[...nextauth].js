import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import * as Fauna from 'faunadb';
import { FaunaAdapter } from '@next-auth/fauna-adapter';
const client = new Fauna.Client({
  secret: process.env.FAUNA_KEY,
  scheme: 'https',
  domain: 'db.eu.fauna.com',
  port: 443,
});
// const q = Fauna.query;
console.log('here', client.query);
// var createP = client.query(
//   q.Create(q.Collection('accounts'), { data: { testField: 'testValue' } })
// );
// createP.then(function (response) {
//   console.log(response.ref); // Logs the ref to the console.
// });

// export default async function auth(req, res) {
//   return await NextAuth(req, res, {
export default NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],

  adapter: FaunaAdapter({ faunaClient: client }),
  session: { jwt: true },
});
