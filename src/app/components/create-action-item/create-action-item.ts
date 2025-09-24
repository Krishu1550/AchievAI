import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ActionItem } from '../../models/interfaceType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-action-item',
  imports: [],
  templateUrl: './create-action-item.html',
  styleUrl: './create-action-item.css'
})
export class CreateActionItem implements OnInit {

  @Output() createAction=new EventEmitter<ActionItem>();
  @Output() updateAction= new EventEmitter<ActionItem>();
  @Input() action?:ActionItem;
  @Input() isEditable:boolean=false;
  @Input() goalId?:string;
  actionForm?:FormGroup;
  fb:FormBuilder= inject(FormBuilder);

  constructor()
  {

  }
  ngOnInit(): void {
   this.fb.group({
    title:[this.action?.title||"",Validators.required],
    description:[this.action?.description||"",Validators.required],
    duration:[this.action?.duration||"",Validators.required]
   })
  }

  submit()
  {
    const newResource:ActionItem=
    {
      id:this.action?.id??Date.now().toString(),
      ...this.actionForm?.value,
      goalId:this.goalId
    }

         if (this.isEditable) {
        this.updateAction.emit(newResource);
      } else {
        this.createAction.emit(newResource);
      }
  }


}
