import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineSend } from "react-icons/ai";
import chatbg from "../../assets/chatbg.png";
import { useLocation, useNavigate } from "react-router-dom";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { createSocketConnection } from "../../utils/socket";
import axios from "axios";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function ChatWindow() {
  const user = useSelector((state) => state.user);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOnline, setIsOnline] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { targetUser } = location.state || {};

  const userId = user?._id;

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  async function getChat() {
    try {
      const res = await axios.get(`${base_url}/chat/${targetUser.id}`, {
        withCredentials: true,
      });

      const chat = res.data?.chat?.[0];
      const messages = chat?.messages;
      const formattedMessages =
        messages?.map((m) => ({
          id: m._id,
          text: m.text,
          sender: m.senderId._id === userId ? "me" : "other",
        })) || [];

      setMessages(formattedMessages);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getChat();
  }, [targetUser.id]);

  useEffect(() => {
    if (!user._id || !targetUser.id) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      targetUserId: targetUser.id,
      firstname: user.firstname,
    });

    //receive message
    socket.on("messageReceive", ({ firstname, text, senderId }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text,
          sender: senderId === userId ? "me" : "other",
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUser.id]);

  useEffect(() => {
    if (!targetUser.id) return;

    socketRef.current.emit("checkOnline", targetUser.id, (isOnline) => {
      setIsOnline(isOnline);
    });
  }, [targetUser.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (message.trim() === "" || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      firstname: user.firstname,
      targetUserId: targetUser.id,
      text: message,
    });

    setMessage("");
  }

  return (
    <div className="h-[100dvh] flex flex-col">
      {/* header */}
      <div className="flex items-center justify-between px-[20px] bg-white shadow-xl h-16">
        <div className="flex items-center gap-4">
            <HiArrowSmallLeft
              data-testid="back"
              className="block lg:hidden text-2xl cursor-pointer text-gray-700 hover:text-blue-500"
              onClick={() => navigate("/dashboard")}
            />
          <img
            src={targetUser.imageurl}
            alt="targetuser-image"
            className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
          />
          <div className="flex flex-col">
            <div className="font-sm font-semibold text-gray-800">
              {targetUser.firstname}
            </div>
            {isOnline && <div className="text-xs text-green-700">Online</div>}
          </div>
        </div>
        {/* search */}
        {/* <CiSearch className="text-xl text-gray-600 cursor-pointer hover:text-blue-500" /> */}
      </div>

      {/* chat messages */}
      <div
        className="flex-1 overflow-y-auto p-3 sm:p-6 bg-gray-100"
        style={{
          backgroundImage: `url(${chatbg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col gap-3">
          {messages?.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] shadow-md text-sm ${
                  msg.sender === "me"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="w-full bg-white px-4 py-3 shadow-xl">
        <div className="w-full max-w-6xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <button
            data-testid="send"
            onClick={handleSend}
            className="p-3 rounded-full text-blue-500 hover:text-blue-600 transition"
          >
            <AiOutlineSend size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
