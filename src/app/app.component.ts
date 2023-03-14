import { Component ,AfterViewInit, Renderer2} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;
  title = 'taskangular';
}
