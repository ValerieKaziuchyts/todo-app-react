import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { deleteCategory } from '../state-management/actions';
import { TaskRow } from './TaskRow';
import { CategoryMenu } from './CategoryMenu';

const CategoryColumnComponent = ({
  taskList, categoryId, categoryName, categoryBorderColor, deleteCategory, settings,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const tasks = taskList.filter((task) => task.taskCategory === categoryId);
  if (settings.autoDeleteEmptyCategory) {
    if (tasks.length === 0) {
      deleteCategory(categoryId);
    }
  }
  const filteredTasksBySettings = tasks.filter((task) => task.showOnTaskListPage === true);

  const CategoryContainer = styled.div`
    border-top: 2px solid ${categoryBorderColor};
  `;

  return (
    <>
      {(settings.displayEmptyCategories
        ? filteredTasksBySettings
        : filteredTasksBySettings.length !== 0)
        && (
        <CategoryContainer className="category-bgr-container">
          <div className="name-option-container">
            <div className="category-name">
              {categoryName}
            </div>
            <div className="menu-position-container">
              <button className="option-btn" type="button" onClick={() => setOpenMenu(!openMenu)}>
                <img src="./assets/img/three_dots.svg" alt="option button" />
              </button>
              {openMenu
                && (
                <CategoryMenu
                  setOpenMenu={setOpenMenu}
                  categoryId={categoryId}
                  categoryName={categoryName}
                  categoryBorderColor={categoryBorderColor}
                />
                )}
            </div>
          </div>
          <div className="scroll-container">
            {filteredTasksBySettings && filteredTasksBySettings.map((task) => (
              <TaskRow
                task={task}
                key={task.taskId}
                categoryName={categoryName}
              />
            ))}
          </div>
        </CategoryContainer>
        )}
    </>
  );
};

CategoryColumnComponent.propTypes = {
  taskList: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryId: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
  categoryBorderColor: PropTypes.string.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  taskList: state.taskList,
  settings: state.settings,
});

export const CategoryColumn = connect(mapStateToProps, { deleteCategory })(CategoryColumnComponent);
