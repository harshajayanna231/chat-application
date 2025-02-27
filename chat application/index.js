const firebaseConfig = {
    apiKey: "AIzaSyCrtXIwInyexs0GY_osB_GIMVIzixCFe7I",
    authDomain: "chat-application-485a7.firebaseapp.com",
    projectId: "chat-application-485a7",
    storageBucket: "chat-application-485a7.firebasestorage.app",
    messagingSenderId: "123703017681",
    appId: "1:123703017681:web:7a4f795e5532f7b47085f0",
    measurementId: "G-9M6G2R6NDL"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages"); // Fixed ID reference

sendButton.addEventListener("click", async () => {
    const message = messageInput.value;
    if (message.trim()) {
        try {
            await db.collection('messages').add({
                text: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp() // Fixed method name
            });
            messageInput.value = '';
        } catch (e) {
            console.error("Error adding document:", e);
        }
    }
});

db.collection("messages")
    .orderBy("timestamp")
    .onSnapshot((querySnapshot) => {
        chatMessages.innerHTML = ''; // Ensure container is cleared before adding new messages
        querySnapshot.forEach((doc) => {
            const messageData = doc.data();
            const messageElement = document.createElement("div");
            messageElement.textContent = messageData.text;
            messageElement.style.padding = "5px";
            messageElement.style.borderBottom = "1px solid #ddd";
            chatMessages.appendChild(messageElement);
        });
    });