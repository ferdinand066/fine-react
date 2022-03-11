import { createContext, SetStateAction, useContext, useState } from 'react';


const AppContext = createContext({

} as any);

export function AppWrapper({ children } : any) {

    const [notificationList, setNotificationList] = useState([]);

  return (
    <AppContext.Provider value={{ notificationList, setNotificationList }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}