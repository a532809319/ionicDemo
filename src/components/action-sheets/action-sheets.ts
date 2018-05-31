import { Component } from '@angular/core';

/**
 * Generated class for the ActionSheetsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'action-sheets',
  templateUrl: 'action-sheets.html'
})
export class ActionSheetsComponent {

  text: string;

  constructor() {
    console.log('Hello ActionSheetsComponent Component');
    this.text = 'Hello World';
  }

}
