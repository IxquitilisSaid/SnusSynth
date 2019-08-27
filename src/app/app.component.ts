import { Component, OnInit } from '@angular/core';
import Tone from 'tone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  name = 'Angular Tone.js';
  synth: any;
  notes: string[] = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B'
  ];
  octives: number[] = [1, 2, 3, 4, 5, 6];

  msdown: boolean = false;

  constructor() {
    // let synth = new Tone.Synth();//.toMaster();
    // a 4 voice Synth

    /*
      var phaser = new Tone.Phaser({
        "frequency" : 2,
        "octaves" : 2,
        "baseFrequency" : 55
      }).toMaster();
      this.synth.connect(phaser);
    */
   console.log(typeof Tone);


   this.synth = new Tone.PolySynth(1, Tone.Synth).toMaster();

    // play a chord
    // polySynth.triggerAttackRelease(["F3", "C3"], "2n");
    // this.polySynth.triggerAttackRelease(["F3", "C4"], "8n");
  }

  ngOnInit() {
    console.log(typeof Tone);


    this.synth = new Tone.PolySynth(1, Tone.Synth).toMaster();
  }

  chorus() {
    let chorus = new Tone.Chorus(4, 2.5, 0.5);
    this.synth = new Tone.PolySynth(4, Tone.MonoSynth)
      .toMaster()
      .connect(chorus);
  }

  reverb() {
    let reverb = new Tone.JCReverb(0.9).connect(Tone.Master);
    let delay = new Tone.FeedbackDelay(0.2);
    this.synth = new Tone.DuoSynth().chain(delay, reverb);
  }

  phaser() {
    let phaser = new Tone.Phaser({
      frequency: 2,
      octaves: 2,
      baseFrequency: 55
    }).toMaster();

    this.synth.connect(phaser);
  }

  msover(note) {
    if (this.msdown) {
      this.play(note);
    }
  }

  play(note) {
    // this.synth.triggerAttackRelease(["C3","E3","G3"], "8n");
    this.synth.triggerAttackRelease(note, '8n');
    // this.synth.triggerAttackRelease([note], "2n");
  }

  // play a middle 'C' for the duration of an 8th note
  // synth.triggerAttackRelease("C4", "8n");
}
