import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- import FormsModule
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,       // <-- marks it standalone
  imports: [CommonModule, FormsModule, RouterModule, NavComponent, FooterComponent], // <-- import FormsModule here
  templateUrl: './app.html'
})
export class AppComponent {
  name = ''; // example for ngModel
}

