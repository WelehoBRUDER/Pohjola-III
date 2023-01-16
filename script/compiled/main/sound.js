"use strict";
var Sound = /** @class */ (function () {
    function Sound(audio) {
        var _a;
        this.id = audio.id;
        this.src = audio.src;
        this.player = controller.createPlayer(audio);
        this.properties = (_a = audio.properties) !== null && _a !== void 0 ? _a : { loop: false };
    }
    return Sound;
}());
var SoundController = /** @class */ (function () {
    function SoundController(controller) {
        this.sounds = controller.sounds || [];
    }
    SoundController.prototype.playSound = function (soundId) {
        var _a;
        var player = (_a = this.sounds.find(function (s) { return s.id === soundId; })) === null || _a === void 0 ? void 0 : _a.player;
        if (player) {
            player.play();
        }
        else {
            var audio = sounds.find(function (sound) { return sound.id === soundId; });
            if (audio) {
                this.sounds.push(new Sound({ id: audio.id, src: audio.src, properties: audio.properties }));
            }
            else {
                throw new Error("Sound " + soundId + " not found!");
            }
        }
    };
    SoundController.prototype.stopSound = function (sound) {
        var _a;
        var player = (_a = this.sounds.find(function (s) { return s.id === sound; })) === null || _a === void 0 ? void 0 : _a.player;
        if (player) {
            player.pause();
        }
    };
    SoundController.prototype.stopAllSounds = function () {
        this.sounds.forEach(function (sound) { return sound.player.pause(); });
    };
    SoundController.prototype.playMusic = function (song) {
        // TODO
    };
    SoundController.prototype.stopMusic = function (song) {
        // TODO
    };
    SoundController.prototype.stopAllMusic = function () {
        // TODO
    };
    SoundController.prototype.createPlayer = function (sound) {
        var player = document.createElement("audio");
        player.src = sound.src;
        player.id = sound.id;
        player.loop = sound.properties.loop;
        player.volume = 0.5;
        document.body.append(player);
        player.play();
        return player;
    };
    return SoundController;
}());
var controller = new SoundController({
    sounds: []
});
//# sourceMappingURL=sound.js.map