import { Directive, HostListener, HostBinding, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[baseDropdown]'
})
export class DropdownDirective implements OnInit {



  constructor(
      private elementRef:ElementRef, 
      private renderer:Renderer2) { }

  ngOnInit() {
    this.exposed = false;
  }

@HostBinding('class.open') exposed:boolean = false;;

  @HostListener('click') onclick() {
    this.exposed =!this.exposed; 
  }
}
