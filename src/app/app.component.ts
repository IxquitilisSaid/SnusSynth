import { Component } from '@angular/core';
import Tone from 'tone';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	// Private Vars
	private _audioContext: any;

	// Public Vars Composed
	public synth: any;
	public notes: string[] = [
		'C', 'C#',
		'D', 'D#',
		'E',
		'F', 'F#',
		'G', 'G#',
		'A', 'A#',
		'B'
	];
	public octaves: number[] = [
		1,
		2,
		3,
		4,
		5,
		6
	];

	// Public Vars Simple
	public msdown = false;
	public isChorusOn = false;
	public isPhaserOn = false;

	constructor() {
		try {
			this._audioContext = new (window['AudioContext'] || window['webkitAudioContext'])();

			Tone.setContext(this._audioContext);
		} catch (error) {
			console.log('No audio api for you, suckah');
		}

		this.synth = new Tone.PolySynth(1, Tone.Synth).toMaster();
	}

	public resetState() {
		return this.synth = new Tone.PolySynth(1, Tone.Synth).toMaster();
	}

	public chorus() {
		if (!this.isChorusOn) {
			let chorus = new Tone.Chorus(4, 2.5, 0.5);

			this.synth = new Tone.PolySynth(4, Tone.MonoSynth).toMaster().connect(chorus);
			this.isChorusOn = true;
		} else {
			this.isChorusOn = false;

			this.resetState();
		}
	}

	public reverb() {
		let reverb = new Tone.JCReverb(0.9).connect(Tone.Master);
		let delay = new Tone.FeedbackDelay(0.2);

		this.synth = new Tone.DuoSynth().chain(delay, reverb);
	}

	public phaser() {
		if (!this.isPhaserOn) {
			let phaser = new Tone.Phaser({
				'frequency' : 2,
				'octaves' : 2,
				'baseFrequency' : 55
			}).toMaster();

			this.synth.connect(phaser);

			this.isPhaserOn = true;
		} else {
			this.isPhaserOn = false;

			this.resetState();
		}
	}

	public msover(note: string) {
		if (this.msdown) {
			this.play(note);
		}
	}

	public play(note: string) {
		Tone.start();

		this.synth.triggerAttackRelease(note, '8n');
	}
}
