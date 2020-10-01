import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  CLEAR_ALL,
  CHANGE_TASK_STATUS,
  ADD_CATEGORY,
  ADD_SUBCATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  DELETE_ALL_CATEGORY_TASKS,
  SAVE_SETTINGS,
  CHANGE_SHOW_VALUE,
  CHANGE_SHOW_VALUE_FOR_TASK,
} from '../constants';

const initialState = {
  users: [],
  taskList: [],
  categoryList: [],
  settings: {
    taskListActive: true,
    taskListInProgress: true,
    taskListDone: true,
    settingsActive: true,
    settingsInProgress: true,
    settingsDone: true,
    autoDeleteEmptyCategory: false,
    displayEmptyCategories: false,
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        taskList: [
          ...state.taskList, { ...action.payload },
        ],
      };
    case EDIT_TASK:
      return {
        ...state,
        taskList: state.taskList.map((task) => {
          if (task.taskId === action.payload.taskId) {
            return {
              ...task,
              ...action.payload.newInfo,
            };
          }
          return task;
        }),
      };
    case DELETE_TASK:
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.taskId !== action.payload.taskId),
      };
    case CHANGE_TASK_STATUS:
      return {
        ...state,
        taskList: state.taskList.map((task) => {
          if (task.taskId === action.payload.taskId) {
            return {
              ...task,
              taskProgress: action.payload.taskProgress,
            };
          }
          return task;
        }),
      };
    case CLEAR_ALL:
      return {
        ...state,
        taskList: state.taskList.filter((task) => (
          task.taskProgress !== action.payload.taskProgress
        )),
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categoryList: [
          ...state.categoryList, { ...action.payload },
        ],
      };
    case ADD_SUBCATEGORY:
      return {
        ...state,
        categoryList: [
          ...state.categoryList, { ...action.payload },
        ],
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        categoryList: state.categoryList.map((category) => {
          if (category.categoryId === action.payload.categoryId) {
            return {
              ...category,
              ...action.payload.newInfo,
            };
          }
          return category;
        }),
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categoryList: state.categoryList.filter((category) => (
          category.categoryId !== action.payload.categoryId
        )),
      };
    case DELETE_ALL_CATEGORY_TASKS:
      return {
        ...state,
        taskList: state.taskList.filter((task) => (
          task.taskCategory !== action.payload.categoryId
        )),
      };
    case SAVE_SETTINGS:
      return {
        ...state,
        settings: {
          ...action.payload,
        },
      };
    case CHANGE_SHOW_VALUE:
      return {
        ...state,
        taskList: state.taskList.map((task) => {
          if (task.taskProgress === action.payload.taskProgress) {
            return {
              ...task,
              ...action.payload.settings,
            };
          }
          return task;
        }),
      };
    case CHANGE_SHOW_VALUE_FOR_TASK:
      return {
        ...state,
        taskList: state.taskList.map((task) => {
          if (task.taskId === action.payload.taskId) {
            return {
              ...task,
              ...action.payload.settings,
            };
          }
          return task;
        }),
      };
    default:
      return state;
  }
}
