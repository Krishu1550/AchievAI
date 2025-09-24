import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Resource } from '../../models/interfaceType';


@Component({
  selector: 'app-create-resource',
  imports: [ReactiveFormsModule],
  templateUrl: './create-resource.html',
  styleUrl: './create-resource.css'
})
export class CreateResource implements OnInit {
  @Input() isEditMode = false
  @Input() resource?: Resource;
  @Input() goalId?:string
  @Output() createResource = new EventEmitter<Resource>();
  @Output() updateResource = new EventEmitter<Resource>();
  resourseForm!: FormGroup
  fb: FormBuilder = inject(FormBuilder)
  

  ngOnInit(): void {
    this.resourseForm = this.fb.group({
      type: [this.resource?.type || '', Validators.required],
      title: [this.resource?.title || '', Validators.required],
      description: [this.resource?.description || '', Validators.required],
      duration: [this.resource?.duration || '', Validators.required]
    }

    )
  }

  submit() {
    const newResource:Resource={
        id: this.resource?.id ?? Date.now(),
        ...this.resourseForm.value,
        goalId:this.goalId

      };
      console.log(newResource)
         if (this.isEditMode) {
        this.updateResource.emit(newResource);
      } else {
        this.createResource.emit(newResource);
      }


  }
  cancelEdit() {

  }

}
