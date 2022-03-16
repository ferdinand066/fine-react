import { useEffect, useState } from "react";
import { useAppContext } from "../../context/State";
import SuccessNotification from "./Notification";

export default function NotificationContainer() {
  const sharedState = useAppContext();

  function removeNotification(index : any){
    let data = [...sharedState.notificationList];
    data.splice(index, 1);
    sharedState.setNotificationList(data);
  }

  return (
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div id="notificationContainer" className="w-full flex flex-col items-center space-y-4 sm:items-end">
            { sharedState.notificationList?.map((notification : any, index : number) => {
                return (
                    <SuccessNotification title={ notification.title } content={ notification.content } 
                      key={index} id={ index } removeNotification={ removeNotification }/>
                )
              })  
            }
        </div>
      </div>
  )
}
