import React, { useState } from 'react';

// Interface for message structure
interface Message {
    text: string;
    sender: 'student' | 'teacher';
}

// Interface for student structure
interface Student {
    id: string;
    name: string;
}

// Sample students and their messages
let sampleStudents: Student[] = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' },
];

const sampleMessages: Record<string, Message[]> = {
    '1': [
        { text: 'Hello, I need help with the assignment.', sender: 'student' },
        { text: 'Sure, how can I assist you?', sender: 'teacher' },
    ],
    '2': [
        { text: 'Can you explain this concept again?', sender: 'student' },
        { text: 'Of course! Let me walk you through it.', sender: 'teacher' },
    ],
    '3': [
        { text: 'What is the deadline for the project?', sender: 'student' },
        { text: 'The deadline is next Friday.', sender: 'teacher' },
    ],
};

const StudentTeacherChat: React.FC = () => {
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    // Function to handle student selection
    const handleStudentSelect = (studentId: string) => {
        setSelectedStudentId(studentId);
        setMessages(sampleMessages[studentId] || []); // Load messages for selected student
    };

    // Function to send a new message
    const handleSend = () => {
        if (input.trim() === '') return;

        const newMessage: Message = { text: input, sender: 'teacher' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Simulate student response after 1 second
        setTimeout(() => {
            const studentMessage: Message = { text: 'Student response goes here...', sender: 'student' };
            setMessages((prevMessages) => [...prevMessages, studentMessage]);
        }, 1000);

        setInput(''); // Clear input field
    };

    return (
        <div style={{ display: 'flex', height: '90vh', margin: '1% auto', width: '70%' }}>
            {/* Students List */}
            <div style={{
                width: '30%',
                borderRight: '1px solid #ccc',
                padding: '10px',
                backgroundColor: '#f0f0f0'
            }}>
                <h3 style={{ textAlign: 'center' }}>Students</h3>
                {sampleStudents.map(student => (
                    <div key={student.id} onClick={() => handleStudentSelect(student.id)} style={{
                        padding: '10px',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        backgroundColor: selectedStudentId === student.id ? '#007bff' : 'transparent',
                        color: selectedStudentId === student.id ? 'white' : 'black',
                        transition: 'background-color 0.3s',
                    }}>
                        {student.name}
                    </div>
                ))}
            </div>

            {/* Chat Area */}
            <div style={{ width: '70%', padding: '10px' }}>
                <div style={{
                    padding: '10px',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textAlign: 'center',
                    borderRadius: '5px',
                    marginBottom: '10px',
                }}>
                    Chat with {selectedStudentId ? sampleStudents.find(student => student.id === selectedStudentId)?.name : 'Student'}
                </div>

                {/* Chat Messages */}
                <div style={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    padding: '10px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '10px',
                    backgroundColor: '#f9f9f9',
                    marginBottom: '10px',
                    height: '60vh'
                }}>
                    {messages.map((message, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            justifyContent: message.sender === 'teacher' ? 'flex-end' : 'flex-start',
                            marginBottom: '10px',
                        }}>
                            <div style={{
                                maxWidth: '70%',
                                padding: '10px',
                                borderRadius: '10px',
                                backgroundColor: message.sender === 'teacher' ? '#007bff' : '#e0e0e0',
                                color: message.sender === 'teacher' ? 'white' : 'black',
                                textAlign: 'left',
                                wordWrap: 'break-word',
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            }}>
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat Input and Send Button */}
                {selectedStudentId && (
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={{
                                flexGrow: 1,
                                padding: '10px',
                                borderRadius: '20px',
                                border: '1px solid #ccc',
                                outline: 'none'
                            }}
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={handleSend}
                            style={{
                                marginLeft: '10px',
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '20px',
                                cursor: 'pointer'
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
