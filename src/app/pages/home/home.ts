import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

}
