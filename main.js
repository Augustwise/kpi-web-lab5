// Main JavaScript file for KPI Web Lab 5

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('KPI Web Lab 5 - JavaScript loaded successfully!');
    
    // Get DOM elements
    const clickBtn = document.getElementById('clickBtn');
    const message = document.getElementById('message');
    
    // Counter for button clicks
    let clickCount = 0;
    
    // Array of motivational messages
    const messages = [
        'Great job! Keep learning! 🎉',
        'You\'re doing amazing! 🌟',
        'Web development is fun! 💻',
        'Keep up the excellent work! 🚀',
        'You\'re a coding star! ⭐',
        'Learning never stops! 📚',
        'Code with passion! ❤️',
        'You\'re building the future! 🏗️'
    ];
    
    // Function to handle button clicks
    function handleButtonClick() {
        clickCount++;
        
        // Get random message
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Update message content
        message.textContent = `${randomMessage} (Click #${clickCount})`;
        
        // Show the message with animation
        message.classList.add('show');
        
        // Add some visual feedback to the button
        clickBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickBtn.style.transform = 'scale(1)';
        }, 150);
        
        console.log(`Button clicked ${clickCount} times`);
    }
    
    // Add event listener to button
    if (clickBtn) {
        clickBtn.addEventListener('click', handleButtonClick);
    }
    
    // Function to update current time
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        console.log(`Current time: ${timeString}`);
    }
    
    // Update time every 10 seconds (just for demonstration)
    setInterval(updateTime, 10000);
    
    // Initial time log
    updateTime();
    
    // Function to demonstrate hot reload
    function demonstrateHotReload() {
        console.log('Hot reload is working! This message updates when you save changes.');
        
        // Add a subtle animation to the page when loaded
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
    
    // Call demonstration function
    demonstrateHotReload();
    
    // Add some interactivity to feature list items
    const featureItems = document.querySelectorAll('.features li');
    featureItems.forEach((item, index) => {
        item.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
        item.style.padding = '10px';
        item.style.borderRadius = '5px';
        item.style.margin = '2px 0';
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.backgroundColor = '#e3f2fd';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = 'transparent';
        });
    });
});

// Export functions for potential testing or external use
export {
    // Could export functions here if needed
};