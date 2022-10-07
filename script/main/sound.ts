interface SoundInterface {
  id: string;
  src: string;
  properties: any; // TODO
}

class Sound {
  id: string;
  src: string;
  player: HTMLAudioElement;
  properties: any; // TODO
  constructor(audio: SoundInterface) {
    this.id = audio.id;
    this.src = audio.src;
    this.player = controller.createPlayer(audio);
    this.properties = audio.properties ?? { loop: false };
  }
}

interface SoundControllerInterface {
  sounds: Sound[];
}

class SoundController {
  sounds: Sound[];
  constructor(controller: SoundControllerInterface) {
    this.sounds = controller.sounds || [];
  }
  playSound(soundId: string) {
    const player = this.sounds.find((s) => s.id === soundId)?.player;
    if (player) {
      player.play();
    } else {
      const audio = sounds.find((sound) => sound.id === soundId);
      if (audio) {
        this.sounds.push(new Sound({ id: audio.id, src: audio.src, properties: audio.properties }));
      } else {
        throw new Error(`Sound ${soundId} not found!`);
      }
    }
  }

  stopSound(sound: string) {
    const player = this.sounds.find((s) => s.id === sound)?.player;
    if (player) {
      player.pause();
    }
  }

  stopAllSounds() {
    this.sounds.forEach((sound) => sound.player.pause());
  }

  playMusic(song: string) {
    // TODO
  }

  stopMusic(song: string) {
    // TODO
  }

  stopAllMusic() {
    // TODO
  }

  createPlayer(sound: SoundInterface) {
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
