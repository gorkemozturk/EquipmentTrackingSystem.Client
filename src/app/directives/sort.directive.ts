import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Sort } from '../utulities/sort.utulity';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort: Array<any> = [];

  constructor(private element: ElementRef) { }

  @HostListener('click')
  sort() {
    const sort = new Sort();
    const element = this.element.nativeElement;
    const order = element.getAttribute('data-order');
    const type = element.getAttribute('data-type');
    const property = element.getAttribute('data-name');

    if (order === 'desc') {
      this.appSort.sort(sort.execute(property, order, type));
      element.setAttribute('data-order', 'asc');
    }
    else {
      this.appSort.sort(sort.execute(property, order, type));
      element.setAttribute('data-order', 'desc');
    }
  }
}
