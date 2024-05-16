import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
      newSocket.send("Hello Server!");
    };
    newSocket.onmessage = (message) => {
      console.log("Message received:", message.data);
      setLatestMessage(message.data);
    };
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  if (!socket) {
    return <div>Connecting to socket server...</div>;
  }

  return (
    <>
      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button
        onClick={() => {
          socket.send(message);
        }}
      >
        send
      </button>

      {latestMessage}
    </>
  );
}

export default App;
