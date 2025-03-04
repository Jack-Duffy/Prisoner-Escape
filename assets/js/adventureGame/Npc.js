import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Player from './Player.js';
import Character from './Character.js';
import Prompt from './Prompt.js';

// Npc Class
class Npc extends Character {
    constructor(data = null) {
        super(data);
        console.log("NPC Constructor - ID:", data ? data.id : "No ID", "Data:", data); // Debug
        this.quiz = data && data.quiz ? data.quiz.title : "No Quiz Title";
        this.questions = Array.isArray(data?.quiz?.questions) 
            ? (Prompt && typeof Prompt.shuffleArray === 'function' 
                ? Prompt.shuffleArray([...data.quiz.questions]) 
                : [...data.quiz.questions]) 
            : [];
        console.log("NPC Questions:", this.questions); // Debug
        this.currentQuestionIndex = 0;
        this.alertTimeout = null;
        this.bindEventListeners();
        this.correctAnswers = data && data.quiz && data.quiz.answers ? data.quiz.answers : [];
        // Ensure spriteData is set
        this.spriteData = data || {};
        console.log("NPC Position:", this.spriteData.INIT_POSITION); // Debug
    }

    update() {
        console.log("NPC Update - ID:", this.spriteData ? this.spriteData.id : "No ID"); // Debug
        this.draw();
    }

    bindEventListeners() {
        console.log("Binding NPC event listeners"); // Debug
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown({ key }) {
        console.log("NPC Key Down:", key); // Debug
        switch (key) {
            case 'e':
            case 'u':
                this.shareQuizQuestion();
                break;
        }
    }

    handleKeyUp({ key }) {
        console.log("NPC Key Up:", key); // Debug
        if (key === 'e' || key === 'u') {
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
            }
        }
    }

    getNextQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.questions.length;
        return question;
    }

    shareQuizQuestion() {
        const players = GameEnv.gameObjects.filter(obj => obj.state && obj.state.collisionEvents && obj.state.collisionEvents.includes(this.spriteData ? this.spriteData.id : ""));
        const hasQuestions = this.questions.length > 0;
        console.log("NPC Share Quiz - Players:", players.length, "Has Questions:", hasQuestions); // Debug
        if (players.length > 0 && hasQuestions) {
            players.forEach(player => {
                if (!Prompt.isOpen) {
                    Prompt.currentNpc = this;
                    console.log("Triggering Quiz:", this.quiz, this.getNextQuestion()); // Debug
                    alert(`${this.quiz}\n${this.getNextQuestion()}`); // Temporary test
                    // Prompt.openPromptPanel(this); // Uncomment when NPCs are visible
                }
            });
        }
    }
}

// GameLevelPrisonEscape Class
class GameLevelPrisonEscape {
    constructor(path) {
        console.log("GameLevelPrisonEscape Constructor - Path:", path); // Debug
        const width = (typeof GameEnv.getWidth === "function") ? GameEnv.getWidth() : window.innerWidth;
        const height = (typeof GameEnv.getHeight === "function") ? GameEnv.getHeight() : window.innerHeight;
        console.log("Screen Dimensions:", width, height); // Debug

        // Background data
        const image_data_desert = {
            name: 'Prison Escape',
            src: `${path}/images/gamify/Prisonescapebackround.jpeg`,
            pixels: { height: 168, width: 300 }
        };

        // Player Data
        const sprite_data_chillguy = {
            id: 'Chill Guy',
            src: `${path}/assets/js/adventureGame/MainCharecter.png`,
            SCALE_FACTOR: 10,
            STEP_FACTOR: 2000,
            ANIMATION_RATE: 10,
            INIT_POSITION: { x: 0, y: height - (height / 10) },
            pixels: { height: 760, width: 500 },
            orientation: { rows: 4, columns: 4 },
            frameSize: { width: 100, height: 190 },
            down: { row: 0, start: 0, columns: 3 },
            up: { row: 1, start: 0, columns: 3 },
            left: { row: 2, start: 0, columns: 3 },
            right: { row: 3, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 }
        };

        // NPC Data
        const npcs = [
            {
                id: 'Tux',
                src: `${path}/assets/js/adventureGame/Npc1.png`,
                SCALE_FACTOR: 8,
                ANIMATION_RATE: 50,
                pixels: { height: 224, width: 515 },
                INIT_POSITION: { x: 103, y: 92 },
                orientation: { rows: 3, columns: 7 },
                frameSize: { width: 73, height: 82 },
                down: { row: 1, start: 0, columns: 7 },
                hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
                quiz: {
                    title: "Programming Quiz",
                    questions: [
                        "Which of these is NOT a programming language?\n1. Python\n2. CSS\n3. Java\n4. C++",
                        "Which of these is a JavaScript data type?\n1. Integer\n2. Character\n3. Decimal\n4. String"
                    ],
                    answers: ['2', '4']
                }
            },
            {
                id: 'Octocat',
                src: `${path}/assets/js/adventureGame/PrisonerNPC.png`,
                SCALE_FACTOR: 10,
                ANIMATION_RATE: 50,
                pixels: { height: 146, width: 346 },
                INIT_POSITION: { x: width / 4, y: height / 4 },
                orientation: { rows: 1, columns: 3 },
                down: { row: 0, start: 0, columns: 3 },
                hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
                quiz: {
                    title: "Programming Quiz",
                    questions: [
                        "Which of these is NOT a programming language?\n1. Python\n2. CSS\n3. Java\n4. C++",
                        "Which of these is a JavaScript data type?\n1. Integer\n2. Character\n3. Decimal\n4. String"
                    ],
                    answers: ['2', '4']
                }
            }
        ];

        // Create objects for this level
        this.objects = [
            { class: Background, data: image_data_desert },
            { class: Player, data: sprite_data_chillguy },
            ...npcs.map(npc => {
                const npcInstance = new Npc(npc); // Instantiate NPCs here
                console.log("NPC Instance Created:", npc.id); // Debug
                return npcInstance;
            })
        ];
        console.log("Game Objects Initialized:", this.objects); // Debug

        // Temporary fallback to ensure screen renders
        this.initializeRendering();
    }

    initializeRendering() {
        console.log("Initializing Rendering"); // Debug
        try {
            const canvas = GameEnv.canvas || document.querySelector('canvas');
            const ctx = GameEnv.context || canvas?.getContext('2d');
            if (ctx) {
                ctx.fillStyle = 'gray'; // Fallback to confirm canvas works
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                console.log("Canvas filled with gray"); // Debug
                // Draw all objects manually as a test
                this.objects.forEach(obj => {
                    if (obj.update) obj.update();
                });
            } else {
                console.error("No canvas or context available");
            }
        } catch (error) {
            console.error("Rendering Initialization Error:", error);
        }
    }
}

export default GameLevelPrisonEscape;