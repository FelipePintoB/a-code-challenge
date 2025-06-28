import { Component } from '@angular/core';
import { MainHeaderComponent } from '../main-header/main-header.component';
import { MainFooterComponent } from '../main-footer/main-footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MainHeaderComponent, MainFooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {}
