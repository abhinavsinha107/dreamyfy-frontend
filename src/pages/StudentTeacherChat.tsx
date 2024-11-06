import React, { useEffect, useState } from "react";
import { useGetChatDetailsQuery } from "../services/api";
import { useSocket } from "../provider/SocketProvider";
import { RootState, useAppSelector } from "../redux/store";
import { Container } from "@mui/material";

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
  
  const currentUser = useAppSelector((state: RootState) => state.user.user);

  const currentRole = currentUser?.role;
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
    <Container maxWidth="lg" className="my-5" style={{ display: 'flex', gap: 20, flexDirection: 'row' }}>
      {/* Students List */}
      <div
        style={{
          width: "30%",
          borderRight: "1px solid #ccc",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <h3 style={{ textAlign: "center" }}>{currentRole.toLowerCase() == 'student'?'Teachers':'Students'}</h3>
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
                : currentRole.toLowerCase() == 'student'?'Teacher':'Student'}
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
              key={student._id}
              onClick={() => handleStudentSelect(student._id)}
              className={`p-3 px-4 capitalize w-full cursor-pointer hover:text-white hover:bg-[#161e2f] transition-all duration-500 ${selectedStudentId === student._id ? 'bg-[#161e2f] text-white' : ''} border rounded-full`}
            >
              {student.name}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-8/12 bg-white rounded-lg overflow-hidden">
        <div className="p-3 px-5 bg-[#161e2f] text-white text-xl capitalize">
          Chat with{" "}
          {selectedStudentId
            ? data?.data?.find((student) => student._id === selectedStudentId)
              ?.name
            : "Student"}
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
                className="bg-[#161e2f] px-5 text-white rounded-full ml-3"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default StudentTeacherChat;
