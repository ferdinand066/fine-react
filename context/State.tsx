import { getCookie, setCookies } from 'cookies-next';
import { createContext, SetStateAction, useContext, useEffect, useState } from 'react';


const AppContext = createContext({
  notificationList: [],
  user: null,
  jwt: null
} as any);

export function AppWrapper({ children }: any) {

  const [notificationList, setNotificationList] = useState([]);
  const [user, setUser] = useState(getCookie('user') ? JSON.parse(getCookie('user') as string) : null || null);
  const [jwt, setJwt] = useState(getCookie('jwt') || null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
      setMounted(true)
  }, [])

  function authenticated(){
    return user !== null;
  }

  function authorizationConfig(){
    return {
      headers: { Authorization: `Bearer ${jwt}`}
    }
  }

  function getFriendsId() : string[]{
    let data = [] as string[];
    if(!user) return data;

    data = user.friendList.map((friend : any) => { return friend._id })
    return data;
  }

  function updateUser(user: any = null){
    setUser(user);
    if (user == null) return;
    setCookies('user', JSON.stringify(user), {
      maxAge: 60 * 60 * 24,
      sameSite: true
    })
  }

  const context = {
    notificationList, setNotificationList, user, updateUser, jwt, setJwt, authenticated, authorizationConfig, getFriendsId
  }

  return (
    mounted && <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}