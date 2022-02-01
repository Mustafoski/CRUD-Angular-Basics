import { Component, OnInit } from '@angular/core';
import { SettingsService } from './resource/shared/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-basics';

  constructor(private settingsService: SettingsService) {}
  ngOnInit(): void {
    this.settingsService.loadSettings();
  }

  get theme(): string {
    return this.settingsService.settings?.theme;
  }
}
