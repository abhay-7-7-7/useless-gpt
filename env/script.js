let currentScreen = 'main';
      let searchMode = false;
      let calcExpression = '';
      let calcDisplay = '0';
      let timerSeconds = 0;
      let timerInterval = null;
      let timerRunning = false;
      const bugs = [
        "Feature, not a bug 😎",
        "You're holding it wrong 💀",
        "Send help... or snacks 🍕",
        "No bugs here, only vibes 🌈"
      ];

      // AI responses
      const aiResponses = {
        roast: [
          "Your question is almost as disappointing as your haircut 🔥",
          "I've seen smarter questions from a potato 🥔",
          "Did you really think before typing that? Because it doesn't show 💀",
          "Your brain cells called, they want a refund 🧠",
          "That question hit different... differently terrible 😤"
        ],
        baby: [
          "Goo goo ga ga! 👶",
          "Waaahhhhh! Me no understand big words! 😭",
          "Mama mama dada dada! 🍼",
          "Me want cookie! 🍪",
          "Peek-a-boo! Me see you! 👀"
        ],
        conspiracy: [
          "WAKE UP SHEEPLE! The answer is obviously the lizard people 🦎",
          "That's exactly what THEY want you to think... 👁️",
          "The truth is hidden in plain sight, but you're not ready 🛸",
          "The government doesn't want you to know about this 🏛️",
          "Everything is connected... follow the breadcrumbs 🍞"
        ],
        sadboy: [
          "Why does everything hurt so much... 😢",
          "Nobody understands my pain... *sighs dramatically* 💔",
          "Life is just endless suffering... 🖤",
          "Your question reminds me of my ex... now I'm crying 😭",
          "The world is dark and full of terrors... just like my soul 🌧️"
        ]
      };

      // Initialize app
      document.addEventListener('DOMContentLoaded', function() {
        initEventListeners();
        showScreen('main');
      });

      function initEventListeners() {
        // Main screen navigation
        document.querySelectorAll('.ai-card').forEach(card => {
          card.addEventListener('click', () => {
            const aiType = card.dataset.ai;
            if (aiType === 'minigames') {
              showScreen('minigames');
            } else {
              showScreen(aiType);
            }
          });
        });

        // Back buttons
        document.querySelectorAll('.back-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            showScreen('main');
            resetSearchMode();
          });
        });

        // Report bug button
        document.getElementById('report-bug').addEventListener('click', () => {
          alert(bugs[Math.floor(Math.random() * bugs.length)]);
        });

        // Search functionality
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('focus', () => {
          if (!searchMode) {
            enterSearchMode();
          }
        });

        searchInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        });

        document.querySelector('.search-btn').addEventListener('click', handleSearch);

        // Chat search functionality
        document.querySelectorAll('.chat-search-input').forEach(input => {
          input.addEventListener('focus', () => {
            enterChatSearchMode(input);
          });
          
          input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
              handleChatMessage(input);
            }
          });
        });

        // Sidebar navigation
        document.querySelectorAll('.sidebar-card').forEach(card => {
          card.addEventListener('click', () => {
            const aiType = card.dataset.ai;
            if (aiType === 'minigames') {
              showScreen('minigames');
            } else {
              showScreen(aiType);
            }
          });
        });

        // Game modal functionality
        document.getElementById('calculator-game').addEventListener('click', () => {
          document.getElementById('calculator-modal').style.display = 'block';
        });

        document.getElementById('timer-game').addEventListener('click', () => {
          document.getElementById('timer-modal').style.display = 'block';
        });

        // Modal close buttons
        document.querySelectorAll('.close').forEach(closeBtn => {
          closeBtn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
          });
        });

        // Calculator functionality
        document.querySelectorAll('.calc-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            handleCalculatorInput(btn.textContent);
          });
        });

        // Timer functionality
        document.getElementById('timer-start').addEventListener('click', startTimer);
        document.getElementById('timer-stop').addEventListener('click', stopTimer);
        document.getElementById('timer-reset').addEventListener('click', resetTimer);

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
          if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
          }
        });
      }

      function showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
          screen.classList.remove('active');
        });
        document.getElementById(screenName + '-screen').classList.add('active');
        currentScreen = screenName;
      }

      function enterSearchMode() {
        searchMode = true;
        const searchContainer = document.getElementById('search-container');
        const cardsContainer = document.getElementById('cards-container');
        
        searchContainer.classList.add('search-mode');
        cardsContainer.classList.add('slide-left');
      }

      function resetSearchMode() {
        searchMode = false;
        const searchContainer = document.getElementById('search-container');
        const cardsContainer = document.getElementById('cards-container');
        
        searchContainer.classList.remove('search-mode');
        cardsContainer.classList.remove('slide-left');
        document.getElementById('search-input').value = '';
      }

      function handleSearch() {
        const query = document.getElementById('search-input').value.trim();
        if (query) {
          // Just show a silly message for now
          alert(`Searching for "${query}"... Just kidding! Pick a card instead 😄`);
        }
      }

      function sendMessage(aiType) {
        const screen = document.getElementById(aiType + '-screen');
        const input = screen.querySelector('.chat-input');
        const messagesContainer = screen.querySelector('.chat-messages');
        
        const message = input.value.trim();
        if (!message) return;

        // Add user message
        addMessage(messagesContainer, message, 'user');
        input.value = '';

        // Add AI response after a delay
        setTimeout(() => {
          const responses = aiResponses[aiType];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          addMessage(messagesContainer, randomResponse, 'ai');
        }, 1000);
      }

      function addMessage(container, text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.textContent = text;
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
      }

      function handleCalculatorInput(input) {
        const display = document.getElementById('calc-display');
        
        if (input === 'C') {
          calcExpression = '';
          calcDisplay = '0';
        } else if (input === '=') {
          // Always give wrong answers!
          const wrongAnswers = [42, 69, 420, 1337, 9001, 404, 0.1, -1, 'ERROR', 'NOPE'];
          calcDisplay = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)].toString();
          calcExpression = '';
        } else {
          if (calcDisplay === '0' && !isNaN(input)) {
            calcDisplay = input;
          } else {
            calcDisplay += input;
          }
          calcExpression += input;
        }
        
        display.textContent = calcDisplay;
      }

      function startTimer() {
        if (!timerRunning) {
          timerRunning = true;
          timerInterval = setInterval(() => {
            // Make the timer completely useless by randomizing it
            timerSeconds += Math.random() > 0.5 ? 1 : -1;
            if (timerSeconds < 0) timerSeconds = 0;
            updateTimerDisplay();
          }, 1000);
        }
      }

      function stopTimer() {
        timerRunning = false;
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
      }

      function resetTimer() {
        stopTimer();
        timerSeconds = Math.floor(Math.random() * 100); // Random reset value
        updateTimerDisplay();
      }

      function updateTimerDisplay() {
        const minutes = Math.floor(Math.abs(timerSeconds) / 60);
        const seconds = Math.abs(timerSeconds) % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = display;
      }

      function enterChatSearchMode(input) {
        const container = input.closest('.chat-search-container');
        const welcomeMessage = input.closest('.welcome-message');
        
        // Animate search bar to bottom
        container.classList.add('search-mode');
        
        // Hide welcome message
        if (welcomeMessage) {
          welcomeMessage.style.display = 'none';
        }
      }

      function handleChatMessage(input) {
        const message = input.value.trim();
        if (!message) return;

        // Get the current AI type from the screen
        const screen = input.closest('.screen');
        const aiType = screen.id.replace('-screen', '');
        
        // Get messages container
        const messagesContainer = screen.querySelector('.chat-messages');
        
        // Clear welcome message if it exists
        const welcomeMessage = messagesContainer.querySelector('.welcome-message');
        if (welcomeMessage) {
          welcomeMessage.remove();
        }

        // Add user message
        addMessage(messagesContainer, message, 'user');
        input.value = '';

        // Add AI response after a delay
        setTimeout(() => {
          const responses = aiResponses[aiType];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          addMessage(messagesContainer, randomResponse, 'ai');
        }, 1000);
      }