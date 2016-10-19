module scenes {
    export class Play extends objects.Scene {
        private _gameBG:createjs.Bitmap;
        private _robber:objects.Enemy;
        private _player:objects.Cursor;
        private _time:objects.Label;
        private _scoreText:objects.Label;
        private _score:number;

        constructor() {
            super();
        
        }

        public start() : void {
            console.log("Game Scene Started");
            this._gameBG=new createjs.Bitmap(assets.getResult("BankSafe"));
            this.addChildAt(this._gameBG,0);
            
            this._spown();
            this._player=new objects.Cursor("Crosshair");
            this.addChildAt(this._player,2);

            this._score=0;
            this._scoreText=new objects.Label("Score: "+
            this._score,"bold 37px Arial", "#003366",775,10);
            this._scoreText.lineHeight=39;
            this._scoreText.lineWidth=86;
            this.addChildAt(this._scoreText,1);

            stage.addChild(this);
        }

        public update() : void {
            if(this._robber.life==0){
                this._robber.update();
            }
            if(this._robber.currentFrame==3){
                currentScene.removeChild(this._robber);
                this._spown();
                this._score+=5;
                this._scoreText.text="Score: "+this._score;
            }
            this._player.x = stage.mouseX;
            this._player.y = stage.mouseY;
        }

        private _spown():void{
             this._robber = new objects.Enemy("robber", Math.ceil(Math.random()*5));
            var randPosition = new objects.Vector2(Math.random()*700+100,Math.random()*500+100);
            this._robber.setPosition(randPosition);
            this.addChildAt(this._robber,1);
            this._robber.on("click", this._onEnemyClick, this);
        }
        private _onEnemyClick(event : createjs.MouseEvent) : void {
            this._robber.shot();
        }
    }
}