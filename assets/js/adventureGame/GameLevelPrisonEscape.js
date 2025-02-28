import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';

class GameLevelPrisonEscape {
  constructor(path) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // ✅ Fix: Ensure GameEnv methods exist or use fallback values
    const width = (typeof GameEnv.getWidth === "function") ? GameEnv.getWidth() : window.innerWidth;
    const height = (typeof GameEnv.getHeight === "function") ? GameEnv.getHeight() : window.innerHeight;

    // Background data
    const image_src_desert = `${path}/images/gamify/Prisonescapebackround.jpeg`;
    const image_data_desert = {
      name: 'Prison Escape',
      greeting: "Welcome to the Prison! It's miserable here. Your only job... GET OUT!",
      src: image_src_desert,
      pixels: { height: 168, width: 300 }
    };

    const sprite_src_chillguy = `${path}/assets/js/adventureGame/MainCharecter.png`;
    const CHILLGUY_SCALE_FACTOR = 10;
    const sprite_data_chillguy = {
    id: 'Chill Guy',
    greeting: "Hi, I am Chill Guy, Currently in prison, Unfortunately I need to break out!",
    src: sprite_src_chillguy,
    SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
    STEP_FACTOR: 2000,
    ANIMATION_RATE: 10,
    INIT_POSITION: { x: 0, y: height - (height / CHILLGUY_SCALE_FACTOR) },
    pixels: { height: 760, width: 500 }, 
    orientation: { rows: 4, columns: 4 }, 
    frameSize: { width: 100, height: 190 }, 
    down: { row: 0, start: 0, columns: 3 }, 
    up: { row: 1, start: 0, columns: 3 }, 
    left: { row: 2, start: 0, columns: 3 }, 
    right: { row: 3, start: 0, columns: 3 }, 
    downRight: { row: 0, start: 0, columns: 3, rotate: Math.PI / 16 }, 
    downLeft: { row: 0, start: 0, columns: 3, rotate: -Math.PI / 16 }, 
    upLeft: { row: 1, start: 0, columns: 3, rotate: Math.PI / 16 }, 
    upRight: { row: 1, start: 0, columns: 3, rotate: -Math.PI / 16 }, 
    hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 }, 
    keypress: { up: 87, left: 65, down: 83, right: 68 }
};



    // NPC Data
    const npcs = [
      {
        id: 'Tux',
        greeting: "Hi, I am Tux, the Linux mascot. I am happy to spend some shell time with you!",
        src: `${path}/assets/js/adventureGame/Npc1.png`,
        SCALE_FACTOR: 8,
        ANIMATION_RATE: 50,
        pixels: { height: 256, width: 352 },
        INIT_POSITION: { x: width / 3, y: height / 2 },
        orientation: { rows: 8, columns: 11 },
        down: { row: 0, start: 0, columns: 3 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 }
        
      {
        id: 'Octocat',
        greeting: "Hi, I am Octocat! I am the GitHub collaboration mascot!",
        src: `${path}/images/gamify/octocat.png`,
        SCALE_FACTOR: 8,
ANIMATION_RATE: 50,
pixels: { height: 256, width: 352 },
INIT_POSITION: { x: width / 3, y: height / 2 },
orientation: { rows: 8, columns: 11 },
down: { row: 0, start: 0, columns: 3 },
hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 }

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
