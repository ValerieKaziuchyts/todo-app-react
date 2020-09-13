import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NoTask } from './NoTask';
import { AllTasks } from './AllTasks';
import { CategoryColumn } from './CategoryColumn';
import '../assets/CSS/TaskList.css';

const TaskListComponent = ({ taskList, categoryList }) => {
  const filteredTask = taskList.filter((task) => task.showOnTaskListPage === true);

  return (
    <>
      <div className="main-container-task-list">

        {filteredTask.length === 0 && <NoTask />}

        {filteredTask.length !== 0
            && (
            <AllTasks filteredTasks={filteredTask} />
            )}

        {categoryList.length !== 0
            && (
              categoryList.map((category) => (
                <CategoryColumn
                  categoryId={category.categoryId}
                  categoryName={category.categoryName}
                  key={category.categoryId}
                  categoryBorderColor={category.categoryBorderColor}
                />
              )))}
      </div>
    </>
  );
};

TaskListComponent.propTypes = {
  taskList: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  taskList: state.taskList,
  categoryList: state.categoryList,
});

export const TaskList = connect(mapStateToProps)(TaskListComponent);
