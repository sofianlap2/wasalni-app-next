import { GetServerSideProps, GetServerSidePropsContext } from "next";

export function requireConductor(gssp: GetServerSideProps) {

    return async (context: GetServerSidePropsContext) => {

        const { req } = context;

        if (req.headers.cookie) {
            const headerCookie = req.headers.cookie.split(';');
            const token = headerCookie.find(token => token.includes('token'));
            const conductor = token?.includes('Conductor');
            
            if (!token && !conductor) {
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false
                    }
                }
            } else if (token && !conductor) {
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