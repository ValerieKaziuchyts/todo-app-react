import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TaskRow } from './TaskRow';

const AllTasksComponent = ({ filteredTasks }) => (
  <div className="category-bgr-container">
    <div className="name-option-container">
      <div className="category-name">
        All Tasks
      </div>
      {/* <button className="option-btn" type="button">
        <img src="./assets/img/three_dots.svg" alt="option button" />
      </button> */}
    </div>
    <div className="scroll-container">
      {filteredTasks && filteredTasks.map((task) => (
        <TaskRow
          task={task}
          key={task.taskId}
          categoryName={task.taskCategory}
        />
      ))}
    </div>
  </div>
);

AllTasksComponent.propTypes = {
  filteredTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  taskList: state.taskList,
});

export const AllTasks = connect(mapStateToProps)(AllTasksComponent);
