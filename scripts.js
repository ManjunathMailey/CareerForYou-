// Toggle chatbot visibility
const chatIcon = document.getElementById('chat-icon');
const chatContainer = document.getElementById('chat-container');

chatIcon.addEventListener('click', () => {
    chatContainer.style.display = (chatContainer.style.display === 'none' || chatContainer.style.display === '') ? 'block' : 'none';
});

// Chatbot interactions (basic example)
const chatBox = document.getElementById('chat-box');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
    const userMessage = userInput.value;
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('user-message');
    userMessageElement.textContent = userMessage;
    chatMessages.appendChild(userMessageElement);
    userInput.value = ''; // Clear input field

    // Example bot response (you can replace this with actual AI or backend logic)
    const botResponse = document.createElement('div');
    botResponse.classList.add('bot-message');
    botResponse.textContent = 'Thank you for your message!';
    chatMessages.appendChild(botResponse);
});

// Payment form handling (Stripe example)
const paymentForm = document.getElementById('payment-form');

paymentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const amount = 1000; // Example amount in cents (e.g., $10.00)
    const currency = 'usd'; // Example currency (USD)
    const cardElement = elements.getElement('card');

    const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    });

    if (error) {
        console.error(error);
        // Handle error gracefully (e.g., display to user)
    } else {
        // Send payment method ID to server
        const response = await fetch('/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount,
                currency,
                source: paymentMethod.id,
                description: 'Example payment description',
            }),
        });

        const result = await response.json();
        console.log(result.message); // Log success/failure message
    }
});
