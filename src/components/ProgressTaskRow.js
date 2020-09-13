import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { deleteTask } from '../state-management/actions';
import { TaskDescription } from './TaskDescription';
import { EditTask } from './EditTask';

const ProgressTaskRowComponent = ({
  task, deleteTask, categoryList, categoryName, index,
}) => {
  const [taskInfoIdValue, setTaskInfoIdValue] = useState('');
  const [showTaskInfo, setShowTaskInfo] = useState(false);
  const [editTaskModalValue, setEditTaskModalValue] = useState(false);

  const showInfo = (taskId) => {
    setTaskInfoIdValue(taskId);
    setShowTaskInfo(true);
  };

  const descriptionRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (descriptionRef.current && !descriptionRef.current.contains(event.target)) {
        setShowTaskInfo(false);
      }
    };

    document.addEventListener('mousedown', handler);
  }, []);

  let categoryNameValue = categoryName;

  if (!categoryNameValue) {
    categoryNameValue = '';
  } else if (typeof categoryNameValue === 'number') {
    const category = categoryList.find((item) => (
      item.categoryId === categoryNameValue
    ));
    categoryNameValue = category.categoryName;
  }

  const TaskIcon = styled.div`
    background-color: ${task.taskIconColor};
  `;

  return (
    <div ref={descriptionRef}>
      <Draggable key={task.taskId} draggableId={(task.taskId)} index={index}>
        {(provided) => (
          <div
            className="task-brg-container"
            onDoubleClick={() => showInfo(task.taskId)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="first-block">
              <TaskIcon className="task-icon" />
              <div className="vertical-block">
                <div className="task-category">{categoryNameValue}</div>
                <div className="task-name">{task.taskName}</div>
                <div className="task-deadline">
                  {task.taskDeadline && `Deadline: ${task.taskDeadline}`}
                </div>
              </div>
            </div>
            <div className="options-container">
              <button className="edit-btn" onClick={() => setEditTaskModalValue(true)} type="button">
                <img src="./assets/img/pencil.svg" alt="pencil button" />
              </button>
              <button onClick={() => deleteTask(task.taskId)} type="button">
                <img src="./assets/img/bin.svg" alt="bin button" />
              </button>
            </div>
          </div>
        )}
      </Draggable>

      {showTaskInfo
      && (
      <TaskDescription
        taskId={taskInfoIdValue}
        showTaskInfo={showTaskInfo}
        iconColor={task.taskIconColor}
      />
      )}

      {editTaskModalValue
      && (
      <EditTask
        task={task}
        taskCategory={categoryNameValue}
        setEditTaskModalValue={setEditTaskModalValue}
      />
      )}
    </div>
  );
};

ProgressTaskRowComponent.propTypes = {
  task: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryName: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  categoryList: state.categoryList,
});

export const ProgressTaskRow = connect(mapStateToProps, { deleteTask })(ProgressTaskRowComponent);
