import { ChatIcon, MailIcon, PlusIcon } from "@heroicons/react/outline";
import axios from "axios";
import { setCookies } from "cookies-next";
import Link from "next/link";
import { useAppContext } from "../../context/State";


export default function FriendList({ person } : any) {
  const sharedState = useAppContext();

  async function addFriend(friendId: string){
    await axios.post(
      (process.env.apiPath as string).concat('friends')
      , {
        id: sharedState.user._id,
        friend_id: friendId
      },
      sharedState.authorizationConfig()).then(
        (res) => {
          sharedState.setNotificationList([...sharedState.notificationList, {
            id: '_' + Math.random().toString(36).substr(2, 9),
            title: "Success",
            content: "Successfully add new friend!"
          }])
          sharedState.updateUser(res.data.users)
      }, (err) => {
        sharedState.setNotificationList([...sharedState.notificationList, {
          id: '_' + Math.random().toString(36).substr(2, 9),
          title: "Failed",
          content: (err.response.status === 409) ? "Friend already exists." : err.response.message
        }])
      }
    )
  }

  return (
    <li
      className="col-span-1 flex flex-col text-center bg-white dark:bg-gray-800 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-600"
    >
      <div className="flex-1 flex flex-col p-8">
        <img
          className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full"
          // src={person.imageUrl}
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
          alt=""
        />
        <h3 className="mt-6 text-gray-900 dark:text-white text-lg font-medium">
          {person.name}
        </h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between gap-1">
          <dt className="sr-only">Full Name</dt>
          <dd className="sm:text-lg font-semibold">{ person.fullName }</dd>
          <dt className="sr-only">Username</dt>
          <dd className="text-sm sm:text-md">{ '@' + person.username }</dd>
          <dt className="sr-only">Status</dt>
          <dd className="mt-3">
            <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
              { "Active" }
            </span>
          </dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200 dark:divide-gray-600">
          <div className="w-0 flex-1 flex">
            <a
              href={`mailto:${person.email}`}
              className="-mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
            >
              <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3 dark:text-gray-400">Email</span>
            </a>
          </div>
          
          { sharedState.getFriendsId().includes(person._id) ?
            <div className="w-0 flex-1 flex">
              <Link href={ `chat/${ person._id }`}>
                <span
                  className="cursor-pointer relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <ChatIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3 dark:text-gray-400">Chat</span>
                </span>
              </Link>
            </div> :
            <div className="w-0 flex-1 flex">
              <span onClick={ () => addFriend(person._id) }
                className="cursor-pointer w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
              >
                <PlusIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3 dark:text-gray-400">Add</span>
              </span>
            </div>
          }
        </div>
      </div>
    </li>
  );
}
