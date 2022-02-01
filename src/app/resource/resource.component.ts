import { Component, OnInit, OnDestroy } from '@angular/core';
import { Resource, ResourceAlert } from './shared/resource.model';
import { ResourceService } from './shared/resource.service';
import { AlertComponent } from './shared/alert.component';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
})
export class ResourceComponent
  extends AlertComponent
  implements OnInit, OnDestroy
{
  public isDetailView = true;
  public selectedResource: Resource;
  public resources: Resource[] = [];

  constructor(private resourceService: ResourceService) {
    super();
  }

  ngOnInit(): void {
    this.getResources();
  }
  ngOnDestroy(): void {
    this.clearAlertTimeout();
  }
  public handleSearch(searchedTitle: string) {
    if (!searchedTitle) {
      return this.getResources();
    }

    this.resourceService
      .searchResources(searchedTitle)
      .subscribe((resources) => {
        this.resources = resources;
        this.selectResource(null);
        !this.isDetailView ? (this.isDetailView = true) : null;
      });
  }

  public updateResource = (resource: Resource) => {
    this.resourceService.updateResource(resource._id, resource).subscribe(
      (updatedResource) => {
        this.hydrateResources(updatedResource);
        this.setAlert('success', 'Resource was successfully updated');
      },
      (error: string) => this.setAlert('error', error)
    );
  };

  public toggleView(): void {
    this.isDetailView = !this.isDetailView;
  }
  public handleResourceSelect(resource: Resource) {
    this.clearAlertTimeout();
    this.selectResource(resource);
  }
  public hydrateResources(updatedResource: Resource) {
    const index = this.findResourceIndex(updatedResource);
    this.resources[index] = updatedResource;
    this.selectResource(updatedResource);
  }

  public deleteResource() {
    const isConfirm = confirm('Are you sure?');
    if (!this.activeResource?._id) {
      alert('No Resource Selected');
      return;
    }
    if (isConfirm) {
      this.resourceService
        .deleteResource(this.activeResource._id)
        .subscribe((dResource) => {
          const index = this.findResourceIndex(dResource);
          this.resources.splice(index, 1);
          this.selectResource(this.resources[0]);
        });
    }
  }

  private findResourceIndex(resource: Resource): number {
    return this.resources.findIndex((r) => r._id === resource._id);
  }
  private selectResource(resource: Resource): Resource {
    if (!resource?._id) {
      this.selectedResource = null;
      return null;
    }

    this.selectedResource = { ...resource };
    return this.selectedResource;
  }
  private getResources() {
    this.resourceService.getResources().subscribe((resources: Resource[]) => {
      this.resources = resources;
    });
  }

  get hasResources(): boolean {
    return this.resources && this.resourcesCount > 0;
  }

  get activeResource(): Resource {
    return (
      this.selectedResource || (this.hasResources && this.resources[0]) || null
    );
  }

  get resourcesCount(): number {
    return this.resources.length;
  }

  get btnViewClass(): string {
    return this.isDetailView ? 'btn-warning' : 'btn-primary';
  }
}
