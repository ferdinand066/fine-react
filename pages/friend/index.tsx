
import { SearchIcon, UserAddIcon } from "@heroicons/react/solid";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import FriendList from "../../components/Friend/FriendList";
import MenuList from "../../components/Friend/MenuList";
import Header from "../../components/Header";
import InputSearch from "../../components/Input/Search";
import { useAppContext } from "../../context/State";

// const people = [
//   {
//     name: "Jane Cooper",
//     title: "Paradigm Representative",
//     role: "Admin",
//     email: "janecooper@example.com",
//     telephone: "+1-202-555-0170",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
//   },
//   // More people...
// ];

const Friend: NextPage = () => {
  const sharedState = useAppContext();
  const [searchFriend, setSearchFriend] = useState(true);
  const [addFriend, setAddFriend] = useState(false);
  const [people, setPeople] = useState([]);
  let timer: any;

  useEffect(() => {
    setPeople(sharedState.user.friendList);
  }, [])

  async function changePageState(str: string) {
    setPeople([]);
    (document.getElementById('search') as HTMLInputElement).value = "";
    if (str === "addFriend") {
      setSearchFriend(false);
      setAddFriend(true);
    } else {
      setSearchFriend(true);
      setAddFriend(false);
      setPeople(sharedState.user.friendList);
    }
  }

  async function syncPerson() {
    let search = (document.getElementById('search') as HTMLInputElement).value;
    if (addFriend) {
      await axios.get((process.env.apiPath as string).
        concat('users?id=', sharedState.user._id, '&username=', search)
        , sharedState.authorizationConfig()).then((res) => {
          setPeople(res.data.users);
        }, (err) => {
          console.log(err);
        })
    } else if (searchFriend) {
      setPeople(
        sharedState.user.friendList.filter((friend: any) => {
          return friend.username.includes(search) && friend;
        }));
    }
  }

  function searchAllPerson() {
    clearTimeout(timer);
    timer = setTimeout(syncPerson, 400);
  }

  return (sharedState.authenticated() &&
    <div>
      <Head>
        <title>FINE | Chat</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="dark:bg-gray-700 min-h-screen">
        <main className="w-full mx-auto flex flex-col lg:flex-row max-w-7xl flex-1 border-x dark:border-gray-600">
          <div className="w-full md:w-1/4 md:border-r block dark:md:border-gray-600 lg:h-screen">
            <ul className="divide-y divide-gray-200 dark:divide-none">
              <div onClick={() => changePageState("searchFriend")} >
                <MenuList name={"Search Friend"} icon={<SearchIcon className="h-12 w-12 rounded-full p-2.5 bg-gray-100 dark:bg-gray-600 dark:text-white text-gray-500" />} />
              </div>
              <div onClick={() => changePageState("addFriend")} >
                <MenuList name={"Add Friend"} icon={<UserAddIcon className="h-12 w-12 rounded-full pl-3 p-2 bg-gray-100 dark:bg-gray-600 dark:text-white text-gray-500" />} />
              </div>
              <li className="px-4 py-2 font-semibold">Friend Recommendation</li>
            </ul>
          </div>
          <div className="w-full lg:w-3/4">
            {
              <div className="w-full py-6 lg:p-6">
                <div className="px-4 lg:p-0">
                  <label htmlFor="search" className="sr-only">Search</label>
                  <InputSearch searchAllPerson={searchAllPerson} />
                </div>

                <ul className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 py-6">
                  {people.map((person, index) => (
                    <FriendList person={person}
                      key={index} />
                  ))}
                </ul>
              </div>
            }
            <ul className="divide-y divide-gray-200 dark:divide-none">
              <li className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {/* {icon} */}
                    <img
                      className="w-12 h-12 flex-shrink-0 mx-auto bg-black rounded-full"
                      // src={person.imageUrl}
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <p className="font-medium text-gray-900 truncate dark:text-white">
                      Ferdinand
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Friend;
