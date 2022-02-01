import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource, ResourceAlert } from '../../shared/resource.model';
import { ResourceService } from '../../shared/resource.service';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-update.component.html',
  styleUrls: ['./resource-update.component.scss'],
})
export class ResourceUpdateComponent {
  @Input() set resource(selectedResource: Resource) {
    this.selectedResource = { ...selectedResource };
  }
  @Output() onResourceUpdate = new EventEmitter<Resource>();
  @Input() alert: ResourceAlert;
  @Input() onSubmit: (resource: Resource) => Observable<Resource>;
  
  selectedResource: Resource;
  types = Resource.types;

  submitForm() {
    this.onSubmit(this.selectedResource);
  }
}
