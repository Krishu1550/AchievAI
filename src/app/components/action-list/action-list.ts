import { Component, inject, OnInit } from '@angular/core';
import { ActionItem } from '../../models/interfaceType';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { CreateActionItem } from '../create-action-item/create-action-item';
import { Store } from '@ngrx/store';
import { getActionByGoalId } from '../../store/goal.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-action-list',
  imports: [NgIf,NgClass,CreateActionItem, AsyncPipe],
  templateUrl: './action-list.html',
  styleUrl: './action-list.css'
})
export class ActionList implements OnInit {

  actions:ActionItem[]=[]
  route:ActivatedRoute= inject(ActivatedRoute);
  isLoading:boolean=true;
  isEditable:boolean=false;
  errors?:string;
  isShowcreatePanel:boolean=false;
  goalId:string="";
  editToAction?:ActionItem
  store:Store= inject(Store)
  actions$:Observable<ActionItem[]>|null=null

  constructor()
  {
    this.goalId= this.route.snapshot.paramMap.get("goalId")??"";
    console.log(this.goalId);
  }

  ngOnInit(): void 
  {
    this.actions$=  this.store.select(getActionByGoalId( this.goalId));
    this.isLoading=false;

  }

  editAction(action:ActionItem)
  {
    this.editToAction=action;
  }

  toggleCreatePanel() 
  {
    this.isShowcreatePanel = !this.isShowcreatePanel;
    if (!this.isShowcreatePanel) {
      this.cancelEdit(); // reset when panel closes
    }
  }

  cancelEdit()
   {
    this.isEditable = false;
    this.editToAction = undefined;
   }
   handleCreateAction(action:ActionItem)
   {
    this.actions.push(action);
   }
   handleUpdateAction(action:ActionItem)
   {
    
   }

}
