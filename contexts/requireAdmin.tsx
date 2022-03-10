import { GetServerSideProps, GetServerSidePropsContext } from "next";

export function requireAdmin(gssp: GetServerSideProps) {

    return async (context: GetServerSidePropsContext) => {

        const { req } = context;

        if (req.headers.cookie) {
            const headerCookie = req.headers.cookie.split(';');
            const token = headerCookie.find(token => token.includes('token'));
            const admin = token?.includes('Admin');
            
            if (!token && !admin) {
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false
                    }
                }
            } else if (token && !admin) {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }

        return await gssp(context);
    }
}