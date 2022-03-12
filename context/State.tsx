import { createContext, SetStateAction, useContext, useEffect, useState } from 'react';


const AppContext = createContext({
  notificationList: [],
  user: null,
  jwt: null
} as any);

export function AppWrapper({ children }: any) {

  const [notificationList, setNotificationList] = useState([]);
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  const context = {
    notificationList, setNotificationList, user, setUser, jwt, setJwt
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