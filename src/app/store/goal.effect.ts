import { inject, Injectable, OnInit } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { GoalService } from "../services/goal/goal-service";
import { loadGoal, loadGoalFail, loadGoalSuccess } from "./goal.action";
import { Goal } from "../models/interfaceType";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class GoalsEffects implements OnInit {

ngOnInit(): void {
  this.userId = localStorage.getItem('userId') || "";
}

actions$ = inject(Actions);
apiService:GoalService= inject(GoalService)
userId:string  = "";
getGoals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGoal), // Listen for loadGoal action
      switchMap(() =>
        this.apiService.getByUserId(this.userId).pipe( // Call API
          map((goals: Goal[]) => loadGoalSuccess({ goals })), // On success
          catchError((error: any) => of(loadGoalFail({ error: error.message }))) // On failure
        )
      )
    )
  );

}