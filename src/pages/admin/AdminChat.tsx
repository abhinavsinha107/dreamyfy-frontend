import React, { useState } from 'react';

// Interface for message structure
interface Message {
    text: string;
    sender: 'user' | 'admin';
}

// Interface for user structure
interface User {
    id: string;
    name: string;
    approved: boolean; // Added approved status for each user
}

// Sample users with approval status and their messages
let sampleUsers: User[] = [
    { id: '1', name: 'Alice', approved: true },
    { id: '2', name: 'Bob', approved: false }, // Bob's session is not approved
    { id: '3', name: 'Charlie', approved: true },
];

const sampleMessages: Record<string, Message[]> = {
    '1': [
        { text: 'Hello, I need help with my account.', sender: 'user' },
        { text: 'Sure, how can I assist you?', sender: 'admin' },
    ],
    '2': [
        { text: 'I have a question about billing.', sender: 'user' },
        { text: 'Let me check that for you.', sender: 'admin' },
    ],
    '3': [
        { text: 'Can I reset my password?', sender: 'user' },
        { text: 'Yes, I can help with that.', sender: 'admin' },
    ],
};

const AdminChat: React.FC = () => {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [pendingUserId, setPendingUserId] = useState<string | null>(null);

    // Function to handle user selection
    const handleUserSelect = (userId: string) => {
        const selectedUser = sampleUsers.find(user => user.id === userId);

        if (selectedUser) {
            if (!selectedUser.approved) {
                // Open the modal for approval
                setPendingUserId(userId);
                setIsModalOpen(true);
                return;
            }
            setSelectedUserId(userId);
            setMessages(sampleMessages[userId] || []); // Load messages for selected user
        }
    };

    // Function to approve the user session
    const handleApproveSession = () => {
        if (pendingUserId) {
            const updatedUsers = sampleUsers.map(user =>
                user.id === pendingUserId ? { ...user, approved: true } : user
            );
            // Update users array (this could also be managed in a more complex state)
            sampleUsers = updatedUsers;

            setSelectedUserId(pendingUserId);
            setMessages(sampleMessages[pendingUserId] || []); // Load messages for selected user
            setIsModalOpen(false); // Close the modal
        }
    };

    // Function to send a new message
    const handleSend = () => {
        if (input.trim() === '') return;

        const newMessage: Message = { text: input, sender: 'admin' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Simulate user response after 1 second
        setTimeout(() => {
            const userMessage: Message = { text: 'User response goes here...', sender: 'user' };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
        }, 1000);

        setInput(''); // Clear input field
    };

    return (
        <div style={{ display: 'flex', height: '90vh', margin: '1% auto', width: '70%' }}>
            {/* Users List */}
            <div style={{
                width: '30%',
                borderRight: '1px solid #ccc',
                padding: '10px',
                backgroundColor: '#f0f0f0'
            }}>
                <h3 style={{ textAlign: 'center' }}>Chat Requests</h3>
                {sampleUsers.map(user => (
                    <div key={user.id} onClick={() => handleUserSelect(user.id)} style={{
                        padding: '10px',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        backgroundColor: selectedUserId === user.id ? '#007bff' : 'transparent',
                        color: selectedUserId === user.id ? 'white' : 'black',
                        transition: 'background-color 0.3s',
                    }}>
                        {user.name}
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
                    Chat with {selectedUserId ? sampleUsers.find(user => user.id === selectedUserId)?.name : 'User'}
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
                            justifyContent: message.sender === 'admin' ? 'flex-end' : 'flex-start',
                            marginBottom: '10px',
                        }}>
                            <div style={{
                                maxWidth: '70%',
                                padding: '10px',
                                borderRadius: '10px',
                                backgroundColor: message.sender === 'admin' ? '#007bff' : '#e0e0e0',
                                color: message.sender === 'admin' ? 'white' : 'black',
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
                {selectedUserId && (
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

            {/* Modal for session approval */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        minWidth: '300px',
                        textAlign: 'center',
                    }}>
                        <h3>Session Approval Required</h3>
                        <p>You need to approve the session for {pendingUserId ? sampleUsers.find(user => user.id === pendingUserId)?.name : ''} to chat.</p>
                        <button onClick={handleApproveSession} style={{
                            margin: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}>
                            Approve Session
                        </button>
                        <button onClick={() => setIsModalOpen(false)} style={{
                            margin: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminChat;
