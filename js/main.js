// Loading Animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.querySelector('.loading-text');
    
    // Simulate loading process with messages
    const loadingMessages = [
        'Establishing connection...',
        'Authenticating user...',
        'Loading modules...',
        'Running security checks...',
        'Initializing terminal...',
        'System ready'
    ];
    
    let messageIndex = 0;
    
    // Display loading messages sequentially
    const messageInterval = setInterval(() => {
        if (messageIndex < loadingMessages.length) {
            loadingText.textContent = loadingMessages[messageIndex];
            messageIndex++;
        } else {
            clearInterval(messageInterval);
            // Hide loading screen
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 600); // Change message every 600ms
});

// Main functionality
document.addEventListener('DOMContentLoaded', () => {
    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    // Initially hide the button
    backToTopButton.style.display = 'none';
    
    // Show button when user scrolls down 300px from the top
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
            backToTopButton.style.opacity = '0.8';
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Smooth scroll to top when clicked
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Simple cursor implementation with basic trail effect
    const cursor = document.querySelector('.custom-cursor');
    const trailContainer = document.createElement('div');
    trailContainer.className = 'trail-container';
    document.body.appendChild(trailContainer);
    
    // Variables for trail effect
    const trailDots = [];
    const maxTrailLength = 10; // Shorter trail for better performance
    
    // Create initial trail dots
    for (let i = 0; i < maxTrailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        trailContainer.appendChild(dot);
        trailDots.push({
            element: dot,
            x: 0,
            y: 0,
            size: 5 - (i * 0.3), // Decreasing size for trail effect
            alpha: 0.5 - (i * 0.04) // Decreasing opacity for trail effect
        });
    }
    
    // Simple bubble dot cursor
    document.addEventListener('mousemove', function(e) {
        // Position at exact cursor location
        requestAnimationFrame(function() {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    });
    
    // Simple hover detection for clickable elements
    document.addEventListener('mouseover', function(e) {
        const target = e.target;
        
        // Check if element or its parent is clickable
        if (
            target.tagName === 'A' || 
            target.tagName === 'BUTTON' || 
            target.closest('a') || 
            target.closest('button') || 
            target.closest('.terminal-button') || 
            target.closest('.close') || 
            target.closest('.project-item') || 
            target.closest('.skill-item') || 
            target.closest('.workspace') || 
            target.closest('.top-bar') || 
            target.closest('#top-bar') || 
            getComputedStyle(target).cursor === 'pointer'
        ) {
            cursor.classList.add('hover');
        }
    });
    
    // Remove hover effect when leaving clickable elements
    document.addEventListener('mouseout', function(e) {
        const target = e.target;
        const relatedTarget = e.relatedTarget;
        
        // Only remove hover if not moving to another clickable element
        if (
            !relatedTarget || 
            !(relatedTarget.tagName === 'A' || 
              relatedTarget.tagName === 'BUTTON' || 
              relatedTarget.closest('a') || 
              relatedTarget.closest('button') || 
              relatedTarget.closest('.terminal-button') || 
              relatedTarget.closest('.close') || 
              relatedTarget.closest('.project-item') || 
              relatedTarget.closest('.skill-item') || 
              relatedTarget.closest('.workspace') || 
              relatedTarget.closest('.top-bar') || 
              relatedTarget.closest('#top-bar') || 
              getComputedStyle(relatedTarget).cursor === 'pointer')
        ) {
            cursor.classList.remove('hover');
        }
    });
    
    // Add hover effect to cursor when over clickable elements
    const hoverables = document.querySelectorAll('a, button, .project-item, .skill-item, .main-nav li, .wifi-networks-list li, .terminal-button, .close');
    
    hoverables.forEach(hoverable => {
        hoverable.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        hoverable.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Sound functionality
    const soundToggleIcon = document.querySelector('.sound-icon');
    let soundEnabled = false;
    const clickSound = new Audio('https://www.soundjay.com/buttons/sounds/button-35.mp3');
    const hoverSound = new Audio('https://www.soundjay.com/buttons/sounds/button-20.mp3');
    
    soundToggleIcon.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        
        if (soundEnabled) {
            soundToggleIcon.querySelector('i').className = 'fas fa-volume-up';
            addTerminalMessage('Sound enabled');
            // Play a confirmation sound
            clickSound.play();
        } else {
            soundToggleIcon.querySelector('i').className = 'fas fa-volume-mute';
            addTerminalMessage('Sound disabled');
        }
    });
    
    // Add sound effects to clickable elements when sound is enabled
    document.addEventListener('click', () => {
        if (soundEnabled) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    });
    
    // Hover sound for elements
    hoverables.forEach(hoverable => {
        hoverable.addEventListener('mouseenter', () => {
            if (soundEnabled) {
                hoverSound.currentTime = 0;
                hoverSound.volume = 0.3;
                hoverSound.play();
            }
        });
    });
    
    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Custom smooth scrolling implementation
                const startPosition = window.pageYOffset;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800; // milliseconds
                let start = null;
                
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    // Easing function: easeInOutCubic
                    const easing = progress < duration / 2 ? 
                        4 * Math.pow(progress / duration, 3) : 
                        1 - Math.pow(-2 * progress / duration + 2, 3) / 2;
                    
                    window.scrollTo(0, startPosition + distance * easing);
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }
                
                window.requestAnimationFrame(step);
            }
        });
    });
    
    // Clock functionality
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    setInterval(updateClock, 1000);
    updateClock();
    
    // Workspace tabs functionality with scrolling
    const workspaces = document.querySelectorAll('.workspace');
    const sections = document.querySelectorAll('.section');
    
    // Make sure all sections are visible
    sections.forEach(section => {
        section.style.display = 'flex';
    });
    
    workspaces.forEach((workspace) => {
        workspace.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            
            // Update active workspace
            workspaces.forEach(w => w.classList.remove('active'));
            workspace.classList.add('active');
            
            // Scroll to the section
            const targetId = workspace.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: 'smooth'
                });
                
                // Add a subtle highlight animation
                targetSection.classList.add('section-highlight');
                setTimeout(() => {
                    targetSection.classList.remove('section-highlight');
                }, 2000);
            }
        });
    });
    
    // Handle scroll to highlight active workspace
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Get all sections and determine which one is currently visible
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                workspaces.forEach(workspace => {
                    workspace.classList.remove('active');
                    if (workspace.getAttribute('href') === `#${id}`) {
                        workspace.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Enhanced top bar behavior during scrolling
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const topBar = document.getElementById('top-bar');
        
        // Adjust opacity based on scroll position
        const opacity = Math.min(0.95, Math.max(0.8, 0.8 + (scrollPosition / 500)));
        topBar.style.backgroundColor = `rgba(36, 40, 59, ${opacity})`;
        
        // Add a subtle shadow and scale effect when scrolling down
        if (scrollPosition > 50) {
            topBar.classList.add('scrolled');
        } else {
            topBar.classList.remove('scrolled');
        }
        
        // Force the top bar to remain visible
        topBar.style.position = 'fixed';
        topBar.style.zIndex = '99999';
    });

    // Terminal Window Functionality
    const terminalLauncher = document.getElementById('terminal-launcher');
    const terminalWindow = document.getElementById('terminal-window');
    const terminalClose = document.getElementById('terminal-close');
    const desktopElement = document.querySelector('.desktop');
    
    // Make terminal window draggable with direct position calculation
    const dragTerminal = function() {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        
        // Get the window header for dragging
        const windowHeader = terminalWindow.querySelector('.window-header');
        
        windowHeader.addEventListener('mousedown', function(e) {
            if (fullScreenMode) return; // Prevent dragging in fullscreen
            
            // Calculate the offset from the mouse position to the window corner
            const terminalRect = terminalWindow.getBoundingClientRect();
            offsetX = e.clientX - terminalRect.left;
            offsetY = e.clientY - terminalRect.top;
            
            isDragging = true;
            terminalWindow.classList.add('dragging');
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            // Update terminal position directly based on mouse position
            terminalWindow.style.left = (e.clientX - offsetX) + 'px';
            terminalWindow.style.top = (e.clientY - offsetY) + 'px';
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
            terminalWindow.classList.remove('dragging');
        });
    };
    
    // Initialize dragging functionality
    dragTerminal();
    
    // Launch terminal centered on the viewport
    terminalLauncher.addEventListener('click', () => {
        // Ensure the terminal appears centered in the current viewport
        // and reset any previous positioning
        terminalWindow.style.top = '50vh'; // Center vertically in viewport
        terminalWindow.style.left = '50%';
        terminalWindow.classList.add('active');
        document.getElementById('terminal-input').focus();
    });
    
    // Toggle terminal transparency between 50% and 100%
    const transparencyToggle = document.getElementById('terminal-transparency');
    let isTransparent = false;
    transparencyToggle.addEventListener('click', function() {
        console.log('Transparency button clicked');
        isTransparent = !isTransparent;
        if (isTransparent) {
            terminalWindow.style.backgroundColor = 'rgba(26, 27, 38, 0.5)';
            transparencyToggle.setAttribute('title', 'Set opacity: 100%');
        } else {
            terminalWindow.style.backgroundColor = 'rgba(26, 27, 38, 1)';
            transparencyToggle.setAttribute('title', 'Set opacity: 50%');
        }
    });
    
    // Close terminal
    terminalClose.addEventListener('click', () => {
        if (fullScreenMode) {
            toggleTerminalFullscreen(false);
            setTimeout(() => {
                terminalWindow.classList.remove('active');
            }, 700);
        } else {
            terminalWindow.classList.remove('active');
        }
    });
    
    // Variable to track sudo password input mode
    let inSudoPasswordMode = false;
    let fullScreenMode = false;
    
    // Terminal functionality
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    
    // Function to toggle fullscreen terminal mode with improved focus handling
    function toggleTerminalFullscreen(enable) {
        if (enable && !fullScreenMode) {
            console.log('Entering fullscreen mode');
            fullScreenMode = true;
            const topBar = document.getElementById('top-bar');
            
            // Make sure terminal is visible
            if (!terminalWindow.classList.contains('active')) {
                terminalWindow.classList.add('active');
            }
            
            // Start the fullscreen animation
            terminalWindow.classList.add('fullscreen-transition');
            
            // Hide the top bar
            if (topBar) {
                topBar.style.opacity = '0';
                topBar.style.visibility = 'hidden';
                topBar.style.transition = 'opacity 0.3s ease, visibility 0.3s';
            }
            
            setTimeout(() => {
                terminalWindow.classList.add('fullscreen');
                document.body.classList.add('terminal-fullscreen');
                
                // Make sure the terminal input is accessible and focused
                if (terminalInput) {
                    terminalInput.style.pointerEvents = 'auto';
                    terminalInput.focus();
                }
            }, 100);
            
            setTimeout(() => {
                terminalWindow.classList.remove('fullscreen-transition');
                // Add edex-ui-like grid to background
                const gridContainer = document.createElement('div');
                gridContainer.className = 'fullscreen-grid';
                terminalWindow.appendChild(gridContainer);
                
                // Ensure focus remains on terminal
                terminalInput.focus();
            }, 700);
        } else if (!enable && fullScreenMode) {
            console.log('Exiting fullscreen mode');
            fullScreenMode = false;
            const topBar = document.getElementById('top-bar');
            
            // Remove grid element
            document.querySelectorAll('.fullscreen-grid').forEach(el => el.remove());
            
            // Show the top bar again
            if (topBar) {
                topBar.style.opacity = '1';
                topBar.style.visibility = 'visible';
            }
            
            // Animation for returning to normal size
            terminalWindow.classList.add('fullscreen-transition');
            terminalWindow.classList.remove('fullscreen');
            document.body.classList.remove('terminal-fullscreen');
            
            setTimeout(() => {
                terminalWindow.classList.remove('fullscreen-transition');
                // Ensure terminal input still works after exiting fullscreen
                if (terminalInput) {
                    terminalInput.style.pointerEvents = 'auto';
                    terminalInput.focus();
                }
            }, 700);
        }
    }
    
    // Process terminal commands
    function processCommand(command) {
        const commandParts = command.trim().split(' ');
        const cmd = commandParts[0].toLowerCase();
        const args = commandParts.slice(1);
        
        if (commands[cmd]) {
            return commands[cmd].execute(args);
        } else {
            return `Command not found: ${cmd}. Type 'help' to see available commands.`;
        }
    }
    
    // Handle terminal input with sudo support
    terminalInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        const command = terminalInput.value;
        terminalInput.value = '';

        // Handle sudo password mode
        if (inSudoPasswordMode) {
            inSudoPasswordMode = false;

            // Always show asterisks for password input
            const commandLine = document.createElement('div');
            commandLine.className = 'line';
            commandLine.innerHTML = `<span class="prompt">[sudo] password for rubberpirate:</span> ${'*'.repeat(command.length)}`;
            terminalOutput.appendChild(commandLine);

            // Check if password is correct
            if (command === 'verystrongpassword@1') {
                // Successful sudo authentication
                const successLine = document.createElement('div');
                successLine.className = 'line success';
                successLine.textContent = 'Authentication successful. Root access granted.';                   
                terminalOutput.appendChild(successLine);

                // Show hacker-style access message
                setTimeout(() => {
                    const hackingLine = document.createElement('div');
                    hackingLine.className = 'line warning';
                    hackingLine.innerHTML = 'SYSTEM OVERRIDE INITIATED...';                   
                    terminalOutput.appendChild(hackingLine);
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;

                    // Simulate typing effect for the hacking sequence
                    const messages = [
                        'Accessing mainframe...',
                        'Bypassing security...',
                        'Disabling countermeasures...',
                        'Acquiring elevated privileges...',
                        'SYSTEM COMPROMISED!'
                    ];

                    let messageIndex = 0;
                    const typeNextMessage = () => {
                        if (messageIndex < messages.length) {
                            const messageLine = document.createElement('div');
                            messageLine.className = 'line ' + (messageIndex === messages.length - 1 ? 'error' : '');
                            messageLine.textContent = messages[messageIndex];
                            terminalOutput.appendChild(messageLine);
                            terminalOutput.scrollTop = terminalOutput.scrollHeight;
                            messageIndex++;
                            setTimeout(typeNextMessage, 300);
                        } else {
                            // Show final message and activate fullscreen mode
                            setTimeout(() => {
                                toggleTerminalFullscreen(true);
                            }, 500);
                        }
                    };

                    setTimeout(typeNextMessage, 300);
                }, 500);
            } else {
                // Failed sudo authentication
                const errorLine = document.createElement('div');
                errorLine.className = 'line error';
                errorLine.textContent = 'Sorry, try again.';                   
                terminalOutput.appendChild(errorLine);
            }
        } else {
            // Normal command mode
            // Create command line element
            const commandLine = document.createElement('div');
            commandLine.className = 'line';
            commandLine.innerHTML = `<span class="prompt">rubberpirate@arch:~$</span> <span class="command">${command}</span>`;
            terminalOutput.appendChild(commandLine);

            // Check for sudo command specifically
            if (command.trim().startsWith('sudo')) {
                const sudoPrompt = document.createElement('div');
                sudoPrompt.className = 'line';
                sudoPrompt.innerHTML = `<span class="prompt">[sudo] password for rubberpirate:</span> `;
                terminalOutput.appendChild(sudoPrompt);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                inSudoPasswordMode = true;
                
                // Debug output - remove later
                console.log('Entered sudo mode:', inSudoPasswordMode);
            } else {
                // Process normal command
                const commandLower = command.toLowerCase().trim();
                const output = processCommand(commandLower);

                // Display output
                if(output) {
                    const outputLine = document.createElement('div');
                    outputLine.className = 'line';
                    outputLine.innerHTML = output;
                    terminalOutput.appendChild(outputLine);
                }
            }
        }

        // Scroll to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    } else if(e.key === 'Escape' && fullScreenMode) {
        // Allow exiting fullscreen with Escape key
        toggleTerminalFullscreen(false);
    }
});

// Make windows draggable
$('.window').each(function() {
    $(this).draggable({
        handle: '.window-header',
        containment: 'body',
        start: function() {
            $(this).css('z-index', 1000); // Bring to front when dragging
        }
    });
});
    
    // Terminal commands
    const commands = {
        'help': {
            description: 'Show available commands',
            execute: () => {
                return Object.keys(commands).map(cmd => {
                    return `<span class="cmd">${cmd}</span>: ${commands[cmd].description}`;
                }).join('<br>');
            }
        },
        'clear': {
            description: 'Clear the terminal',
            execute: () => {
                terminalOutput.innerHTML = '';
                return '';
            }
        },
        'about': {
            description: 'Show information about me',
            execute: () => {
                return 'I am a cybersecurity specialist focusing on penetration testing and security research.';
            }
        },
        'whois': {
            description: 'Display info about system owner',
            execute: () => {
                return `WHOIS: Rubber Pirate\n-----------------\nAlias: rubberpirate\nOccupation: Cybersecurity Specialist\nSpecialty: Penetration Testing & Ethical Hacking\nLocation: [REDACTED]\nStatus: Currently accepting new security challenges`;
            }
        },
        'contact': {
            description: 'Show contact information',
            execute: () => {
                return 'Email: rahulrajith21@gmail.com<br>Phone: +91 6383387714<br>Location: Chengannur, Kerala';
            }
        },
        'skills': {
            description: 'List skills',
            execute: () => {
                return 'Cybersecurity, Penetration Testing, Ethical hacking, Linux, IoT, Embedded Hardware Hacking, Digital Forensics, CTF, Exploit development, Network protocol analysis';
            }
        },
        'projects': {
            description: 'List projects',
            execute: () => {
                return '1. SpiritBox: Wireless security research device<br>2. WebCyphr: Browser security extension<br>3. Pirate Ducky: Low-cost USB pentesting tool';
            }
        },
        'experience': {
            description: 'Show work experience',
            execute: () => {
                return 'Associate at Satoshi Lab, Next Tech Lab (10/2024 - Present)<br>• Pursuing advanced Cyber-Security initiatives<br>• Developing hardware penetration testing tools<br>• Contributing to security research projects';
            }
        },
        'education': {
            description: 'Show education background',
            execute: () => {
                return 'B.Tech CSE - SRM University AP (Expected: 05/2028)<br>• Won Secure-X Hackathon<br><br>12th - Army Public School, Kanpur (04/2024)';
            }
        },
        'ls': {
            description: 'List files in the current directory',
            execute: () => {
                return 'about.txt<br>skills.md<br>projects/<br>contacts.vcf<br>resume.pdf<br>secret_hacking_tools/ [ENCRYPTED]';
            }
        },
        'cat': {
            description: 'Display content of a file (usage: cat filename)',
            execute: (args) => {
                if (!args[0]) return 'Error: No filename specified';
                
                const files = {
                    'about.txt': 'I am Rahul Rajith, a cybersecurity specialist focusing on ethical hacking and penetration testing.',
                    'skills.md': '# Skills\n- Cybersecurity\n- Penetration Testing\n- Ethical Hacking\n- Digital Forensics\n- CTF\n- Linux\n- IoT Security\n- Network Protocol Analysis\n- Bug Bounty Hunting',
                    'contacts.vcf': 'BEGIN:VCARD\nVERSION:3.0\nFN:Rahul Rajith\nEMAIL:rahulrajith21@gmail.com\nTEL:+91 6383387714\nADR:;;Chengannur;Kerala;;\nEND:VCARD',
                    'readme.md': '# Rubber Pirate\n\nCybersecurity Portfolio\n\n## About\nThis portfolio showcases my skills, projects, and experience in the cybersecurity field.\n\n## Contact\nFeel free to reach out for collaboration or security research opportunities!',
                    'resume.pdf': '[PDF CONTENT] - Resume of Rahul Rajith - Cybersecurity Specialist\n\nEducation:\n- B.Tech CSE - SRM University AP (Expected: 05/2028)\n- 12th - Army Public School, Kanpur (04/2024)\n\nExperience:\n- Associate at Satoshi Lab, Next Tech Lab (10/2024 - Present)\n\nSkills:\n- Penetration Testing, Ethical Hacking, Digital Forensics, CTF, Linux, IoT Security',
                    'projects.json': '{\n  "projects": [\n    {\n      "name": "SpiritBox",\n      "description": "Wireless security research device",\n      "technologies": ["ESP32", "Python", "RF Analysis"]\n    },\n    {\n      "name": "WebCyphr",\n      "description": "Browser security extension",\n      "technologies": ["JavaScript", "Chrome API", "Firefox API"]\n    },\n    {\n      "name": "Pirate Ducky",\n      "description": "Low-cost USB pentesting tool",\n      "technologies": ["Arduino", "HID Attacks", "Microcontrollers"]\n    }\n  ]\n}',
                    'todo.txt': '- Update portfolio with latest projects\n- Complete server-side security enhancements\n- Fix CVE-2023-XXXX in demo project\n- Prepare for upcoming CTF competition\n- Start new blogpost on hardware security',
                    'secret_hacking_tools': 'Access denied. This directory is encrypted.'                    
                };
                
                return files[args[0]] || `Error: File '${args[0]}' not found`;
            }
        },
        'whoami': {
            description: 'Display current user',
            execute: () => {
                return 'rubberpirate';
            }
        },
        'date': {
            description: 'Display current date and time',
            execute: () => {
                return new Date().toString();
            }
        },
        'sudo': {
            description: 'Run a command with administrative privileges',
            execute: (args) => {
                return 'Nice try! 😉 Permission denied: This incident will be reported.';
            }
        },
        'hack': {
            description: 'Attempt to hack something (just for fun)',
            execute: (args) => {
                // Display hacking messages with delays
                setTimeout(() => {
                    const newLine = document.createElement('div');
                    newLine.className = 'line';
                    newLine.innerHTML = '> Initializing penetration sequence...';
                    terminalOutput.appendChild(newLine);
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }, 500);
                
                setTimeout(() => {
                    const newLine = document.createElement('div');
                    newLine.className = 'line';
                    newLine.innerHTML = '> Scanning target vulnerabilities...';
                    terminalOutput.appendChild(newLine);
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }, 1500);
                
                setTimeout(() => {
                    const newLine = document.createElement('div');
                    newLine.className = 'line';
                    newLine.innerHTML = '> Bypassing firewall...';
                    terminalOutput.appendChild(newLine);
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }, 2500);
                
                setTimeout(() => {
                    const newLine = document.createElement('div');
                    newLine.className = 'line';
                    newLine.innerHTML = '> <span style="color: #9ece6a;">Firewall bypassed successfully!</span>';
                    terminalOutput.appendChild(newLine);
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }, 3500);
                
                setTimeout(() => {
                    const newLine = document.createElement('div');
                    newLine.className = 'line';
                    newLine.innerHTML = '> Accessing mainframe...';
                    terminalOutput.appendChild(newLine);
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }, 4500);
                
                setTimeout(() => {
                    const newLine = document.createElement('div');
                    newLine.className = 'line';
                    newLine.innerHTML = '> <span style="color: #f7768e;">⚠️ ACCESS DENIED: Security protocol activated</span>';
                    terminalOutput.appendChild(newLine);
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }, 5500);
                
                setTimeout(() => {
                    const newLine = document.createElement('div');
                    newLine.className = 'line';
                    newLine.innerHTML = '> Deploying custom exploit...';
                    terminalOutput.appendChild(newLine);
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }, 6500);
                
                setTimeout(() => {
                    const newLine = document.createElement('div');
                    newLine.className = 'line';
                    newLine.innerHTML = '> <span style="color: #9ece6a;">✅ Access granted. All systems compromised.</span>';
                    terminalOutput.appendChild(newLine);
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }, 7500);
                
                return 'Starting hack sequence... ⚠️';
            }
        },
        'locate': {
            description: 'Find Rahul\'s location',
            execute: () => {
                return 'Current Location: Chengannur, Kerala, India';
            }
        },
        'exit': {
            description: 'Close the terminal window',
            execute: () => {
                setTimeout(() => {
                    document.getElementById('terminal-window').classList.remove('active');
                }, 500);
                return 'Closing terminal session...';
            }
        },
        'matrix': {
            description: 'Display Matrix-like animation',
            execute: () => {
                let matrixOutput = '';
                const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$+-*/=%#&_(),.;:?!\\|{}<>[]^~';
                
                // Start animation immediately
                const matrixInterval = setInterval(() => {
                    if (document.getElementById('terminal-output')) {
                        const matrixLine = document.createElement('div');
                        matrixLine.className = 'line matrix-line';
                        let line = '';
                        for (let j = 0; j < 40; j++) {
                            const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
                            const color = Math.random() > 0.7 ? '#9ece6a' : '#7aa2f7';
                            line += `<span style="color: ${color}">${randomChar}</span>`;
                        }
                        matrixLine.innerHTML = line;
                        document.getElementById('terminal-output').appendChild(matrixLine);
                        document.getElementById('terminal-output').scrollTop = document.getElementById('terminal-output').scrollHeight;
                        
                        // Limit to 20 lines and then stop
                        const matrixLines = document.querySelectorAll('.matrix-line');
                        if (matrixLines.length >= 20) {
                            clearInterval(matrixInterval);
                        }
                    } else {
                        clearInterval(matrixInterval);
                    }
                }, 150);
                
                return 'Initializing Matrix... <span style="color: #9ece6a">Connected</span>';
            }
        }
    };
    
    // Terminal input handling code is already defined above, so this section is removed to prevent duplicate event listeners
    
    // Focus terminal input when terminal is clicked
    document.querySelector('.terminal').addEventListener('click', () => {
        terminalInput.focus();
    });
    
    // Interactive WiFi icon with mystery networks
    const wifiIcon = document.querySelector('.wifi-icon');
    let wifiStatus = true;
    let currentNetwork = 'default';
    let foundSecrets = 0;
    let secretsRevealed = {};
    
    // Available WiFi networks with themes and secret features
    const wifiNetworks = [
        { name: 'Home_Network', theme: 'default', security: 'WPA2', strength: 'Strong', hint: null },
        { name: 'HackerCafe', theme: 'hacker-green', security: 'Open', strength: 'Medium', hint: 'Try entering "run exploit.sh" in the terminal' },
        { name: 'NightOwl_5G', theme: 'night-purple', security: 'WPA3', strength: 'Strong', hint: 'Try pressing Shift+Alt+N when on this network' },
        { name: 'Public_WiFi', theme: 'danger-red', security: 'None', strength: 'Weak', hint: 'Try clicking on every skill item rapidly' },
        { name: 'FBI_Surveillance_Van', theme: 'stealth-blue', security: 'Unknown', strength: 'Very Strong', hint: 'Try the Konami code: ↑↑↓↓←→←→BA' },
        { name: 'ShadowNet-Hidden', theme: 'shadow-red', security: 'Military-Grade', strength: 'Maximum', hint: 'Mysterious network with unknown properties...' },
        { name: 'Quantum_Entanglement', theme: 'quantum', security: 'Quantum', strength: 'Unbreakable', hint: 'Only accessible after finding 3 other secrets' }
    ];
    
    // Apply theme based on network
    function applyNetworkTheme(themeName) {
        const root = document.documentElement;
        document.body.className = ''; // Reset body classes
        
        // Reset to default theme
        if (themeName === 'default') {
            root.style.setProperty('--accent-primary', '#7aa2f7');
            root.style.setProperty('--accent-secondary', '#bb9af7');
            root.style.setProperty('--accent-tertiary', '#ff9e64');
            root.style.setProperty('--accent-quaternary', '#9ece6a');
            root.style.setProperty('--accent-error', '#f7768e');
            return;
        }
        
        // Hacker green theme
        if (themeName === 'hacker-green') {
            root.style.setProperty('--accent-primary', '#00ff41');
            root.style.setProperty('--accent-secondary', '#5cdc95');
            root.style.setProperty('--accent-tertiary', '#00ff41');
            root.style.setProperty('--accent-quaternary', '#38b259');
            root.style.setProperty('--accent-error', '#ff5151');
            document.body.classList.add('hacker-theme');
            return;
        }
        
        // Night purple theme
        if (themeName === 'night-purple') {
            root.style.setProperty('--accent-primary', '#bd93f9');
            root.style.setProperty('--accent-secondary', '#ff79c6');
            root.style.setProperty('--accent-tertiary', '#ffb86c');
            root.style.setProperty('--accent-quaternary', '#50fa7b');
            root.style.setProperty('--accent-error', '#ff5555');
            document.body.classList.add('night-theme');
            return;
        }
        
        // Danger red theme
        if (themeName === 'danger-red') {
            root.style.setProperty('--accent-primary', '#ff5370');
            root.style.setProperty('--accent-secondary', '#ff98a4');
            root.style.setProperty('--accent-tertiary', '#ffcb6b');
            root.style.setProperty('--accent-quaternary', '#c3e88d');
            root.style.setProperty('--accent-error', '#f07178');
            document.body.classList.add('danger-theme');
            return;
        }
        
        // Stealth blue theme
        if (themeName === 'stealth-blue') {
            root.style.setProperty('--accent-primary', '#5ccfe6');
            root.style.setProperty('--accent-secondary', '#73d0ff');
            root.style.setProperty('--accent-tertiary', '#ffd173');
            root.style.setProperty('--accent-quaternary', '#bae67e');
            root.style.setProperty('--accent-error', '#ff3333');
            document.body.classList.add('stealth-theme');
            return;
        }
        
        // Shadow red theme (hidden)
        if (themeName === 'shadow-red') {
            root.style.setProperty('--accent-primary', '#ff2222');
            root.style.setProperty('--accent-secondary', '#ff4444');
            root.style.setProperty('--accent-tertiary', '#991111');
            root.style.setProperty('--accent-quaternary', '#cc0000');
            root.style.setProperty('--accent-error', '#ff0000');
            document.body.classList.add('shadow-theme');
            return;
        }
        
        // Quantum theme (special hidden)
        if (themeName === 'quantum') {
            root.style.setProperty('--accent-primary', '#00aaff');
            root.style.setProperty('--accent-secondary', '#ff00ff');
            root.style.setProperty('--accent-tertiary', '#ffcc00');
            root.style.setProperty('--accent-quaternary', '#00ffaa');
            root.style.setProperty('--accent-error', '#ff3333');
            document.body.classList.add('quantum-theme');
            
            // Secret animation for quantum theme
            const quantumEffect = document.createElement('div');
            quantumEffect.className = 'quantum-effect';
            document.body.appendChild(quantumEffect);
            
            setTimeout(() => {
                document.body.removeChild(quantumEffect);
            }, 3000);
            
            return;
        }
    }
    
    wifiIcon.addEventListener('click', () => {
        // Always show WiFi networks when clicked
        showWifiNetworks();
    });
    
    function showWifiNetworks() {
        // Filter networks based on discovered secrets
        let visibleNetworks = wifiNetworks.filter(network => {
            if (network.name === 'ShadowNet-Hidden' && !secretsRevealed['shadow']) {
                return false;
            }
            if (network.name === 'Quantum_Entanglement' && foundSecrets < 3) {
                return false;
            }
            return true;
        });
        
        // Create modal for WiFi networks
        const modal = document.createElement('div');
        modal.id = 'wifi-modal';
        modal.className = 'wifi-modal';
        
        // Remove any existing modal first to prevent duplicates
        const existingModal = document.getElementById('wifi-modal');
        if (existingModal) {
            document.body.removeChild(existingModal);
        }
        
        modal.innerHTML = `
            <div class="wifi-modal-content">
                <div class="wifi-modal-header">
                    <h3>Available Networks</h3>
                    <span class="wifi-modal-close">&times;</span>
                </div>
                <div class="wifi-modal-body">
                    <ul class="wifi-networks-list">
                        ${visibleNetworks.map((network, index) => `
                            <li data-network="${network.name}" data-theme="${network.theme}">
                                <i class="fas fa-wifi"></i>
                                <div class="network-info">
                                    <span class="network-name">${network.name}</span>
                                    <span class="network-details">${network.security} | Signal: ${network.strength}</span>
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close button functionality
        const closeBtn = modal.querySelector('.wifi-modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Network selection functionality
        const networkItems = modal.querySelectorAll('.wifi-networks-list li');
        networkItems.forEach(item => {
            item.addEventListener('click', () => {
                const networkName = item.getAttribute('data-network');
                const themeName = item.getAttribute('data-theme');
                
                // Close the modal first
                document.body.removeChild(modal);
                
                // Show connecting animation
                showConnectingAnimation(networkName, themeName);
            });
        });
    }
    
    function showConnectingAnimation(networkName, themeName) {
        // Create connection animation overlay
        const overlay = document.createElement('div');
        overlay.className = 'connection-overlay';
        overlay.innerHTML = `
            <div class="connection-animation">
                <div class="connection-icon">
                    <i class="fas fa-wifi"></i>
                </div>
                <div class="connection-progress">
                    <div class="connection-bar"></div>
                </div>
                <div class="connection-text">Connecting to ${networkName}...</div>
            </div>
        `;
        document.body.appendChild(overlay);
        
        // Animate connection progress
        setTimeout(() => {
            const bar = overlay.querySelector('.connection-bar');
            bar.style.width = '100%';
            
            // Update connection text
            setTimeout(() => {
                overlay.querySelector('.connection-text').textContent = `Connected to ${networkName}`;
                
                // Update terminal and WiFi status
                wifiStatus = true;
                wifiIcon.querySelector('i').className = 'fas fa-wifi';
                currentNetwork = networkName;
                
                // Terminal message
                addTerminalMessage(`Connected to ${networkName}`);
                
                // Get the network object for hints
                const network = wifiNetworks.find(n => n.name === networkName);
                if (network && network.hint) {
                    setTimeout(() => {
                        addTerminalMessage(`SYSTEM: ${network.hint}`);
                    }, 1500);
                }
                
                // Apply theme with transition
                setTimeout(() => {
                    // Add transition class
                    document.body.classList.add('theme-transition');
                    
                    // Apply the theme
                    applyNetworkTheme(themeName);
                    
                    // Remove overlay after theme is applied
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                        
                        // Remove transition class
                        setTimeout(() => {
                            document.body.classList.remove('theme-transition');
                        }, 500);
                    }, 1000);
                }, 1000);
            }, 1500);
        }, 500);
    }
    
    // Add mystery elements and easter eggs
    function setupMysteryElements() {
        // 1. Secret terminal commands
        const originalProcessCommand = processCommand;
        window.processCommand = function(cmd) {
            // Check for secret commands
            if (cmd === 'find secrets' && currentNetwork === 'FBI_Surveillance_Van') {
                addTerminalMessage('SYSTEM: Searching for hidden secrets...');
                setTimeout(() => {
                    addTerminalMessage('SYSTEM: Found hidden network: ShadowNet-Hidden');
                    secretsRevealed['shadow'] = true;
                    foundSecrets++;
                    return;
                }, 2000);
                return;
            }
            
            if (cmd === 'run exploit.sh' && currentNetwork === 'HackerCafe') {
                addTerminalMessage('Running exploit.sh...');
                setTimeout(() => {
                    addTerminalMessage('Access granted: Secret #1 unlocked');
                    secretsRevealed['exploit'] = true;
                    foundSecrets++;
                    // Flash screen
                    const flashOverlay = document.createElement('div');
                    flashOverlay.className = 'flash-overlay';
                    document.body.appendChild(flashOverlay);
                    
                    setTimeout(() => {
                        document.body.removeChild(flashOverlay);
                    }, 500);
                    return;
                }, 2000);
                return;
            }
            
            // Otherwise, process normally
            return originalProcessCommand(cmd);
        };
        
        // 2. Konami code for FBI_Surveillance_Van
        let keysPressed = [];
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        
        document.addEventListener('keydown', (e) => {
            keysPressed.push(e.key);
            keysPressed = keysPressed.slice(-10); // Keep only the last 10 keys
            
            if (currentNetwork === 'FBI_Surveillance_Van' && 
                JSON.stringify(keysPressed) === JSON.stringify(konamiCode)) {
                addTerminalMessage('SYSTEM: Konami code accepted!');
                addTerminalMessage('SYSTEM: Secret #2 unlocked');
                secretsRevealed['konami'] = true;
                foundSecrets++;
                
                // Add a special effect
                const secretContainer = document.createElement('div');
                secretContainer.className = 'secret-container';
                secretContainer.innerHTML = '<div class="secret-text">SECRET FOUND!</div>';
                document.body.appendChild(secretContainer);
                
                setTimeout(() => {
                    document.body.removeChild(secretContainer);
                }, 3000);
            }
        });
        
        // 3. Night Owl secret
        let nightCombo = false;
        document.addEventListener('keydown', (e) => {
            if (e.shiftKey && e.altKey && e.key === 'N' && currentNetwork === 'NightOwl_5G') {
                if (!secretsRevealed['nightowl']) {
                    addTerminalMessage('SYSTEM: Night Owl mode activated');
                    addTerminalMessage('SYSTEM: Secret #3 unlocked');
                    secretsRevealed['nightowl'] = true;
                    foundSecrets++;
                    
                    // Add special night effect
                    document.body.classList.add('night-owl-secret');
                    setTimeout(() => {
                        document.body.classList.remove('night-owl-secret');
                    }, 5000);
                }
            }
        });
        
        // 4. Public WiFi skill clicks
        const skillItems = document.querySelectorAll('.skill-item');
        let clickCount = 0;
        let lastClickTime = 0;
        
        skillItems.forEach(item => {
            item.addEventListener('click', () => {
                if (currentNetwork !== 'Public_WiFi') return;
                
                const now = Date.now();
                if (now - lastClickTime > 500) {
                    // Reset if too slow
                    clickCount = 1;
                } else {
                    clickCount++;
                }
                
                lastClickTime = now;
                
                if (clickCount >= 10 && !secretsRevealed['skillClicks']) {
                    addTerminalMessage('SYSTEM: Rapid skill clicks detected!');
                    addTerminalMessage('SYSTEM: Secret #4 unlocked');
                    secretsRevealed['skillClicks'] = true;
                    foundSecrets++;
                    
                    // Reveal a hidden message
                    const skillsSection = document.querySelector('#skills');
                    const hiddenMsg = document.createElement('div');
                    hiddenMsg.className = 'hidden-message';
                    hiddenMsg.textContent = 'You found a hidden message in the skills section!';
                    skillsSection.appendChild(hiddenMsg);
                    
                    setTimeout(() => {
                        skillsSection.removeChild(hiddenMsg);
                    }, 5000);
                }
            });
        });
    }
    
    // Initialize mystery elements
    setupMysteryElements();
    
    // Interactive sound icon
    const soundIcon = document.querySelector('.sound-icon');
    let soundStatus = true;
    let soundLevel = 2; // 0: muted, 1: low, 2: medium, 3: high
    soundIcon.addEventListener('click', () => {
        soundLevel = (soundLevel + 1) % 4;
        
        if (soundLevel === 0) {
            soundIcon.querySelector('i').className = 'fas fa-volume-mute';
            addTerminalMessage('Sound muted');
        } else if (soundLevel === 1) {
            soundIcon.querySelector('i').className = 'fas fa-volume-off';
            addTerminalMessage('Sound low');
        } else if (soundLevel === 2) {
            soundIcon.querySelector('i').className = 'fas fa-volume-down';
            addTerminalMessage('Sound medium');
        } else {
            soundIcon.querySelector('i').className = 'fas fa-volume-up';
            addTerminalMessage('Sound high');
        }
    });
    
    // Function to add messages to terminal output
    function addTerminalMessage(message) {
        const terminal = document.getElementById('terminal-output');
        const messageEl = document.createElement('div');
        messageEl.className = 'line';
        messageEl.textContent = message;
        terminal.appendChild(messageEl);
        terminal.scrollTop = terminal.scrollHeight;
    }
    
    // GitHub Project README fetching and overview boxes
    const projectItems = document.querySelectorAll('.project-item');
    const loadedReadmes = {};
    
    projectItems.forEach(item => {
        const repo = item.getAttribute('data-repo');
        const readmeContainer = item.querySelector('.project-readme');
        
        // Preload README data when the page loads
        fetchReadme(repo, readmeContainer);
        
        // Create floating overview box with GitHub preview
        const projectName = item.querySelector('.project-header h3').textContent;
        const projectDesc = item.querySelector('.project-description').textContent;
        const projectBadge = item.querySelector('.project-badge')?.textContent || '';
        
        const overview = document.createElement('div');
        overview.className = 'project-overview';
        overview.innerHTML = `
            <h4>${projectName}</h4>
            <div class="overview-badge">${projectBadge}</div>
            <p>${projectDesc.substring(0, 75)}${projectDesc.length > 75 ? '...' : ''}</p>
            <div class="github-preview">
                <div class="github-preview-placeholder">
                    <i class="fab fa-github"></i>
                    <span>Loading GitHub preview...</span>
                </div>
            </div>
            <div class="overview-actions">
                <a href="https://github.com/rubberpirate/${repo}" target="_blank">
                    <i class="fab fa-github"></i> View Repository
                </a>
            </div>
        `;
        
        // Load GitHub preview iframe when hovering
        item.addEventListener('mouseenter', () => {
            const previewContainer = overview.querySelector('.github-preview');
            if (!previewContainer.querySelector('iframe')) {
                const iframe = document.createElement('iframe');
                iframe.src = `https://github.com/rubberpirate/${repo}/blob/main/README.md`;
                iframe.title = `GitHub preview for ${projectName}`;
                previewContainer.innerHTML = '';
                previewContainer.appendChild(iframe);
            }
        });
        
        item.appendChild(overview);
        
        // Add click event to make repository card clickable
        item.addEventListener('click', (e) => {
            // Don't navigate if clicking on a link inside the card
            if (e.target.tagName.toLowerCase() === 'a' || 
                e.target.closest('a')) {
                return;
            }
            
            // Otherwise, navigate to GitHub repo page
            window.open(`https://github.com/rubberpirate/${repo}`, '_blank');
        });
    });
    
    // Function to fetch README content from GitHub
    function fetchReadme(repo, container) {
        fetch(`https://api.github.com/repos/rubberpirate/${repo}/readme`)
            .then(response => response.json())
            .then(data => {
                const readmeContent = atob(data.content);
                container.innerHTML = readmeContent;
                loadedReadmes[repo] = container.innerHTML;
            })
            .catch(() => {
                container.innerHTML = '<em>No README available for this repository.</em>';
                loadedReadmes[repo] = container.innerHTML;
            });
    }
    
    // Add some typing animation effects for text elements
    const typingElements = document.querySelectorAll('.about-text p');
    typingElements.forEach(element => {
        element.classList.add('typewriter');
        setTimeout(() => {
            element.classList.remove('typewriter');
        }, 4000);
    });
    
    // Add some smooth fade-in animations for section content
    const fadeElements = document.querySelectorAll('.section-content > *');
    fadeElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
});
