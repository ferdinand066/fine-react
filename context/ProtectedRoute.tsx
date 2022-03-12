import { useAppContext } from "./State";

const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute = ({ children, router } : any) => {

  //Identify authenticated user
  const { user } = useAppContext();
  const isAuthenticated = user !== null;

  let unprotectedRoutes = [
    '/'
  ];

  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push('/');
  }

  return children;
};

export default ProtectedRoute;