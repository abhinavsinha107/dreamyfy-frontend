import {
    createContext,
    useEffect,
    PropsWithChildren,
    useState,
    useContext,
  } from "react";
  import io, { Socket } from "socket.io-client";
  
  interface SocketContextValue {
    socket: Socket | null;
  }
  
  export const SocketContext = createContext<SocketContextValue>({
    socket: null,
  });
  
  const SOCKET_SERVER_URL = new URL('http://localhost:5000').origin;
  
  const SocketProvider = (props: PropsWithChildren) => {
    const [socket, setSocket] = useState<Socket | null>(null);
  
    useEffect(() => {
      const socket = io(SOCKET_SERVER_URL, {
        path: "/socket",
        transports: ["polling"],
      });
      socket.on("connection", () => {
        console.log("Connected to server", socket?.id);
      });
  
      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
  
      setSocket(socket);
  
      return () => {
        socket.close();
      };
    }, []);
  
    return (
      <SocketContext.Provider value={{ socket }}>
        {props.children}
      </SocketContext.Provider>
    );
  };
  
  export default SocketProvider;
  
  export const useSocket = () => useContext(SocketContext);