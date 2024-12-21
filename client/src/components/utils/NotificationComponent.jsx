import {
    KnockFeedProvider,
    KnockProvider,
    NotificationFeedPopover,
    NotificationIconButton,
  } from "@knocklabs/react";
import "@knocklabs/react/dist/index.css";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
  
  const NotificationComponent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const notifButtonRef = useRef(null);
    const user = useSelector((state) => state.auth?.userInfo);
    const apiKey = import.meta.env.VITE_KNOCK_PUBLIC_API_KEY; 
    const feedId = import.meta.env.VITE_KNOCK_FEED_ID;

    return (
      <KnockProvider apiKey={apiKey} userId={user?._id}>
        {/* Optionally, use the KnockFeedProvider to connect an in-app feed */}
        <KnockFeedProvider feedId={feedId}>
          <div>
            <NotificationIconButton
              ref={notifButtonRef}
              onClick={(e) => setIsVisible(!isVisible)}
            />
            <NotificationFeedPopover
              buttonRef={notifButtonRef}
              isVisible={isVisible}
              onClose={() => setIsVisible(false)}
            />
          </div>
        </KnockFeedProvider>
      </KnockProvider>
    );
  };

export default NotificationComponent;