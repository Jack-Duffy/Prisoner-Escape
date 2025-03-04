import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';

class GameLevelPrisonEscape {
  constructor(path) {
    const width = (typeof GameEnv.getWidth === "function") ? GameEnv.getWidth() : window.innerWidth;
    const height = (typeof GameEnv.getHeight === "function") ? GameEnv.getHeight() : window.innerHeight;

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

    // NPC Data (Greetings and reaction removed)
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
        },
        interact: function () {
          let quiz = new Quiz();
          quiz.initialize();
          quiz.openPanel(this.quiz);
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
        },
        interact: function () {
          let quiz = new Quiz();
          quiz.initialize();
          quiz.openPanel(this.quiz);
        }
      }
    ];

    // Create objects for this level
    this.objects = [
      { class: Background, data: image_data_desert },
      { class: Player, data: sprite_data_chillguy },
      ...npcs.map(npc => ({ class: Npc, data: npc }))
    ];
  }
}

export default GameLevelPrisonEscape;