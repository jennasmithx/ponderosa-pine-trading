import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about';
import { HomeComponent } from './pages/home/home';
import { ContactComponent } from './pages/contact/contact';
import { ProjectsComponent } from './pages/projects/projects';
import { FooterComponent } from './footer/footer';
// app.routes.ts
export const routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'footer', component: FooterComponent,}
];
