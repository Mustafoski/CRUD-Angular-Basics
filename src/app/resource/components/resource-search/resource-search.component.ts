import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-resource-search',
  templateUrl: './resource-search.component.html',
  styleUrls: ['./resource-search.component.scss'],
})
export class ResourceSearchComponent implements AfterViewInit {
  @Output() onSearch = new EventEmitter<string>();
  @ViewChild('searchInput') input: ElementRef;

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(debounceTime(400))
      .subscribe((e: any) => {
        this.onSearch.emit(e.target.value);
      });
  }
}
