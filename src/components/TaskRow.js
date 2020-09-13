import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TaskDescription } from './TaskDescription';

const TaskRowComponent = ({ task, categoryList, categoryName }) => {
  const [taskInfoIdValue, setTaskInfoIdValue] = useState('');
  const [showTaskInfo, setShowTaskInfo] = useState(false);

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

  let taskStatusStyle;
  switch (task.taskProgress) {
    case 'Active': {
      taskStatusStyle = 'task-status-active';
      break;
    }
    case 'In progress': {
      taskStatusStyle = 'task-status-inProgress';
      break;
    }
    case 'Done': {
      taskStatusStyle = 'task-status-done';
      break;
    }
    default: taskStatusStyle = 'task-status-active';
  }

  const TaskIcon = styled.div`
    background-color: ${task.taskIconColor};
  `;

  return (
    <div ref={descriptionRef}>
      <div className="task-brg-container" onDoubleClick={() => showInfo(task.taskId)}>
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
        <div className={taskStatusStyle}>{task.taskProgress}</div>
      </div>

      {showTaskInfo
        && <TaskDescription taskId={taskInfoIdValue} showTaskInfo={showTaskInfo} iconColor={task.taskIconColor} />}
    </div>
  );
};

TaskRowComponent.propTypes = {
  task: PropTypes.object.isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryName: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  categoryList: state.categoryList,
});

export const TaskRow = connect(mapStateToProps)(TaskRowComponent);
