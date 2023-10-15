import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
const apiUrl = process.env.API_URL;

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: {
          label: 'username',
          type: 'text',
          placeholder: 'diegato...'
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: '*******'
        }
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post(`${apiUrl}/auth/local`, {
            identifier: credentials?.identifier,
            password: credentials?.password
          });
          if (response) {
            const { jwt } = response.data;
            const { id, email } = response.data.user;
            if (id && email) {
              return {
                id,
                email,
                jwt
              };
            }
          }
          return null;
        } catch (e) {
          if (axios.isAxiosError(e)) {
            console.log(e);
          }
          throw new Error('Internal Server Error');
        }
      }
    })
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user = token.user as any;
        return session;
      }
      return session;
    }
  }
};
