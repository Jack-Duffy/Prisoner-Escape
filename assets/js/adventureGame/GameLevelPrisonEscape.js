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
    const sprite_src_tux = path + "/assets/js/adventureGame/Npc1.png"; // be sure to include the path
    const sprite_greet_tux = "Hi I am Tux, the Linux mascot.  I am very happy to spend some linux shell time with you!";
    const sprite_data_tux = {
        id: 'Tux',
        greeting: sprite_greet_tux,
        src: sprite_src_tux,
        SCALE_FACTOR: 8,
        ANIMATION_RATE: 50,
        pixels: { height: 224, width: 515 },
        INIT_POSITION: { x: 103, y: 92 },
        orientation: { rows: 3, columns: 7 }, 
        frameSize: { width: 73, height: 82 }, // Adjusted for 7 columns and 3 rows
        down: { row: 1, start: 0, columns: 7 }, // Iterate through row 1 (second row)
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        // Linux command quiz
        quiz: { 
          title: "Linux Command Quiz",
          questions: [
            "Which command is used to list files in a directory?\n1. ls\n2. dir\n3. list\n4. show",
            "Which command is used to change directories?\n1. cd\n2. chdir\n3. changedir\n4. changedirectory",
            "Which command is used to create a new directory?\n1. mkdir\n2. newdir\n3. createdir\n4. makedir",
            "Which command is used to remove a file?\n1. rm\n2. remove\n3. delete\n4. erase",
            "Which command is used to remove a directory?\n1. rmdir\n2. removedir\n3. deletedir\n4. erasedir",
            "Which command is used to copy files?\n1. cp\n2. copy\n3. duplicate\n4. xerox",
            "Which command is used to move files?\n1. mv\n2. move\n3. transfer\n4. relocate",
            "Which command is used to view a file?\n1. cat\n2. view\n3. show\n4. display",
            "Which command is used to search for text in a file?\n1. grep\n2. search\n3. find\n4. locate",
            "Which command is used to view the contents of a file?\n1. less\n2. more\n3. view\n4. cat" 
          ] 
        },
        reaction: function() {
          alert(sprite_greet_tux);
        },
        interact: function() {
          let quiz = new Quiz(); // Create a new Quiz instance
          quiz.initialize();
          quiz.openPanel(sprite_data_tux.quiz);
          }
    
      };

    
     // NPC data for Octocat
     const sprite_src_octocat = path + "/images/gamify/octocat.png"; // be sure to include the path
     const sprite_greet_octocat = "Hi I am Octocat! I am the GitHub code code code collaboration mascot";
     const sprite_data_octocat = {
       id: 'Octocat',
       greeting: sprite_greet_octocat,
       src: sprite_src_octocat,
       SCALE_FACTOR: 10,  // Adjust this based on your scaling needs
       ANIMATION_RATE: 50,
       pixels: {height: 301, width: 801},
       INIT_POSITION: { x: (width / 4), y: (height / 4)},
       orientation: {rows: 1, columns: 4 },
       down: {row: 0, start: 0, columns: 3 },  // This is the stationary npc, down is default 
       hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
       // GitHub command quiz 
       quiz: { 
         title: "GitHub Command Quiz",
         questions: [
           "Which command is used to clone a repository?\n1. git clone\n2. git fork\n3. git copy\n4. git download",
           "Which command is used to add changes to the staging area?\n1. git add\n2. git stage\n3. git commit\n4. git push",
           "Which command is used to commit changes?\n1. git commit\n2. git add\n3. git save\n4. git push",
           "Which command is used to push changes to a remote repository?\n1. git push\n2. git upload\n3. git send\n4. git commit",
           "Which command is used to pull changes from a remote repository?\n1. git pull\n2. git fetch\n3. git receive\n4. git update",
           "Which command is used to check the status of the working directory and staging area?\n1. git status\n2. git check\n3. git info\n4. git log",
           "Which command is used to create a new branch?\n1. git branch\n2. git create-branch\n3. git new-branch\n4. git checkout",
           "Which command is used to switch to a different branch?\n1. git checkout\n2. git switch\n3. git change-branch\n4. git branch",
           "Which command is used to merge branches?\n1. git merge\n2. git combine\n3. git join\n4. git integrate",
           "Which command is used to view the commit history?\n1. git log\n2. git history\n3. git commits\n4. git show"
         ] 
       },
       reaction: function() {
         alert(sprite_greet_octocat);
       },
       interact: function() {
         let quiz = new Quiz(); // Create a new Quiz instance
         quiz.initialize();
         quiz.openPanel(sprite_data_octocat.quiz);
       }
   }
 
    

    // Create objects for this level
    this.objects = [
      { class: Background, data: image_data_desert },
      { class: Player, data: sprite_data_chillguy },
      ...npcs.map(npc => ({ class: Npc, data: npc }))
    ];
  }
}



export default GameLevelPrisonEscape;





