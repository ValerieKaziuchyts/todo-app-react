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

const idTask = () => {
  const id = `t${(Math.floor(Math.random() * (999999999 - 111111111 + 1)) + 111111111)}`;
  return id;
};
const createId = () => {
  const id = Math.floor(Math.random() * (999999999 - 111111111 + 1)) + 111111111;
  return id;
};

const mathRandom = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};
const taskColors = [
  '#9585C4', '#DD839F', '#FFCCBB', '#EEC3DC', '#AE3C6D', '#F87956', '#E9C16A',
  '#A2D5D8', '#64A2AD', '#0B5EAC', '#D586E2', '#B8CF69', '#2D4A1A', '#AD81DA',
];
const categoryColors = [
  '#FFCD0A', '#F8A039', '#F96F1E', '#EF3B3F', '#FF97DC', '#DD51A7', '#A3419B',
  '#5D2787', '#40B6E1', '#3884CA', '#4348A2', '#1AB2AA', '#98D04E', '#4FBD5F',
];

export const addTask = (
  taskName,
  taskCategory,
  taskDeadline,
  taskResponsiblePerson,
  taskDescription,
  taskLinks,
) => ({
  type: ADD_TASK,
  payload: {
    taskId: idTask(),
    taskName,
    taskCategory,
    taskDeadline,
    taskResponsiblePerson,
    taskDescription,
    taskLinks,
    taskProgress: 'Active',
    taskIconColor: taskColors[mathRandom(0, 13)],
    showOnTaskListPage: true,
    showOnSearchPage: true,
  },
});

export const editTask = (
  taskId,
  taskName,
  taskIconColor,
  taskCategory,
  taskDeadline,
  taskResponsiblePerson,
  taskDescription,
  taskLinks,
) => ({
  type: EDIT_TASK,
  payload: {
    taskId,
    newInfo: {
      taskName,
      taskIconColor,
      taskCategory,
      taskDeadline,
      taskResponsiblePerson,
      taskDescription,
      taskLinks,
    },
  },
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: {
    taskId,
  },
});

export const changeTaskStatus = (taskId, taskProgress) => ({
  type: CHANGE_TASK_STATUS,
  payload: {
    taskId,
    taskProgress,
  },
});

export const clearAllProgressCategoryTasks = (taskProgress) => ({
  type: CLEAR_ALL,
  payload: {
    taskProgress,
  },
});

export const addCategory = (categoryName) => ({
  type: ADD_CATEGORY,
  payload: {
    categoryId: createId(),
    categoryName,
    categoryBorderColor: categoryColors[mathRandom(0, 13)],
  },
});

export const addSubcategory = (categoryName, categoryParentId) => ({
  type: ADD_SUBCATEGORY,
  payload: {
    categoryId: createId(),
    categoryName,
    categoryParent: categoryParentId,
  },
});

export const editCategory = (
  categoryId,
  categoryName,
  categoryBorderColor,
) => ({
  type: EDIT_CATEGORY,
  payload: {
    categoryId,
    newInfo: {
      categoryName,
      categoryBorderColor,
    },
  },
});

export const deleteCategory = (categoryId) => ({
  type: DELETE_CATEGORY,
  payload: {
    categoryId,
  },
});

export const deleteAllCategoryTasks = (categoryId) => ({
  type: DELETE_ALL_CATEGORY_TASKS,
  payload: {
    categoryId,
  },
});

export const saveSettings = (
  taskListActive,
  taskListInProgress,
  taskListDone,
  settingsActive,
  settingsInProgress,
  settingsDone,
  autoDeleteEmptyCategory,
  displayEmptyCategories,
) => ({
  type: SAVE_SETTINGS,
  payload: {
    taskListActive,
    taskListInProgress,
    taskListDone,
    settingsActive,
    settingsInProgress,
    settingsDone,
    autoDeleteEmptyCategory,
    displayEmptyCategories,
  },
});

export const changeShowValue = (taskProgress, showOnTaskListPage, showOnSearchPage) => ({
  type: CHANGE_SHOW_VALUE,
  payload: {
    taskProgress,
    settings: {
      showOnTaskListPage,
      showOnSearchPage,
    },
  },
});

export const changeShowValueForTask = (taskId, showOnTaskListPage, showOnSearchPage) => ({
  type: CHANGE_SHOW_VALUE_FOR_TASK,
  payload: {
    taskId,
    settings: {
      showOnTaskListPage,
      showOnSearchPage,
    },
  },
});
