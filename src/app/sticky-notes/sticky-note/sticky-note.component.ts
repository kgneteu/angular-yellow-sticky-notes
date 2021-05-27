import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {StickyNote} from '../../models/sticky-note';
import {MatDialog} from '@angular/material/dialog';
import {StickyNotesService} from '../sticky-notes.service';

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.scss']
})

export class StickyNoteComponent implements OnInit {
  @ViewChild('confirmDeleteDialog') confirmDeleteDialog: TemplateRef<any>;
  @ViewChild('noteEditDialog') noteEditDialog: TemplateRef<any>;
  @Input() stickyNote: StickyNote;
  footerVisible = false;
  noteMessage = '';

  constructor(private dialog: MatDialog, private stickyNotesService: StickyNotesService) {
  }

  ngOnInit(): void {
  }

  onMouseLeave(): void {
    this.footerVisible = false;
  }

  onMouseEnter(): void {
    this.footerVisible = true;
  }

  onConfirmDelete(): void {
    this.dialog.open(this.confirmDeleteDialog);
  }

  onDeleteConfirmed(): void {
    this.stickyNotesService.delete(this.stickyNote.id);
  }

  onNoteSave(): void {
    this.stickyNote.message = this.noteMessage;
    this.stickyNotesService.update(this.stickyNote).subscribe(() => {
    });
  }

  onNoteEdit(): void {
    this.noteMessage = this.stickyNote.message;
    this.dialog.open(this.noteEditDialog);
  }
}
