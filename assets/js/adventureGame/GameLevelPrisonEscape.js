import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Npc from './Npc.js';

class Player {
  constructor(data) {
    this.data = data;
    this.x = data.INIT_POSITION.x;
    this.y = data.INIT_POSITION.y;
    this.speed = data.STEP_FACTOR;
    this.direction = "down";

    this.keys = {};
    window.addEventListener("keydown", (event) => this.keys[event.keyCode] = true);
    window.addEventListener("keyup", (event) => this.keys[event.keyCode] = false);

    this.startMovement();
  }

  getMovementDirection() {
    const { up, left, down, right } = this.data.keypress;

    if (this.keys[up] && this.keys[right]) return "upRight";
    if (this.keys[up] && this.keys[left]) return "upLeft";
    if (this.keys[down] && this.keys[right]) return "downRight";
    if (this.keys[down] && this.keys[left]) return "downLeft";
    if (this.keys[up]) return "up";
    if (this.keys[down]) return "down";
    if (this.keys[left]) return "left";
    if (this.keys[right]) return "right";
    
    return null;
  }

  move() {
    let direction = this.getMovementDirection();
    if (!direction) return;

    this.direction = direction;
    const moveDistance = this.speed / 60;

    switch (direction) {
      case "up": this.y -= moveDistance; break;
      case "down": this.y += moveDistance; break;
      case "left": this.x -= moveDistance; break;
      case "right": this.x += moveDistance; break;
      case "upRight": this.x += moveDistance * 0.7; this.y -= moveDistance * 0.7; break;
      case "upLeft": this.x -= moveDistance * 0.7; this.y -= moveDistance * 0.7; break;
      case "downRight": this.x += moveDistance * 0.7; this.y += moveDistance * 0.7; break;
      case "downLeft": this.x -= moveDistance * 0.7; this.y += moveDistance * 0.7; break;
    }
  }

  startMovement() {
    setInterval(() => this.move(), this.data.ANIMATION_RATE);
  }
}

class GameLevelPrisonEscape {
  constructor(path) {
    const width = (typeof GameEnv.getWidth === "function") ? GameEnv.getWidth() : window.innerWidth;
    const height = (typeof GameEnv.getHeight === "function") ? GameEnv.getHeight() : window.innerHeight;

    // Background
    const image_src_desert = `${path}/images/gamify/Prisonescapebackround.jpeg`;
    const image_data_desert = {
      name: 'Prison Escape',
      greeting: "Welcome to the Prison! It's miserable here. Your only job... GET OUT!",
      src: image_src_desert,
      pixels: { height: 168, width: 300 }
    };

    // Player data
    const sprite_src_chillguy = `${path}/assets/js/adventureGame/MC.png`;
    const CHILLGUY_SCALE_FACTOR = 5;
    const sprite_data_chillguy = {
      id: 'Chill Guy',
      greeting: "Hi, I am Chill Guy, Currently in prison, Unfortunately I need to break out!",
      src: sprite_src_chillguy,
      SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
      STEP_FACTOR: 8, 
      ANIMATION_RATE: 50,
      INIT_POSITION: { x: 0, y: height - (height / CHILLGUY_SCALE_FACTOR) },
      pixels: { height: 950, width: 644 },
      orientation: { rows: 4, columns: 4 },
      frameSize: { width: 161, height: 237 },
      movement: {
        down: { row: 0, start: 0, columns: 3 },
        downRight: { row: 1, start: 0, columns: 3 },
        downLeft: { row: 2, start: 0, columns: 3 },
        left: { row: 2, start: 0, columns: 3 },
        right: { row: 3, start: 0, columns: 3 },
        up: { row: 1, start: 0, columns: 3 },
        upLeft: { row: 2, start: 0, columns: 3 },
        upRight: { row: 1, start: 0, columns: 3 },
      },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 }
    };

    // NPC Data
    const npcs = [
      {
        id: 'Tux',
        greeting: "Hi, I am Tux, the Linux mascot. I am happy to spend some shell time with you!",
        src: `${path}/images/gamify/tux.png`,
        SCALE_FACTOR: 8,
        ANIMATION_RATE: 50,
        pixels: { height: 256, width: 352 },
        INIT_POSITION: { x: width / 2, y: height / 2 },
        orientation: { rows: 8, columns: 11 },
        down: { row: 5, start: 0, columns: 3 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 }
      },
      {
        id: 'Octocat',
        greeting: "Hi, I am Octocat! I am the GitHub collaboration mascot!",
        src: `${path}/images/gamify/octocat.png`,
        SCALE_FACTOR: 10,
        ANIMATION_RATE: 50,
        pixels: { height: 301, width: 801 },
        INIT_POSITION: { x: width / 4, y: height / 4 },
        orientation: { rows: 1, columns: 4 },
        down: { row: 0, start: 0, columns: 3 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 }
      },
      {
        id: 'Robot',
        greeting: "Hi, I am Robot, the Jupyter Notebook mascot!",
        src: `${path}/images/gamify/robot.png`,
        SCALE_FACTOR: 10,
        ANIMATION_RATE: 100,
        pixels: { height: 316, width: 627 },
        INIT_POSITION: { x: width * 3 / 4, y: height * 3 / 4 },
        orientation: { rows: 3, columns: 6 },
        down: { row: 1, start: 0, columns: 6 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 }
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
