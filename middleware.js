import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            // `/admin` requires admin role
            if (req.nextUrl.pathname.match(/^\/admin\/.*/gi)) {
                return token?.userRole === 15
            }
            // `/me` only requires the user to be logged in
            return !!token
        },
    },
})

export const config = { matcher: ['/admin/dashboard'] }