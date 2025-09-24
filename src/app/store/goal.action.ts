import { createAction, props } from "@ngrx/store";
import { Goal, Token, UserMessage } from "../models/interfaceType";

export enum GoalConfigAction
{
    loadGoal="Load Goal",
    loadGoalSuccess="[Goal] Load Goal Sucess",
    loadGoalFail="[Goal] Load Goal Failed",
    setIsLoading="[boolean] Set IsLoading",
    getGoalById="[Goal] Get Goal By Id",
    setToken="[Token] Set Token",
    loadMessages="[UserMessage] Load Message",
    addMessage="[UserMessage] Add Message",
}


export const loadGoal= createAction(GoalConfigAction.loadGoal);
export const loadGoalSuccess= createAction(GoalConfigAction.loadGoalSuccess, props<{goals:Goal[]}>());
export const loadGoalFail= createAction(GoalConfigAction.loadGoalFail,props<{error:string}>());
export const setIsLoading= createAction(GoalConfigAction.setIsLoading);
export const setToken = createAction(GoalConfigAction.setToken, props<{token:Token}>());
export const addMessage = createAction(
  GoalConfigAction.addMessage,
  props<{ message: UserMessage }>()
);

export const loadMessages = createAction(
 GoalConfigAction.loadMessages,
  props<{ messages: UserMessage[] }>()
);