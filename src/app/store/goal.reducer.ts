import { createReducer, on } from "@ngrx/store";
import { Goal, GoalStatus, Token, User, UserMessage } from "../models/interfaceType";
import { loadGoal, loadGoalFail, loadGoalSuccess, loadMessages, setIsLoading,  setToken } from "./goal.action";

export interface GoalStore {
  goals: Goal[];
  isLoading: boolean;
  errors: string;
  messages: UserMessage[];
  token: Token | null;
}

export const initialState: GoalStore = {
  goals: [
    {
      "id": "1d9f45a1-9b77-42d4-a2f1-94b50e7f1b10",
      "title": "Learn Angular & NgRx",
      "description": "Build a full project using Angular and NgRx for state management.",
      "duration": "3 months",
      "score": 0.9,
      "goalStatus": GoalStatus.Active,
      "createdAt": "2025-09-11T10:00:00Z",
      "updatedAt": "2025-09-11T10:00:00Z",
      "userId": "7a1f2b9c-4c11-45a3-8c91-32a76dfc4f99",
      "user": {
        "id": "7a1f2b9c-4c11-45a3-8c91-32a76dfc4f99",
        "fullName": "Alice Johnson",
        "email": "alice@example.com",
        "phoneNumber": "+1234567890",
        "country": "USA",
        "city": "New York",
        "imgUrl": "https://example.com/profiles/alice.jpg",
        "avgScore": 0.78,
        "createdAt": "2024-12-01T08:30:00Z"
      },
      "actions": [
        {
          "id": "9f8a2c3d-11e4-48c2-b6f2-1e6b8f9e3c21",
          "title": "Setup Angular project",
          "description": "Initialize Angular project with routing and SCSS",
          "duration": "2 days",
          "createdAt": "2025-09-01T12:00:00Z",
          "goalId": "1d9f45a1-9b77-42d4-a2f1-94b50e7f1b10"
        }
      ],
      "todos": [
        {
          "id": "d234a98b-45c1-4b93-b8b6-87b1f67a12f0",
          "title": "Read NgRx docs",
          "isCompleted": false,
          "createdAt": "2025-09-05T08:00:00Z"
        }
      ],
      "resources": [
        {
          "id": "8c5f0a91-2d56-4c89-955d-f6a9b93d2e91",
          "type": "Article",
          "title": "Official NgRx Documentation",
          "description": "Learn NgRx basics and advanced patterns",
          "duration": null,
          "createdAt": "2025-09-06T09:00:00Z",
          "goalId": "1d9f45a1-9b77-42d4-a2f1-94b50e7f1b10"
        }
      ],
      "achievements": [
        {
          "id": "b4a9d2f1-77d4-44b5-9f31-238b9d2a1c8f",
          "title": "First NgRx Store Setup",
          "remark": "Successfully created store and reducer",
          "score": 20,
          "achievedAt": null,
          "goalId": "1d9f45a1-9b77-42d4-a2f1-94b50e7f1b10"
        }
      ]
    },
    {
      "id": "2a3c56b7-2b89-4c45-bd6e-94a67f8a2135",
      "title": "Run Half Marathon",
      "description": "Train consistently and complete a half marathon.",
      "duration": "6 months",
      "score": 0.7,
      "goalStatus": GoalStatus.Active,
      "createdAt": "2025-07-01T07:30:00Z",
      "updatedAt": "2025-08-20T18:00:00Z",
      "userId": "7a1f2b9c-4c11-45a3-8c91-32a76dfc4f99",
      "user": null,
      "actions": [
        {
          "id": "aaa11111-bbbb-2222-cccc-333333333333",
          "title": "Run 5km weekly",
          "description": "Maintain consistency with short runs",
          "duration": "1 week",
          "createdAt": "2025-07-05T06:00:00Z",
          "goalId": "2a3c56b7-2b89-4c45-bd6e-94a67f8a2135"
        }
      ],
      "todos": [],
      "resources": [
        {
          "id": "99999999-8888-7777-6666-555555555555",
          "type": "Plan",
          "title": "Half Marathon Training Plan",
          "description": "A structured running plan",
          "duration": "24 weeks",
          "createdAt": "2025-07-10T09:00:00Z",
          "goalId": "2a3c56b7-2b89-4c45-bd6e-94a67f8a2135"
        }
      ],
      "achievements": []
    }
  ]


  ,
  isLoading: false,
  errors: "",
  token: null,
  messages: []
};

export const goalReducer = createReducer
  (
    initialState,
    on(loadGoal, (state) => ({
      ...state,
      isLoading: true   // ✅ fixed casing
    })),
    on(loadGoalSuccess, (state, action) => ({
      ...state,
      goals: action.goals,
      isLoading: false,
      errors: ""
    })),
    on(loadGoalFail, (state, action) => ({
      ...state,
      isLoading: false, // ✅ stop loading when failed
      errors: action.error
    })),
    on(setIsLoading, (state) => ({
      ...state,
      isLoading: !state.isLoading // ✅ toggle correctly
    })),
    on(setToken, (state, action) => ({
      ...state,
      token: action.token
    }),

    ),
    on(loadMessages, (state, action) => ({
      ...state,
      messages: [
        ...state.messages,
        ...(Array.isArray(action.messages) ? action.messages : [action.messages])
      ]
    })),

  )

// Note: Ensure that the actions and state properties are consistently named and used.

