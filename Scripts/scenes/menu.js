/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // Menu Class Contructor
        function Menu() {
            _super.call(this);
        }
        Menu.prototype.start = function () {
            console.log("Menu Scene Started");
            this._menuBG = new createjs.Bitmap(assets.getResult("BankLobby"));
            var blurFilter = new createjs.BlurFilter(5, 5, 1);
            this._menuBG.filters = [blurFilter];
            var bounds = blurFilter.getBounds();
            this._menuBG.cache(bounds.x, bounds.y, config.Screen.WIDTH, config.Screen.HEIGHT);
            this.addChildAt(this._menuBG, 0);
            this._player = new objects.Cursor("Crosshair");
            this.addChild(this._player);
            this._playBtn = new objects.Button("PlayBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 150);
            this.addChild(this._playBtn);
            this._playBtn.on("click", this._playBtnClick, this);
            // Add menu scene to global stage container
            stage.addChild(this);
        };
        Menu.prototype.update = function () {
            this._player.x = stage.mouseX;
            this._player.y = stage.mouseY;
        };
        Menu.prototype._playBtnClick = function (event) {
            console.log("PRINT");
            scene = config.Scene.GAME;
            changeScene();
        };
        return Menu;
    }(objects.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));
//# sourceMappingURL=menu.js.map