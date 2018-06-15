import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { OldBook } from 'app/models/oldBook';
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    let bookID: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getBookById(bookID)
      .subscribe(
        (data: Book) => this.selectedBook = data,
        (err: any) => console.log(err),
        //() => console.log(`Retrieved book number ${bookID}`)
      );
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
  }

  saveChanges(): void {
    this.dataService.updateBook(this.selectedBook)
      .subscribe(
        (data: void) => console.log(`Book ${this.selectedBook.title} has sucessfully been updated`),
        (err: any) => console.log(err)
      );
  }
}
