import { useState } from "react";
import SuccessNotification from "./SuccessNotification";

export default function NotificationContainer() {
    const [notificationList, setNotificationList] = useState([{
        title: "asd", content: "asdasd"
    }] as any[]);

    const data = [{
        title: "asd", content: "asdasd"
    }]


  return (
    <>
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div id="notificationContainer" className="w-full flex flex-col items-center space-y-4 sm:items-end">
            <SuccessNotification title="asd" content="asd" />
        </div>
      </div>
    </>
  )
}
