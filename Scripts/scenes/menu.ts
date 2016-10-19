/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

module scenes {
    export class Menu extends objects.Scene {

        // Private instance variables
        // Label or bitmap
        // Button 
        private _playBtn : objects.Button;
        private _menuBG:createjs.Bitmap;
        private _player:objects.Cursor;
        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
            console.log("Menu Scene Started");
             this._menuBG=new createjs.Bitmap(assets.getResult("BankLobby"));
             var blurFilter=new createjs.BlurFilter(5,5,1);
            this._menuBG.filters=[blurFilter];
            var bounds = blurFilter.getBounds();
            this._menuBG.cache(bounds.x,bounds.y,config.Screen.WIDTH,config.Screen.HEIGHT);
            this.addChildAt(this._menuBG,0);
            this._player=new objects.Cursor("Crosshair");
            this.addChild(this._player);
            this._playBtn = new objects.Button("PlayBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 150);
            this.addChild(this._playBtn);
            this._playBtn.on("click", this._playBtnClick, this);

            // Add menu scene to global stage container
            stage.addChild(this);
        }

        public update() : void {
             this._player.x = stage.mouseX;
            this._player.y = stage.mouseY;
        }

        private _playBtnClick(event : createjs.MouseEvent) {
            console.log("PRINT");
            scene = config.Scene.GAME;
            changeScene();
        }
    }
}