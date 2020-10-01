import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deleteTask } from '../state-management/actions';
import { EditTask } from './EditTask';
import '../assets/CSS/TaskDescription.css';

const TaskDescriptionComponent = ({
  taskList, categoryList, taskId, deleteTask, iconColor,
}) => {
  const [editTaskModalValue, setEditTaskModalValue] = useState(false);

  const task = taskList.find((item) => item.taskId === taskId);
  const categoryItem = categoryList.find((category) => category.categoryId === task.taskCategory);
  let taskCategory;
  if (categoryItem) {
    taskCategory = categoryItem.categoryName;
  } else {
    taskCategory = '';
  }

  const links = task.taskLinks.split(' ');

  const TaskIcon = styled.div`
    background-color: ${iconColor};
  `;

  return (
    <>
      <div id="taskDescriptionModal" className="task-description-bgr">
        <div className="icon-task-name-container">
          <TaskIcon className="task-icon" />
          <div className="task-semibold-name">{task.taskName}</div>
        </div>
        <div className="info-container">
          <div className="horizontal-container">
            <div className="grey-text">Category:</div>
            <div className="task-info-text">{taskCategory}</div>
          </div>
          <div className="horizontal-container">
            <div className="grey-text">Deadline:</div>
            <div className="task-info-text">{task.taskDeadline}</div>
          </div>
          <div className="horizontal-container">
            <div className="grey-text">Responsible person:</div>
            <div className="task-info-text">{task.taskResponsiblePerson}</div>
          </div>
          <div className="horizontal-container">
            <div className="grey-text">Description:</div>
            <div className="scroll-description-text">{task.taskDescription}</div>
          </div>
          <div className="horizontal-container">
            <div className="grey-text">Links:</div>
            <div className="task-info-text">
              {links && links.map((link) => (
                <a className="links" href={link} key={link}>{link}</a>
              ))}
            </div>
          </div>
          <div className="horizontal-container">
            <div className="grey-text">Status:</div>
            <div className="task-info-text">{task.taskProgress}</div>
          </div>
        </div>
        <div className="bottom-btns-panel">
          <button className="cancel-btn" onClick={() => deleteTask(taskId)} type="button">Delete</button>
          <button className="save-btn" onClick={() => setEditTaskModalValue(true)} type="button">Edit</button>
        </div>
      </div>

      {editTaskModalValue
        && (
        <EditTask
          task={task}
          taskCategory={taskCategory}
          setEditTaskModalValue={setEditTaskModalValue}
        />
        )}
    </>
  );
};

TaskDescriptionComponent.propTypes = {
  taskList: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
  taskId: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
  iconColor: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => ({
  taskList: state.taskList,
  categoryList: state.categoryList,
  taskId: props.taskId,
  showTaskInfo: props.showTaskInfo,
});

export const TaskDescription = connect(mapStateToProps, { deleteTask })(TaskDescriptionComponent);
