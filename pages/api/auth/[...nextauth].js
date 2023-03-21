import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import { loginUser } from '@/src/services/login';
import { isEmptyObject } from '@/src/helpers/common';

const options = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Email and Password',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                // Add logic here to look up the user from the credentials supplied eg from db or api
                const user = await loginUser(credentials.username, credentials.password);
                if (!isEmptyObject(user)) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null or false then the credentials will be rejected
                    // You can also Reject this callback with an Error or with a URL:
                    //return Promise.reject(new Error('error message')) // Redirect to error page
                    //return Promise.reject('/login')        // Redirect to a URL

                    //Generic error message
                    return Promise.reject('Invalid');
                }
            }
        }),
    ],
    // session: {
    //     jwt: true,
    // },
    // jwt: {
    //     encryption: false,
    // },
    theme: {
        colorScheme: "light",
    },
    callbacks: {
        async jwt({ token }) {
            token.userRole = "admin"
            return token
        },
    },
}

export default (req, res) => NextAuth(req, res, options)