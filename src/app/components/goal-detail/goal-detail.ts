import { Component } from '@angular/core';
import {NgCircleProgressModule} from 'ng-circle-progress';
import { Goal } from '../../models/interfaceType';

@Component({
  selector: 'app-goal-detail',
  imports: [NgCircleProgressModule],
  templateUrl: './goal-detail.html',
  styleUrl: './goal-detail.css'
})
export class GoalDetail {

goalId!:string;
goal!:Goal


}
