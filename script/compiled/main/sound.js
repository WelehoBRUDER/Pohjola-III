"use strict";
class Sound {
    constructor(audio) {
        this.id = audio.id;
        this.src = audio.src;
        this.player = controller.createPlayer(audio);
        this.properties = audio.properties ?? { loop: false };
    }
}
class SoundController {
    constructor(controller) {
        this.sounds = controller.sounds || [];
    }
    playSound(soundId) {
        const player = this.sounds.find((s) => s.id === soundId)?.player;
        if (player) {
            player.play();
        }
        else {
            const audio = sounds.find((sound) => sound.id === soundId);
            if (audio) {
                this.sounds.push(new Sound({ id: audio.id, src: audio.src, properties: audio.properties }));
            }
            else {
                throw new Error(`Sound ${soundId} not found!`);
            }
        }
    }
    stopSound(sound) {
        const player = this.sounds.find((s) => s.id === sound)?.player;
        if (player) {
            player.pause();
        }
    }
    stopAllSounds() {
        this.sounds.forEach((sound) => sound.player.pause());
    }
    playMusic(song) {
        // TODO
    }
    stopMusic(song) {
        // TODO
    }
    stopAllMusic() {
        // TODO
    }
    createPlayer(sound) {
        const player = document.createElement("audio");
        player.src = sound.src;
        player.id = sound.id;
        player.loop = sound.properties.loop;
        player.volume = 0.5;
        document.body.append(player);
        player.play();
        return player;
    }
}
const controller = new SoundController({
    sounds: [],
});
//# sourceMappingURL=sound.js.map