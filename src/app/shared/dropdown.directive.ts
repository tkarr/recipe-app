import { Directive, HostListener, ElementRef, Renderer2, OnInit, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  //alternative to renderer implementation
  //@HostBinding('class.open') isOpen = false;


  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    
  }

  @HostListener('click') onClick(eventData: Event) {
    if (this.elementRef.nativeElement.classList.contains('open')) {
      this.renderer.removeClass(this.elementRef.nativeElement, "open");
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, "open");
    }
    
  }
}
