import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {StickyNotesService} from '../sticky-notes.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-add-note-button',
  templateUrl: './add-note-button.component.html',
  styleUrls: ['./add-note-button.component.scss'],
  animations: [
    trigger('buttonMoveIn', [
      state('start', style({
        left: '-60px',
        transform: 'rotate(-700deg)'
      })),
      state('normal', style({
        // left: '1.8rem',
        left: '1.8rem',
        transform: 'rotate(0deg)'
      })),
      transition('start => normal', animate(1500)),
    ]),
  ],
})
export class AddNoteButtonComponent implements OnInit {
  buttonState = 'start';
  noteMessage = '';
  @ViewChild('noteAddDialog') noteAddDialog: TemplateRef<any>;

  constructor(private stickyNotesService: StickyNotesService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    setTimeout(() => this.buttonState = 'normal', 1000);
  }

  onAddStickyNote(): void {
    this.dialog.open(this.noteAddDialog);
  }

  onNoteSave(): void {
    this.stickyNotesService.create({id: 0, message: this.noteMessage}).subscribe(() => {
      this.noteMessage = '';
    });
  }
}
