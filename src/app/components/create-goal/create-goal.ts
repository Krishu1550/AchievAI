import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Goal } from '../../models/interfaceType';
import { FormBuilder,  FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-goal',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './create-goal.html',
  styleUrl: './create-goal.css'
})
export class CreateGoal {
  @Input() isEditMode = false;
  @Input() goal?: Goal;

  @Output() goalCreated = new EventEmitter<Goal>();
  @Output() goalUpdated = new EventEmitter<Goal>();

  goalForm!: FormGroup;
  fb: FormBuilder= inject(FormBuilder)


  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    this.initForm(); // rebuild form when goal changes
  }

  private initForm() {
    this.goalForm = this.fb.group({
      title: [this.goal?.title || '', Validators.required],
      description: [this.goal?.description || '', Validators.required],
      duration: [this.goal?.duration || '', Validators.required],
      goalStatus: [this.goal?.goalStatus || 'Active', Validators.required]
    });
  }

  submit() {
    if (this.goalForm.valid) {
      const newGoal: Goal = {
        id: this.goal?.id ?? Date.now(),
        ...this.goalForm.value
      };

      if (this.isEditMode) {
        this.goalUpdated.emit(newGoal);
      } else {
        this.goalCreated.emit(newGoal);
      }

      this.goalForm.reset();
    }
  }
  
  cancelEdit() {
  // <-- emit cancel event
  }
}
