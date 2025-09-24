import { Component, inject, OnInit } from '@angular/core';
import { Goal } from '../../models/interfaceType';
import { ApiService } from '../../services/api-service';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { CreateGoal } from '../create-goal/create-goal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getGoals } from '../../store/goal.selector';
import { GoalService } from '../../services/goal/goal-service';
import { loadGoal, loadGoalFail, loadGoalSuccess } from '../../store/goal.action';

@Component({
  selector: 'app-list-goals',
  imports: [ NgClass, CreateGoal, AsyncPipe, NgIf],
  templateUrl: './list-goals.html',
  styleUrl: './list-goals.css'
})
export class ListGoals implements OnInit {
  showCreatePanel = false;
  goals: Goal[] = [];
  loading = false;
  error = '';
  goals$: Observable<Goal[]> | null = null
  apiService: ApiService = inject(ApiService);
  goalService = inject(GoalService);
  private readonly store: Store = inject(Store)

  isEditMode = false;
  goalToEdit?: Goal;

  ngOnInit(): void {
    //this.fetchGoals();
   


    this.goals$ = this.store.select(getGoals)

  }

  /*
  // Fetch all goals for a user
  fetchGoals() {
    this.loading = true;
    this.error = '';
   
    const userId = 'YOUR_USER_ID'; // replace with real userId
    this.apiService.get<Goal[]>(`Goals/user/${userId}`).subscribe({
      next: (data: Goal[]) => {
        this.goals = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err;
        this.loading = false;
      }
    });
  }
    */

  // Toggle right-side panel
  toggleCreatePanel() {
    this.showCreatePanel = !this.showCreatePanel;
    if (!this.showCreatePanel) {
      this.cancelEdit(); // reset when panel closes
    }
  }

  // Handle create
  handleGoalCreated(goal: Goal) {
    this.goals.push(goal);
    this.toggleCreatePanel();
  }

  // Handle update
  handleGoalUpdated(updatedGoal: Goal) {
    const index = this.goals.findIndex(g => g.id === updatedGoal.id);
    if (index !== -1) {
      this.goals[index] = updatedGoal;
    }
    this.toggleCreatePanel();
  }

  // Switch into edit mode
  editGoal(goal: Goal) {
    this.isEditMode = true;
    this.goalToEdit = { ...goal };
    this.showCreatePanel = true;
  }

  // Cancel edit and go back to create mode
  cancelEdit() {
    this.isEditMode = false;
    this.goalToEdit = undefined;
  }

  // Delete goal
  deleteGoal(goalId: string) {
    this.goals = this.goals.filter(g => g.id !== goalId);
    this.cancelEdit();
  }

  // Optional: view details
  viewGoal(goalId: string) {
    // Implement routing if needed
  }
}
