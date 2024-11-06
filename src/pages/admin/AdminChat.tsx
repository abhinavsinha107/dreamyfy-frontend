import React, { useEffect, useState } from "react";
import {
  useApproveSessionMutation,
  useGetSessionsQuery,
} from "../../services/api";
import { useSocket } from "../../provider/SocketProvider";
import { Container } from "@mui/material";

interface Message {
  text: string;
  sender: "user" | "admin";
}

interface User {
  _id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  comments: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AdminChat: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [sampleUsers, setSampleUsers] = useState<User[]>([]);

  const { data, isSuccess } = useGetSessionsQuery();

  const [approveSession] = useApproveSessionMutation();

  const { socket } = useSocket();

  useEffect(() => {
    if (selectedUserId && socket) {
      socket.emit("joinBookingChat", selectedUserId);
      console.log(`Joined booking room with bookingId: ${selectedUserId}`);
      socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [selectedUserId, socket]);

  useEffect(() => {
    if (isSuccess) {
      setSampleUsers(data?.data);
    }
  }, [isSuccess]);

  // Function to handle user selection
  const handleUserSelect = (userId: string) => {
    const selectedUser = sampleUsers.find((user) => user._id === userId);

    if (selectedUser) {
      if (!selectedUser.approved) {
        // Open the modal for approval
        setPendingUserId(userId);
        setIsModalOpen(true);
        return;
      }
      setSelectedUserId(userId);
    }
  };

  const handleApproveSession = async () => {
    if (pendingUserId) {
      await approveSession(pendingUserId).unwrap();
      const updatedUsers = sampleUsers.map((user) =>
        user._id === pendingUserId ? { ...user, approved: true } : user
      );
      setSampleUsers(updatedUsers);
      setSelectedUserId(pendingUserId);
      setIsModalOpen(false);
    }
  };

  // Function to send a new message
  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage: Message = { text: input, sender: "admin" };
    // setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket.emit("sendMessage", selectedUserId, newMessage);
    setInput(""); // Clear input field
  };

  return (
    <Container maxWidth="lg" className="my-5" style={{ display: 'flex', gap: 20, flexDirection: 'row' }}>
      {/* Users List */}
      <div className="w-4/12 bg-white rounded-lg overflow-hidden">
        <h3 className="p-3 px-5 bg-[#161e2f] text-white text-xl">Chat Requests</h3>
        <div className="flex flex-col gap-3 p-5">
          {sampleUsers.map((user) => (
            <div
              key={user?._id}
              onClick={() => handleUserSelect(user?._id)}
              className={`p-3 px-4 capitalize w-full cursor-pointer hover:text-white hover:bg-[#161e2f] transition-all duration-500 ${selectedUserId === user._id ? 'bg-[#161e2f] text-white' : ''} border rounded-full`}
            >
              {user.name}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-8/12 bg-white rounded-lg overflow-hidden">
        <div className="p-3 px-5 bg-[#161e2f] text-white text-xl capitalize">
          Chat with{" "}
          {selectedUserId
            ? sampleUsers.find((user) => user._id === selectedUserId)?.name
            : "User"}
        </div>
        <div className="p-5">

          {/* Chat Messages */}
          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              padding: "10px",
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              marginBottom: "10px",
              height: "60vh",
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    message.sender === "admin" ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "10px",
                    borderRadius: "10px",
                    backgroundColor:
                      message.sender === "admin" ? "#007bff" : "#e0e0e0",
                    color: message.sender === "admin" ? "white" : "black",
                    textAlign: "left",
                    wordWrap: "break-word",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input and Send Button */}
          {selectedUserId && (
            <div style={{ display: "flex", marginTop: "10px" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flexGrow: 1,
                  padding: "10px 20px",
                  borderRadius: "60px",
                  border: "1px solid #ccc",
                  outline: "none",
                }}
                placeholder="Type your message..."
              />
              <button
                onClick={handleSend}
                className="bg-[#161e2f] px-5 text-white rounded-full ml-3"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for session approval */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              minWidth: "300px",
              textAlign: "center",
            }}
          >
            <h3>Session Approval Required</h3>
            <p>
              You need to approve the session for{" "}
              {pendingUserId
                ? sampleUsers.find((user) => user._id === pendingUserId)?.name
                : ""}{" "}
              to chat.
            </p>
            <button
              onClick={handleApproveSession}
              style={{
                margin: "10px",
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Approve Session
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                margin: "10px",
                padding: "10px 20px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AdminChat;
