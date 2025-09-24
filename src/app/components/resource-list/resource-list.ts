import { Component, inject, OnInit } from '@angular/core';
import { Resource } from '../../models/interfaceType';
import { ResourceService } from '../../services/resource/resource-service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { CreateResource } from '../create-resource/create-resource';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getResourceByGoalId } from '../../store/goal.selector';



@Component({
  selector: 'app-resource-list',
  imports: [NgClass,NgIf,CreateResource, AsyncPipe],
  templateUrl: './resource-list.html',
  styleUrl: './resource-list.css'
})
export class ResourceList implements OnInit {

  resources: Resource[] = [];
  resourceService: ResourceService = inject(ResourceService);
  route: ActivatedRoute = inject(ActivatedRoute);
  goalId: string = "";
  isLoading = true;
  isEditable = false;
  isCreatePanelActive = false;
  err!: string 
  editToResource?:Resource
  resources$: Observable<Resource[]>|null=null
  store:Store= inject(Store)


  constructor() {
   this.goalId=this.route.snapshot.paramMap.get("goalId")??"";
   console.log(this.goalId)
  }

  ngOnInit(): void 
  {
    this.resources$= this.store.select(getResourceByGoalId(this.goalId));
    this.isLoading=false;
    
    /*
    this.resourceService.getByGoalId(this.goalId).subscribe({
      next: (data: Resource[]) => {
        this.resources = data;
        this.isLoading = false
      },
      error: (err) => {
        this.err = err;
      }
    }
    );
    */
  }

  editResource(resource:Resource)
  {
    this.isEditable = true;
    this.editToResource = { ...resource };
    this.isCreatePanelActive = true;

  }
  toggleCreatePanel() {
    this.isCreatePanelActive = !this.isCreatePanelActive;
    if (!this.isCreatePanelActive) {
      this.cancelEdit(); // reset when panel closes
    }
  }
  handleCreateResource(resource:Resource)
  {
    console.log(resource);
    this.resources.push(resource);
    this.toggleCreatePanel();
    console.log(this.resources)
    this.isLoading=false
  }
  handleUpdateResource(resource:Resource)
  {
    this.toggleCreatePanel();
  }
  // Cancel edit and go back to create mode
  cancelEdit() 
  {
    this.isEditable = false;
    this.editToResource = undefined;
  }
}
