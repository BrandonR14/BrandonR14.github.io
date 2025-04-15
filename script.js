// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all arcade buttons
    const arcadeButtons = document.querySelectorAll('.arcade-button');
    const actionButtons = document.querySelectorAll('.action-button');
    const joystick = document.querySelector('.joystick');
    const stick = document.querySelector('.stick');

    // Add click sound effect
    const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2579/2579-preview.mp3');
    clickSound.volume = 0.5;

    // Button hover effect
    arcadeButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });

    // Action button hover effect
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });

    // Joystick movement
    let isJoystickActive = false;

    joystick.addEventListener('mousedown', () => {
        isJoystickActive = true;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isJoystickActive) return;

        const joystickRect = joystick.getBoundingClientRect();
        const centerX = joystickRect.left + joystickRect.width / 2;
        const centerY = joystickRect.top + joystickRect.height / 2;

        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const distance = Math.min(
            Math.sqrt(
                Math.pow(e.clientX - centerX, 2) + 
                Math.pow(e.clientY - centerY, 2)
            ),
            joystickRect.width / 2
        );

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        stick.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });

    document.addEventListener('mouseup', () => {
        isJoystickActive = false;
        stick.style.transform = 'translate(-50%, -50%)';
    });

    // Menu navigation
    arcadeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.toLowerCase();
            
            // Add your menu navigation logic here
            switch(buttonText) {
                case 'play games':
                    console.log('Navigating to games section');
                    break;
                case 'view portfolio':
                    console.log('Navigating to portfolio section');
                    break;
                case 'about me':
                    console.log('Navigating to about section');
                    break;
            }
        });
    });

    // Add screen flicker effect
    const screen = document.querySelector('.screen');
    setInterval(() => {
        if (Math.random() > 0.95) {
            screen.style.opacity = '0.98';
            setTimeout(() => {
                screen.style.opacity = '1';
            }, 50);
        }
    }, 1000);
}); 