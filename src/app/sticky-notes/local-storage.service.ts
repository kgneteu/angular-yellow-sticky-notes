import {Injectable} from '@angular/core';
// import {LoremIpsum} from 'lorem-ipsum';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
  export class LocalStorageService {
  //
  // private maxSent = 5;
  // private lorem = new LoremIpsum({
  //   sentencesPerParagraph: {
  //     max: 8,
  //     min: 4
  //   },
  //   wordsPerSentence: {
  //     max: 16,
  //     min: 4
  //   }
  // });
  // private stickyNotes = [
  //   {id: 1, message: this.lorem.generateSentences(Math.floor(Math.random() * this.maxSent))},
  //   {id: 1, message: this.lorem.generateSentences(Math.floor(Math.random() * this.maxSent))},
  //   {id: 1, message: this.lorem.generateSentences(Math.floor(Math.random() * this.maxSent))},
  //   {id: 1, message: this.lorem.generateSentences(Math.floor(Math.random() * this.maxSent))},
  //   {id: 1, message: this.lorem.generateSentences(Math.floor(Math.random() * this.maxSent))},
  //   {id: 1, message: this.lorem.generateSentences(Math.floor(Math.random() * this.maxSent))},
  //   {id: 1, message: this.lorem.generateSentences(Math.floor(Math.random() * this.maxSent))},
  //   {id: 1, message: this.lorem.generateSentences(Math.floor(Math.random() * this.maxSent))},
  //   {id: 1, message: this.lorem.generateSentences(Math.floor(Math.random() * this.maxSent))},
  //   {id: 1, message: this.lorem.generateSentences(Math.floor(Math.random() * this.maxSent))},
  //   {id: 1, message: this.lorem.generateSentences(Math.floor(Math.random() * this.maxSent))},
  //   {id: 1, message: this.lorem.generateSentences(Math.floor(Math.random() * this.maxSent))},
  //   {id: 1, message: this.lorem.generateSentences(Math.floor(Math.random() * this.maxSent))},
  //   {id: 1, message: this.lorem.generateSentences(Math.floor(Math.random() * this.maxSent))},
  //   {id: 1, message: this.lorem.generateSentences(Math.floor(Math.random() * this.maxSent))},
  // ];


  private updateData<T extends { id?: number }>(table: string, key: number, newData: T): void {
    const data: T[] = JSON.parse(localStorage.getItem(table));
    const index = data.findIndex(item => item.id === key);
    if (index !== -1) {
      data[index] = newData;
      const jsonData = JSON.stringify(data);
      localStorage.setItem(table, jsonData);
    }
  }

  removeData<T extends { id?: number }>(table: string, key: number): void {
    const data: T[] = JSON.parse(localStorage.getItem(table));
    if (data) {
      const newData = data.filter(item => item.id !== key);
      const jsonData = JSON.stringify(newData);
      localStorage.setItem(table, jsonData);
    }
  }

  private addNewData<T extends { id?: number }>(table: string, newData: T): number {
    let data: T[] = JSON.parse(localStorage.getItem(table));
    let key = new Date().valueOf();
    if (data) {
      while (data.find(item => item.id === key)) {
        key = new Date().valueOf();
      }
    } else {
      data = [];
    }
    newData.id = key;

    data.push(newData);
    const jsonData = JSON.stringify(data);
    localStorage.setItem(table, jsonData);
    return key;
  }

  private getData<T extends { id?: number }>(table, key: number): T {
    const data: T[] = JSON.parse(localStorage.getItem(table));
    return data.find(item => item.id === key);
  }

  private getAllData<T>(table: string): T {
    const data: T = JSON.parse(localStorage.getItem(table));
    return data;
  }

  private clearAllData(table: string): void {
    localStorage.removeItem(table);
  }

  post<T extends { id?: number }>(baseUrl: string, data: T): Observable<T> {
    const [ignored, api, table] = baseUrl.split('/');
    const id = this.addNewData(table, data);
    data.id = id;
    return new Observable(observer => {
        observer.next(data);
        observer.complete();
      }
    );
  }

  get<T>(baseUrl: string): Observable<T> {
    const [ignored, api, table, id] = baseUrl.split('/');
    if (id) {
      return new Observable(observer => {
        observer.next(this.getData<T>(table, +id));
        observer.complete();
      });
    } else {
      return new Observable(observer => {
        observer.next(this.getAllData<T>(table));
        observer.complete();
      });
    }
  }

  delete<T>(baseUrl: string): Observable<T> {
    const [ignored, api, table, id] = baseUrl.split('/');
    this.removeData(table, +id);
    return new Observable(observer => {
      observer.next();
      observer.complete();
    });
  }

  put<T>(baseUrl: string, data: T): Observable<T> {
    const [ignored, api, table, id] = baseUrl.split('/');
    this.updateData(table, +id, data);
    return new Observable(observer => {
      observer.next(data);
      observer.complete();
    });
  }
}
