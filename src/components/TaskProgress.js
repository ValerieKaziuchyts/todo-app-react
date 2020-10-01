import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { changeTaskStatus, changeShowValueForTask } from '../state-management/actions';
import { ProgressCategory } from './ProgressCategory';
import '../assets/CSS/TaskProgress.css';

localStorage.setItem('previousProgressPoint', 0);

const TaskProgressComponent = ({
  taskList,
  settings,
  changeTaskStatus,
  changeShowValueForTask,
}) => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (destination.droppableId !== source.droppableId) {
      changeTaskStatus(draggableId, destination.droppableId);
      if (destination.droppableId === 'Active') {
        changeShowValueForTask(
          draggableId,
          settings.taskListActive,
          settings.settingsActive,
        );
      } else if (destination.droppableId === 'In progress') {
        changeShowValueForTask(
          draggableId,
          settings.taskListInProgress,
          settings.settingsInProgress,
        );
      } else if (destination.droppableId === 'Done') {
        changeShowValueForTask(
          draggableId,
          settings.taskListDone,
          settings.settingsDone,
        );
      }
    }
  };

  const activeTasks = taskList.filter((task) => task.taskProgress === 'Active');
  const inProgressTasks = taskList.filter((task) => task.taskProgress === 'In progress');
  const doneTasks = taskList.filter((task) => task.taskProgress === 'Done');
  const allTasksQuantity = activeTasks.length + inProgressTasks.length + doneTasks.length;

  const progress = ((doneTasks.length + inProgressTasks.length / 2) / allTasksQuantity) * 100;

  const Progress = styled.div`
  width: ${progress}%;
  opacity: 1;
  @keyframes moveProgress {
    0% {
      width: ${localStorage.getItem('previousProgressPoint')}%;
    }
    100% {
      width: ${progress}%;
    }
  }
  `;

  localStorage.setItem('previousProgressPoint', progress);

  return (
    <div className="main-container-task-list">
      <div className="progress">
        <Progress className="progress-done" />
      </div>
      <div className="progress-category-container">
        <DragDropContext onDragEnd={onDragEnd}>
          <ProgressCategory
            tasks={activeTasks}
            categoryName="Active"
            bgColor="#FF6F6F"
            textColor="white"
            id="Active"
          />
          <ProgressCategory
            tasks={inProgressTasks}
            categoryName="In progress"
            bgColor="#FFF174"
            textColor="#FFA800"
            id="In progress"
          />
          <ProgressCategory
            tasks={doneTasks}
            categoryName="Done"
            bgColor="#CAFF86"
            textColor="#5DBB31"
            id="Done"
          />
        </DragDropContext>
      </div>
    </div>

  );
};

TaskProgressComponent.propTypes = {
  taskList: PropTypes.arrayOf(PropTypes.object).isRequired,
  settings: PropTypes.object.isRequired,
  changeTaskStatus: PropTypes.func.isRequired,
  changeShowValueForTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  taskList: state.taskList,
  settings: state.settings,
});

export const TaskProgress = connect(mapStateToProps, {
  changeTaskStatus, changeShowValueForTask,
})(TaskProgressComponent);
