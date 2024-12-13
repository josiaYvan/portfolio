/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext, useContext, useEffect, useState
} from 'react';
import io from 'socket.io-client';
import { getSessionUser } from '../utils/authentication';
import useFetchData from '../hooks/useFetchData'; // Assurez-vous d'importer votre hook
import notificationWithIcon from '../utils/notification';

const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

export function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [hasNewNotif, setHasNewNotif] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [newNotifCount, setNewNotifCount] = useState(0);
  const authUser = getSessionUser();
  const [loading, error, response] = useFetchData(`/get-notification-by-user-id/${authUser?.id}`, fetchAgain);

  useEffect(() => {
    if (authUser) {
      const socketIo = io(process.env.REACT_APP_BACK_URL, {
        query: { userId: authUser.id }
      });
      setSocket(socketIo);

      // socketIo.on('getOnlineUsers', (users) => {
      // console.log('line:19 OnLine users pour les chat en tmeps réel, "status\n---> ', users);
      // });

      socketIo.on('notification', (notification) => {
        notificationWithIcon('info', notification.subject, `${notification.title}\n${notification.message}`, 60);
        setFetchAgain((prevState) => !prevState);
      });

      return () => {
        socketIo.off('notification');
        socketIo.close();
      };
    }

    if (socket) {
      socket.close();
      setSocket(null);
    }
  }, []);

  useEffect(() => {
    setHasNewNotif(response?.data?.notifications?.some((notif) => notif.toUsers.some((userNotified) => userNotified.tag === 'new')));
    setNotifications(response?.data?.notifications);
    setNewNotifCount(response?.data?.notifications.filter((notif) => notif.toUsers.some((userNotified) => userNotified.tag === 'new')).length);
  }, [response]);

  return (
    <SocketContext.Provider value={{
      socket, hasNewNotif, loading, error, notifications, newNotifCount
    }}
    >
      {children}
    </SocketContext.Provider>
  );
}
