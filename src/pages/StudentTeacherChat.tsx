import React, { useEffect, useState } from "react";
import { useGetChatDetailsQuery } from "../services/api";
import { useSocket } from "../provider/SocketProvider";
import { RootState, useAppSelector } from "../redux/store";

interface Message {
  text: string;
  sender: "STUDENT" | "TEACHER";
}

interface Student {
  _id: string;
  name: string;
  email: string;
}

const StudentTeacherChat: React.FC = () => {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const [roomId, setRoomId] = useState<string>("");
  console.log("roomId", roomId);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  console.log("messages", messages);

  const { data } = useGetChatDetailsQuery();

  const { _id, role } = useAppSelector((state: RootState) => state.user.user);

  const { socket } = useSocket();

  useEffect(() => {
    if (roomId && socket) {
      socket.emit("joinBookingChat", roomId);
      console.log(`Joined booking room with bookingId: ${roomId}`);
      socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [roomId, socket]);

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudentId(studentId);
    if (role === "TEACHER") {
      setRoomId(studentId + _id);
    } else if (role === "STUDENT") {
      setRoomId(_id + studentId);
    } else {
      setRoomId("");
    }
  };

  const handleSend = () => {
    if (input.trim() === "") return;
    const newMessage: Message = {
      text: input,
      sender: role === "TEACHER" ? "TEACHER" : "STUDENT",
    };
    console.log(newMessage);
    // setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket.emit("sendMessage", roomId, newMessage);
    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "90vh",
        margin: "1% auto",
        width: "70%",
      }}
    >
      {/* Students List */}
      <div
        style={{
          width: "30%",
          borderRight: "1px solid #ccc",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <h3 style={{ textAlign: "center" }}>Students</h3>
        {data?.data?.map((student) => (
          <div
            key={student._id}
            onClick={() => handleStudentSelect(student._id)}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor:
                selectedStudentId === student._id ? "#007bff" : "transparent",
              color: selectedStudentId === student._id ? "white" : "black",
              transition: "background-color 0.3s",
            }}
          >
            {student.name}
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div style={{ width: "70%", padding: "10px" }}>
        <div
          style={{
            padding: "10px",
            borderBottom: "1px solid #ccc",
            backgroundColor: "#007bff",
            color: "white",
            textAlign: "center",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          Chat with{" "}
          {selectedStudentId
            ? data?.data?.find((student) => student._id === selectedStudentId)
                ?.name
            : "Student"}
        </div>

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
                  message.sender === "TEACHER" && role === "TEACHER"
                    ? "flex-end"
                    : message.sender === "STUDENT" && role === "STUDENT"
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor:
                    message.sender === "TEACHER" && role === "TEACHER"
                      ? "#007bff"
                      : message.sender === "STUDENT" && role === "STUDENT"
                      ? "#007bff"
                      : "#e0e0e0",
                  color:
                    message.sender === "TEACHER" && role === "TEACHER"
                      ? "white"
                      : message.sender === "STUDENT" && role === "STUDENT"
                      ? "white"
                      : "black",
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
        {selectedStudentId && (
          <div style={{ display: "flex", marginTop: "10px" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flexGrow: 1,
                padding: "10px",
                borderRadius: "20px",
                border: "1px solid #ccc",
                outline: "none",
              }}
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              style={{
                marginLeft: "10px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTeacherChat;
