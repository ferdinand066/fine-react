import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { useAppContext } from '../../../context/State';
import { setCookies } from 'cookies-next';
import { useRouter } from 'next/router';

export default function Login(props : any) {
  const sharedState = useAppContext();
  const router = useRouter();
  
  async function submitLoginForm(e : any) : Promise<any> {
    e.preventDefault();
    let formData = new FormData(document.getElementById('loginForm') as HTMLFormElement);
    props.setOpenRegister(false);

    axios.post(process.env.apiPath + 'auth/login', {
      username : formData.get('username'),
      password : formData.get('password')
    }).then((res) => {
      sharedState.setNotificationList([...sharedState.notificationList, {
        id: '_' + Math.random().toString(36).substr(2, 9),
        title: "Success",
        content: "Welcome back!"
      }])
      sharedState.setJwt(res.data.access_token);
      setCookies('jwt', res.data.access_token, {
        maxAge: 60 * 60 * 24,
        sameSite: true
      })

      sharedState.updateUser(res.data.user)
      router.push('/friend');
      
    }, (err) => {
      sharedState.setNotificationList([...sharedState.notificationList, {
        id: '_' + Math.random().toString(36).substr(2, 9),
        title: "Failed",
        content: "Wrong credential."
      }])
    })

  }

  return (
    <Transition.Root show={props.openLogin} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={props.openLogin}
        onClose={() => props.setOpenLogin(false)}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <form id='loginForm' method='post' onSubmit={ submitLoginForm } className="inline-block bg-white dark:bg-gray-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle sm:max-w-lg w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center text-4xl rounded-full text-indigo-500 font-bold">
                  FINE
                </div>
                <div className="mt-3 text-center sm:mt-5">
                <div className='flex flex-col gap-2'>
                  <div>
                    <input
                      type="email"
                      name="username"
                      id="email"
                      className="dark:bg-gray-600 dark:text-gray-300 dark:border-transparent dark:shadow-inner shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-black"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="dark:bg-gray-600 dark:text-gray-300 dark:border-transparent dark:shadow-inner shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-black"
                      placeholder="Password"
                    />
                  </div>
                    <span onClick={ () => {
                      props.setOpenRegister(true)
                      props.setOpenLogin(false)
                    } } className='text-sm mt-2 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold'>{ "Don't have an account? Register" }</span>  
                </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => props.setOpenLogin(false)}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => props.setOpenLogin(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
