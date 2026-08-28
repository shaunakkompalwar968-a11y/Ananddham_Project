// --- 1. Mobile Hamburger Menu Logic ---
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
const menuIcon = menuBtn.querySelector('i');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    if(navLinks.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

// --- 2. Close Menu on Link Click (For Mobile) ---
function closeMenu() {
    if(window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

// --- 3. Sticky Header Color Change on Scroll ---
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- 4. Scroll Animation Logic (Intersection Observer) ---
document.addEventListener("DOMContentLoaded", function() {
    const reveals = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.15, // Trigger animation when element is 15% visible on screen
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});

// --- 5. Interactive Review Stars & Form Submission ---
const starElements = document.querySelectorAll('#rating-stars .fa-star');
let selectedRating = 0; // Variable to store the user's selected rating

// Helper function to color the stars
function highlightStars(rating) {
    starElements.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        if (starValue <= rating) {
            star.style.color = '#FF8F00'; // Orange for selected
        } else {
            star.style.color = '#d1d5db'; // Gray for unselected
        }
    });
}

// Make sure stars start out gray on page load
highlightStars(0);

if (starElements.length > 0) {
    starElements.forEach(star => {
        // Light up stars when hovering over them
        star.addEventListener('mouseover', (e) => {
            const hoverValue = parseInt(e.target.getAttribute('data-value'));
            highlightStars(hoverValue);
        });

        // Revert back to clicked rating when mouse moves away
        star.addEventListener('mouseout', () => {
            highlightStars(selectedRating);
        });

        // Lock in the rating on click
        star.addEventListener('click', (e) => {
            selectedRating = parseInt(e.target.getAttribute('data-value'));
            highlightStars(selectedRating);
        });
    });
}

// Handle the "Submit Review" Button Click
const submitReviewBtn = document.querySelector('.btn-submit-review');
const reviewerNameInput = document.getElementById('reviewerName');
const reviewDescInput = document.getElementById('reviewDesc');

if (submitReviewBtn) {
    submitReviewBtn.addEventListener('click', () => {
        const name = reviewerNameInput.value.trim();
        const desc = reviewDescInput.value.trim();

        // 1. Validation: Ensure all fields are filled
        if (selectedRating === 0) {
            alert("Please select a star rating.");
            return;
        }
        if (name === "") {
            alert("Please enter your name.");
            return;
        }
        if (desc === "") {
            alert("Please share your experience in the description box.");
            return;
        }

        // 2. Capture the Data 
        const reviewData = {
            rating: selectedRating,
            name: name,
            description: desc,
            date: new Date().toLocaleDateString()
        };
        
        console.log("New Review Ready to Save:", reviewData);

        // 3. Show Success State on the Button
        const originalText = submitReviewBtn.innerText;
        submitReviewBtn.innerText = "Submitted Successfully! ✓";
        submitReviewBtn.style.backgroundColor = "var(--primary-green)";
        submitReviewBtn.style.pointerEvents = "none"; // Prevent double clicks

        // 4. Reset the form after 2 seconds
        setTimeout(() => {
            reviewerNameInput.value = "";
            reviewDescInput.value = "";
            selectedRating = 0;
            
            // Reset stars visually back to gray
            highlightStars(0);

            // Revert button back to normal
            submitReviewBtn.innerText = originalText;
            submitReviewBtn.style.backgroundColor = "var(--accent-orange)";
            submitReviewBtn.style.pointerEvents = "auto";
            
            alert("Thank you for your feedback, " + name + "!");
        }, 2000);
    });
}

// --- 6. AI Chatbot Logic ---
const chatContainer = document.getElementById('ai-chat-container');
const chatToggleBtn = document.getElementById('ai-chat-toggle');
const closeChatBtn = document.getElementById('close-chat');
const chatMessages = document.getElementById('ai-chat-messages');
const userInput = document.getElementById('ai-user-input');
const sendBtn = document.getElementById('send-ai-msg');

// Knowledge Base for Anand Dham 
const farmKnowledgeBase = [
    {
        keywords: ['package', 'packages', 'price', 'pricing', 'cost', 'fee', 'charge', 'दर', 'पॅकेज', 'किंमत'],
        reply: "We offer 2 main packages:<br>• <strong>1-Day Agro Picnic:</strong> ₹450 / adult (9:00 AM – 6:00 PM, includes breakfast, buffet lunch, high tea, and ride access)<br>• <strong>Overnight Cottage Stay:</strong> ₹750 / person (Check-in: 12 PM, Check-out: 10 AM, includes private cottage, 4 meals, and campfire)."
    },
    {
        keywords: ['timing', 'timings', 'time', 'open', 'hours', 'वेळ', 'कधी', 'timeing'],
        reply: "We are open <strong>all 7 days</strong> of the week! Day tour timings are from <strong>9:00 AM to 6:00 PM</strong>. Prior booking is mandatory."
    },
    {
        keywords: ['food', 'meal', 'lunch', 'breakfast', 'menu', 'non-veg', 'veg', 'जेवण', 'खाद्य', 'dinner'],
        reply: "We serve authentic traditional Chulha meals including Pithla-Bhakri, Thecha, and organic farm-fresh vegetarian & non-vegetarian dishes!"
    },
    {
        keywords: ['location', 'address', 'reach', 'where', 'map', 'पत्ता', 'कुठे', 'how to reach'],
        reply: "We are located at: <strong>Sitakhandi talav, Bhokar, Bachoti kamp, Maharashtra 431745</strong>. You can click the Map icon on the bottom right for Google Maps directions!"
    },
    {
        keywords: ['activity', 'activities', 'attraction', 'attractions', 'rides', 'games', 'खेळ', 'मजा', 'pool', 'swimming'],
        reply: "Our attractions include: Swimming pool & Rain dance, Horse rides & Forest safaris, Boating, Mango orchards, Traditional games (Lagori, Viti-Dandu), and Night Campfires."
    },
    {
        keywords: ['book', 'booking', 'contact', 'phone', 'call', 'whatsapp', 'नोंदणी', 'संपर्क', 'number'],
        reply: "You can book directly via WhatsApp or phone at <strong>+91 82082 19849</strong> or email <strong>bookings@ananddham.com</strong>."
    }
];

// Open / Close toggle
if (chatToggleBtn) {
    chatToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        chatContainer.style.display = (chatContainer.style.display === 'flex') ? 'none' : 'flex';
        if (chatContainer.style.display === 'flex') {
            userInput.focus();
        }
    });
}

if (closeChatBtn) {
    closeChatBtn.addEventListener('click', () => {
        chatContainer.style.display = 'none';
    });
}

// Append messages
function appendMessage(text, sender) {
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg', sender === 'user' ? 'user-msg' : 'bot-msg');
    msgDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Response generator
function getBotResponse(query) {
    const cleaned = query.toLowerCase();
    
    for (const entry of farmKnowledgeBase) {
        if (entry.keywords.some(kw => cleaned.includes(kw))) {
            return entry.reply;
        }
    }

    return "Thank you for reaching out! For custom requests or urgent group bookings, you can directly message us on WhatsApp at <a href='https://wa.me/918208219849' target='_blank' style='color:#2E7D32; font-weight:bold;'>+91 82082 19849</a>.";
}

// Handle sending messages
function handleSendMessage() {
    if (!userInput) return;
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage(message, 'user');
    userInput.value = '';

    setTimeout(() => {
        const reply = getBotResponse(message);
        appendMessage(reply, 'bot');
    }, 450);
}

if (sendBtn) {
    sendBtn.addEventListener('click', handleSendMessage);
}
if (userInput) {
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });
}

function sendQuickPrompt(promptText) {
    if (userInput) {
        userInput.value = promptText;
        handleSendMessage();
    }
}
