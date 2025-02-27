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
3
    // Player data for MC
    
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
