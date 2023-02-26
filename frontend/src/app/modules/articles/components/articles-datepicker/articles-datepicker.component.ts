import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-articles-datepicker',
  templateUrl: './articles-datepicker.component.html',
  styleUrls: ['./articles-datepicker.component.scss']
})
export class ArticlesDatepickerComponent {
  @Input() isInvalidDatePicker = false;
  @Input() prePopulatedDate = '';
  @Output() selectedDate = new EventEmitter();

  onDateEmmit(e: Event){
    this.selectedDate.emit(e);
  }

  onChangeE(e:any){
    this.selectedDate.emit(e.target.value);
  }
}
