import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
    public oneAtATime:boolean = true;
  public items:string[] = ['Item 1', 'Item 2', 'Item 3'];
 
  public status:Object = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
 
  public groups:any[] = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];
 
  public addItem():void {
    this.items.push(`Items ${this.items.length + 1}`);
  }
}
