import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[appDatepicker]'
})
export class DatepickerDirective  implements AfterViewInit {

  @Output() dateEmit = new EventEmitter();
  @Input() inputDate: string = '';

  constructor(private elementRef: ElementRef, private ngZone: NgZone ) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      $(this.elementRef.nativeElement).datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: (date:any) => {
          this.ngZone.run(() => {
            this.setEDate(date);
          })
        },
      });
      $(this.elementRef.nativeElement ).datepicker( "setDate", this.inputDate);
    })
  }

  setEDate(date : string) {
    this.dateEmit.emit(date);
  }

}
