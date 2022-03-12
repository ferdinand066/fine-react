import { getCookie } from 'cookies-next';
import { createContext, SetStateAction, useContext, useEffect, useState } from 'react';


const AppContext = createContext({
  notificationList: [],
  user: null,
  jwt: null
} as any);

export function AppWrapper({ children }: any) {

  const [notificationList, setNotificationList] = useState([]);
  const [user, setUser] = useState(getCookie('user') || null);
  const [jwt, setJwt] = useState(getCookie('jwt') || null);

  function authenticated(){
    return user !== null;
  }

  const context = {
    notificationList, setNotificationList, user, setUser, jwt, setJwt, authenticated
  }

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}