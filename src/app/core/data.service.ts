import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { map, tap, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { allBooks, allReaders } from 'app/data';
import { LoggerService } from './logger.service';
import { Reader } from 'app/models/reader';
import { Book } from 'app/models/book';
import { OldBook } from 'app/models/oldBook';
import { BookTrackerError } from 'app/models/bookTrackerError';

@Injectable()
export class DataService {

  mostPopularBook: Book = allBooks[0];

  constructor(
    //private loggerService: LoggerService,
    private httpClient: HttpClient) { }


  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[]> {
    return this.httpClient.get<Reader[]>('/api/readers');
  }

  getReaderById(id: number): Observable<Reader> {
    return this.httpClient.get<Reader>(`/api/readers/${id}`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }

  addReader(newReader: Reader): Observable<Reader> {
    return this.httpClient.post<Reader>('/api/readers/', newReader, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateReader(updatedReader: Reader): Observable<void> {
    return this.httpClient.put<void>(`/api/readers/${updatedReader.readerID}`, updatedReader, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteReader(readerID: number): Observable<void> {
    return this.httpClient.delete<void>(`/api/readers/${readerID}`);
  }

  getAllBooks(): Observable<Book[] | BookTrackerError> {
    return this.httpClient.get<Book[]>('/api/books')
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  getBookById(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`/api/books/${id}`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }

  // getOldBookById(id: number): Observable<OldBook> {
  //   return this.httpClient.get<Book>(`/api/books/${id}`, {
  //     headers: new HttpHeaders({
  //       'Accept': 'application/json',
  //       'Authorization': 'my-token'
  //     })
  //   })
  //     .pipe(
  //       map(b => <OldBook>{
  //         bookTitle: b.title,
  //         year: b.publicationYear
  //       }),
  //       tap(classicBook => console.log(classicBook))
  //     );
  // }

  addBook(newBook: Book): Observable<Book> {
    return this.httpClient.post<Book>('/api/books', newBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  updateBook(updatedBook: Book): Observable<void> {
    return this.httpClient.put<void>(`/api/books/${updatedBook.bookID}`, updatedBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  deleteBook(bookID: number): Observable<void> {
    return this.httpClient.delete<void>(`/api/books/${bookID}`);
  }

  private handleHttpError(error: HttpErrorResponse): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occourred retrieving data.';
    return ErrorObservable.create(dataError);
  }
}
