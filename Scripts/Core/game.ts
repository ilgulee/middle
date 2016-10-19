/// <reference path = "_reference.ts" />

// Global Variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;

var currentScene : objects.Scene;
var scene: number;
var enemyAtlas:createjs.SpriteSheet;
var animation:createjs.Sprite;
// Preload Assets required
var assetData:objects.Asset[] = [
    {id: "PlayBtn", src: "../../Assets/images/sack.png"},
    {id: "BankLobby", src:"../../Assets/images/bank.png"},
    {id: "BankSafe",src:"../../Assets/images/bank1.png"},
    {id: "Crosshair",src:"../../Assets/images/crosshair.png"},
    {id: "Robber",src:"../../Assets/images/robber.png"},
    {id: "Poof",src:"../../Assets/images/poof.png"},
    {id: "EnemyRobber",src:"../../Assets/images/enemy.png"}
];

function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    // assets.installPlugin(createjs.Sound);
    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}

function init() {
    // Reference to canvas element
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);

    let atlasData = {

        "images": [
            assets.getResult("EnemyRobber")
        ],
        "frames": [
            [1, 1, 200, 214, 0, 0, 0],
            [203, 1, 128, 125, 0, 0, -3],
            [203, 128, 102, 117, 0, -13, -9],
            [307, 128, 91, 98, 0, -18, -18],
            [400, 1, 128, 124, 0, 0, -4],
            [400, 127, 128, 124, 0, 0, -4]
        ],
        "animations": {
            "robber": { "frames": [0] },
            "poof2": { "frames": [1] },
            "poof4": { "frames": [2] },
            "poof5": { "frames": [3] },
            "poof1": { "frames": [4] },
            "poof3": { "frames": [5] },
            "poof": {
                "frames": [4,1,5,2,3], "speed": 0.1, next:false
            }
        },
        "texturepacker": [
            "SmartUpdateHash: $TexturePacker:SmartUpdate:6b44ef51929ea21e17ff1b07ec9c1090:a443013636a6d3e24441fc0f2a91ca43:a99356c10d69482e9bee53d25c3d05e1$",
            "Created with TexturePacker (https://www.codeandweb.com/texturepacker) for EaselJS"
            ]
    }
    enemyAtlas=new createjs.SpriteSheet(atlasData);
   
    scene = config.Scene.MENU;
    changeScene();
}

function gameLoop(event: createjs.Event): void {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}

function changeScene() : void {
    
    // Simple state machine pattern to define scene swapping.
    switch(scene)
    {
        case config.Scene.MENU :
            stage.removeAllChildren();
            currentScene = new scenes.Menu();;
            console.log("Starting MENU scene");
            break;
        case config.Scene.GAME :
            stage.removeAllChildren();
            currentScene = new scenes.Play();
            console.log("Starting SHOOTER scene");
            break;
    }
    
}