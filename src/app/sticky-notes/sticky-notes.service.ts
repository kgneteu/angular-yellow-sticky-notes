import {Injectable} from '@angular/core';
import {StickyNote} from '../models/sticky-note';
import {Observable, Subject} from 'rxjs';
import {LocalStorageService} from './local-storage.service';

const baseUrl = '/api/sticky-notes';

@Injectable({
  providedIn: 'root'
})
export class StickyNotesService {
  private stickyNotes = [];
  private stickyNotesUpdated = new Subject<StickyNote[]>();

  constructor(private http: LocalStorageService) {

  }


  delete(id: number): void {
    this.http.delete<StickyNote>(`${baseUrl}/${id}`).subscribe(() => {
      const updatedNotes = this.stickyNotes.filter(note => note.id !== id);
      this.stickyNotes = updatedNotes;
      this.stickyNotesUpdated.next(updatedNotes);
    });
  }

  update(data: StickyNote): Observable<any> {
    const post = this.http.put(`${baseUrl}/${data.id}`, data);
    post.subscribe((stickyNote: StickyNote) => {
      const index = this.stickyNotes.findIndex(item => item.id === data.id);
      if (index !== -1) {
        this.stickyNotes[index] = data;
        this.stickyNotesUpdated.next([...this.stickyNotes]);
      }
    });
    return post;
  }

  create(data: StickyNote): Observable<StickyNote> {
    const post = this.http.post<StickyNote>(baseUrl, data);
    post.subscribe((stickyNote: StickyNote) => {
      this.stickyNotes.push(stickyNote);
      this.stickyNotesUpdated.next([...this.stickyNotes]);
    });
    return post;
  }

  getAll(): StickyNote[] {
    this.http.get<StickyNote[]>(baseUrl).subscribe((stickyNotes) => {
      if (stickyNotes) {
        this.stickyNotes = [...stickyNotes];
      } else {
        this.stickyNotes = [];
      }
      this.stickyNotesUpdated.next(stickyNotes);
    });
    return this.stickyNotes;
  }

  getListener(): Observable<StickyNote[]> {
    return this.stickyNotesUpdated.asObservable();
  }
}
