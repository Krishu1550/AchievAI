import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import { goalReducer, GoalStore } from "./goal.reducer";

export const featureKey = 'goalStore'
export const selectCryptoState = createFeatureSelector<GoalStore>(featureKey);
export const getGoals= createSelector(selectCryptoState,(state)=>{return state.goals});
export const getGoalFetchError= createSelector(selectCryptoState,(state)=>{return state.errors});
export const getGoalIsLoading= createSelector(selectCryptoState,(state)=>{return state.isLoading });
export const getGoalById=(goalId:string)=>createSelector(selectCryptoState,(state)=>{return state.goals.find(g=>g.id===goalId)})
export const getActionByGoalId=(goalId:string)=>createSelector(selectCryptoState,(state)=>{const goal = state.goals.find(g => g.id === goalId);
    return goal?.actions ?? [];})
export const getResourceByGoalId=(goalId:string)=>createSelector(selectCryptoState,(state)=>{const goal = state.goals.find(g => g.id === goalId);
    return goal?.resources ?? [];})
export const getToken=createSelector(selectCryptoState,(state)=>{return state.token})
export const getMessages=createSelector(selectCryptoState,(state)=>{return state.messages})

export const AppState={
[featureKey]:goalReducer
}