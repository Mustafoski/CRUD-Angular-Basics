import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ResourceSettings } from './resource.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings = new ResourceSettings();
  settingsSubject = new Subject<ResourceSettings>();

  constructor() {
    this.settingsSubject.subscribe((settings) => {
      this.settings = settings;
    });
  }

  public loadSettings() {
    const settings = localStorage.getItem('resource-settings');
    const parsedSettings = settings
      ? JSON.parse(settings)
      : new ResourceSettings();
    this.settingsSubject.next(parsedSettings);
  }

  public saveSettings(settings: ResourceSettings) {
    localStorage.setItem('resource-settings', JSON.stringify(settings));
    this.settingsSubject.next(settings);
  }
}
