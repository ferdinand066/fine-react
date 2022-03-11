import { useState } from "react";
import { useAppContext } from "../../context/State";
import SuccessNotification from "./SuccessNotification";

export default function NotificationContainer() {
  const sharedState = useAppContext();

  return (
    <>
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div id="notificationContainer" className="w-full flex flex-col items-center space-y-4 sm:items-end">
            {/* <SuccessNotification title="asd" content="asd" /> */}
            { sharedState.notificationList?.map((notification : any, index : number) => {
                return (
                    <SuccessNotification title={ notification.title } content={ notification.content } key={index} id={ notification.id }/>
                )
              })  
            }
        </div>
      </div>
    </>
  )
}
