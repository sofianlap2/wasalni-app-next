import { GetServerSideProps, GetServerSidePropsContext } from "next";

export function requireAuthentification(gssp: GetServerSideProps) {

    return async (context: GetServerSidePropsContext) => {

        const { req } = context;

        if (req.headers.cookie) {
            const headerCookie = req.headers.cookie.split(';');
            const token = headerCookie.find(token => token.includes('token'));

            if (!token) {
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false
                    }
                }
            }
        }

        return await gssp(context);
    }
}