import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StickyNoteComponent} from './sticky-notes/sticky-note/sticky-note.component';
import {StickyNotesComponent} from './sticky-notes/sticky-notes.component';
import {AddNoteButtonComponent} from './sticky-notes/add-note-button/add-note-button.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {BackTitleComponent} from './sticky-notes/back-title/back-title.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {StickyNotesService} from './sticky-notes/sticky-notes.service';


@NgModule({
  declarations: [
    AppComponent,
    StickyNoteComponent,
    StickyNotesComponent,
    AddNoteButtonComponent,
    BackTitleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  providers: [StickyNotesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
