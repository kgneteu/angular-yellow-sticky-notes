import {Component, OnInit} from '@angular/core';
import {StickyNotesService} from './sticky-notes.service';
import {StickyNote} from '../models/sticky-note';

@Component({
  selector: 'app-sticky-notes',
  templateUrl: './sticky-notes.component.html',
  styleUrls: ['./sticky-notes.component.scss']
})
export class StickyNotesComponent implements OnInit {
  stickyNotes: StickyNote[] = [];

  constructor(private stickyNotesService: StickyNotesService) {
  }

  ngOnInit(): void {
    this.stickyNotesService.getListener().subscribe(stickyNotes => {
      this.stickyNotes = stickyNotes;
    });
    this.stickyNotesService.getAll(); // just trigger
  }

}
