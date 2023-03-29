import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import { loginUser } from '@/src/services/login';
import { isEmptyObject } from '@/src/helpers/common';

const options = {
    providers: [
        CredentialsProvider({

            id: 'credentials',
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Login',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
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
                }
                if (isEmptyObject(user)) {
                    // Any object returned will be saved in `user` property of the JWT
                    throw new Error(user.message);
                }
                // If you return null or false then the credentials will be rejected
                return null
                // You can also Reject this callback with an Error or with a URL:
                //return Promise.reject(new Error('error message')) // Redirect to error page
                //return Promise.reject('/api/auth/singin')        // Redirect to a URL
            }
        }),
    ],
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.token,
                    refreshToken: user.refreshToken,
                    userRole: user.id
                }
            }
            return token
        },

        async session({ session, token }) {
            session.user.accessToken = token.accessToken
            session.user.refreshToken = token.refreshToken
            session.user.accessTokenExpires = token.accessTokenExpires

            return session
        },
    },
    theme: {
        colorScheme: 'auto', // "auto" | "dark" | "light"
        brandColor: '', // Hex color code #33FF5D
        logo: '/vercel.svg', // Absolute URL to image
    },
    // Enable debug messages in the console if you are having problems
    debug: process.env.NODE_ENV === 'development',
}

export default (req, res) => NextAuth(req, res, options)