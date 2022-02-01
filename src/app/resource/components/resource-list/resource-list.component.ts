import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Resource } from '../../shared/resource.model';
import { SettingsService } from '../../shared/settings.service';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent implements OnInit {
  @Input() resources: Resource[];
  @Input() activeId: string;
  @Output() onResourceClick = new EventEmitter<Resource>();

  ngOnInit(): void {
    this.settingsService.loadSettings();
  }
  constructor(private settingsService: SettingsService) {}
  get theme(): string {
    return this.settingsService.settings?.theme;
  }

  public onResourceSelected(resource: Resource) {
    this.onResourceClick.emit(resource);
  }

  get jsonResources() {
    return JSON.stringify(this.resources);
  }
}
