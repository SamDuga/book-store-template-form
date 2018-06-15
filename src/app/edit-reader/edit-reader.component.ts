import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Reader } from 'app/models/reader';
import { DataService } from 'app/core/data.service';
import { BadgeService } from 'app/services/badge.service';

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styles: [],
  providers: [BadgeService]
})
export class EditReaderComponent implements OnInit {

  selectedReader: Reader;
  currentBadge: string;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private badgeService: BadgeService) { }

  ngOnInit() {
    let readerID: number = parseInt(this.route.snapshot.params['id']);

    this.dataService.getReaderById(readerID)
      .subscribe(
       (data: Reader) => {
          this.selectedReader = data;
          this.currentBadge = this.badgeService.getReaderBadge(data.totalMinutesRead);
       },
       (err: any) => console.log(err),
        //() => console.log(`Retrieved reader number ${readerID}`)
    );
  }

  saveChanges() {
    this.dataService.updateReader(this.selectedReader)
      .subscribe(
        (data: void) => console.log(`Reader ${this.selectedReader.name} has sucessfully been updated`),
        (err: any) => console.log(err)
      );
  }
}
