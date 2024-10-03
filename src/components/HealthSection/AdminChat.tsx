import React, { useState } from 'react';
import Modal from 'react-modal';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const AdminChat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [sessionId, setSessionId] = useState<string>('');
    const [isSessionValid, setIsSessionValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true); // Modal open initially

    const handleSend = () => {
        if (input.trim() === '') return;

        // Add user's message to the chat
        const newMessage: Message = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Simulate bot response after 1 second
        setTimeout(() => {
            const botMessage: Message = { text: 'Hello! How can I assist you?', sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000);

        setInput(''); // Clear input field
    };

    const handleSessionValidation = async () => {
        setLoading(true);

        // Replace with your API endpoint for session validation
        const response = await fetch(`/api/validate-session/${sessionId}`);
        const isValid = response.ok;

        setIsSessionValid(isValid);
        setLoading(false);
        setIsModalOpen(false); // Close modal after validation

        if (!isValid) {
            alert('Invalid session ID. Please try again.');
        }
    };

    return (
        <div style={{
            width: '70%',
            height: '90vh',
            margin: '1% auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff'
        }}>
            <div style={{
                padding: '10px',
                borderBottom: '1px solid #ccc',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '10px 10px 0 0',
                textAlign: 'center',
                fontWeight: 'bold'
            }}>
                Chat with Admin
            </div>

            {/* Chat Messages */}
            <div style={{
                flexGrow: 1,
                overflowY: 'auto',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#f9f9f9',
                border: '1px solid #e0e0e0',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                marginBottom: '10px'
            }}>
                {messages.map((message, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                        marginBottom: '10px'
                    }}>
                        <div style={{
                            maxWidth: '70%',
                            padding: '10px',
                            borderRadius: '20px',
                            backgroundColor: message.sender === 'user' ? '#007bff' : '#e0e0e0',
                            color: message.sender === 'user' ? 'white' : 'black',
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
            {isSessionValid && (
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

            {/* Session ID Validation Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => {
                    // Only close modal if session is valid
                    if (isValid) {
                        setIsModalOpen(false);
                    }
                }}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        padding: '20px',
                        backgroundColor: '#f9f9f9',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    }
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Validate Session ID</h2>
                <input
                    type="text"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '20px',
                        border: '1px solid #ccc',
                        outline: 'none',
                        marginBottom: '10px'
                    }}
                    placeholder="Enter your session ID"
                />
                <button
                    onClick={handleSessionValidation}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                    disabled={loading}
                >
                    {loading ? 'Validating...' : 'Validate Session'}
                </button>
            </Modal>
        </div>
    );
};

export default AdminChat;
