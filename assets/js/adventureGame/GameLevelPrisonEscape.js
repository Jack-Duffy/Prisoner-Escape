import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';

class GameLevelDesert {
  constructor(path) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    let width = GameEnv.innerWidth;
    let height = GameEnv.innerHeight;

    // Background data
    const image_src_desert = `${path}/images/gamify/Prison escape background.jpeg`;
    const image_data_desert = {
        name: 'Prison Escape',
        greeting: "Welcome to the Prison! It's miserable here. Your only job... GET OUT!",
        src: image_src_desert,
        pixels: { height: 168, width: 300 }
    };

    // Player data for Chillguy
    const sprite_src_chillguy = `${path}/images/gamify/chillguy.png`;
    const CHILLGUY_SCALE_FACTOR = 5;
    const sprite_data_chillguy = {
        id: 'Chill Guy',
        greeting: "Hi, I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
        src: sprite_src_chillguy,
        SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height / CHILLGUY_SCALE_FACTOR) },
        pixels: { height: 384, width: 512 },
        orientation: { rows: 3, columns: 4 },
        down: { row: 0, start: 0, columns: 3 },
        left: { row: 2, start: 0, columns: 3 },
        right: { row: 1, start: 0, columns: 3 },
        up: { row: 3, start: 0, columns: 3 },
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
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
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
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
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
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
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

export default GameLevelDesert;

