import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useState } from 'react'
import { useAppContext } from '../../context/State';


export default function SuccessNotification({ title, content, id } : any){
    const [show, setShow] = useState(true);
    const sharedState = useAppContext();

    function closeNotification(){
      let deletedIndex = -1;
      for (var i = 0; i < sharedState.notificationList.length; i++) {
        if (sharedState.notificationList[i].id === id) {
          deletedIndex = i;
          break;
        }
      }
      let data = [...sharedState.notificationList];
      if (deletedIndex !== -1){
        data.splice(deletedIndex, 1);
        sharedState.setNotificationList(data);
      }

    }

    useEffect(async () => {
      const timer = await setTimeout(() => {
        console.log('here')
        closeNotification();
      }, 5000);
      setShow(false);
      clearTimeout(timer);
    }, []);

    return (          
    <Transition
        show={show}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="max-w-sm w-full bg-white dark:bg-gray-600 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{ title }</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-100">{ content }</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={ closeNotification }
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    )
}