
export interface Achievement {
    id: string;
    title: string;
    remark: string;
    score: number;
    achievedAt: Date | null;
    goalId: string;    
}

export interface ActionItem {
    id: string;
    title: string;
    description: string | null;
    duration: string | null;
    createdAt: string| null ;
    goalId: string;
   
}


export interface Feedback {
    id: number;
    goalId: string;
    type: FeedbackType;
    message: string;
    chanceToAchieve: number;
    createdAt: string;
    feedbackTodos: Todo[] | null;
}

export enum FeedbackType {
    Suggestion,
    Warning,
    Reminder,
    Critical,
    Danger,
    Info,
    Good,
    Milestone
}


export interface Goal {
    id: string;
    title: string;
    description: string;
    duration: string;
    score: number | null;
    goalStatus: GoalStatus;
    createdAt: string;
    updatedAt: string;
    userId: string;
    user: User | null;
    actions: ActionItem[] | null;
    todos: Todo[] | null;
    resources: Resource[] | null;
    achievements: Achievement[] | null;
}

export enum GoalStatus {
    Active,
    Completed,
    OnHold,
    Failed
}

export interface User {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
    imgUrl: string;
    avgScore: number;
    createdAt: string | null;
}

export interface Todo {
    id: string;
    title: string;
    isCompleted: boolean;
    createdAt: string;
}


export interface Resource {
    id: string;
    type: string;
    title: string;
    description: string;
    duration: string | null;
    createdAt: string;
    goalId: string;
   
}

export interface GoalTodo extends Todo {
    goalId: string | null;
    
}


export interface Token {
    AccessToken: string;
    UserName: string;
    UserId: string; // in seconds
    Role: string[]; // e.g., "Bearer"
    Expiration: Date|null; // in seconds
}

 export interface UserMessage {
  id: string;
  text?: string;
  from: FromOptions;
}

export enum FromOptions {
  user = 'user',
  ai = 'ai'
}

export interface UserMessageRequest  {
    UserId: string;
    HistoryMessage: UserMessage[];
    LatestMessage: UserMessage;
    Language: string;
}
  