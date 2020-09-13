import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TaskRow } from './TaskRow';

const SearchComponent = ({ searchValue, taskList }) => {
  const filteredTask = taskList.filter((task) => task.showOnSearchPage === true);

  const taskToRender = useMemo(() => {
    const result = filteredTask.filter((item) => (
      item.taskName.toLowerCase().includes(searchValue.toLowerCase())
    ), [searchValue]);
    return result;
  }, [searchValue]);

  return (
    <div className="main-container">
      <div>
        {taskToRender && taskToRender.map((task) => (
          <TaskRow task={task} key={task.taskId} categoryName={task.taskCategory} />
        ))}
      </div>
    </div>
  );
};

SearchComponent.propTypes = {
  taskList: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchValue: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  taskList: state.taskList,
});

export const Search = connect(mapStateToProps)(SearchComponent);
