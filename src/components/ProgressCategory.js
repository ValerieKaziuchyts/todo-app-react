import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { ProgressTaskRow } from './ProgressTaskRow';
import { clearAllProgressCategoryTasks } from '../state-management/actions';

const ProgressCategoryComponent = ({
  taskList, categoryName, bgColor, textColor, clearAllProgressCategoryTasks, id,
}) => {
  const [modalBlockValue, setModalBlockValue] = useState(false);

  const onCancelYes = () => {
    setModalBlockValue(false);
    clearAllProgressCategoryTasks(taskList[0].taskProgress);
  };

  const onCancelNo = () => {
    setModalBlockValue(false);
  };

  const clearAll = () => {
    if (taskList.length === 0) {
      return false;
    }
    setModalBlockValue(true);
  };

  return (
    <>
      <div className="progress-block-bgr">
        <div className="top-name-block" style={{ backgroundColor: bgColor, color: textColor }}>{categoryName}</div>
        <Droppable droppableId={id}>
          {(provided) => (
            <div
              className="scroll-container"
              ref={provided.innerRef}
            >
              {taskList && taskList.map((task, index) => (
                <ProgressTaskRow
                  task={task}
                  key={task.taskId}
                  categoryName={task.taskCategory}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="bottom-block">
          <div className="grey-light-text">
            Quantity:
            {taskList.length}
          </div>
          <button className="grey-light-text-btn" onClick={clearAll} type="button">Clear All</button>
        </div>
      </div>
      {modalBlockValue
        && (
        <div className="modal-container">
          <div className="inner-text-container">
            <div className="block-name">Are you sure?</div>
            <div className="message-description">All tasks will be deleted.</div>
          </div>
          <div className="bottom-btns-panel">
            <button className="cancel-btn" onClick={onCancelNo} type="button">No</button>
            <button className="save-btn" onClick={onCancelYes} type="button">Yes</button>
          </div>
        </div>
        )}
    </>
  );
};

ProgressCategoryComponent.propTypes = {
  taskList: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryName: PropTypes.any.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  clearAllProgressCategoryTasks: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => ({
  taskList: props.tasks,
  categoryName: props.categoryName,
  bgColor: props.bgColor,
  textColor: props.textColor,
});

export const ProgressCategory = connect(mapStateToProps, {
  clearAllProgressCategoryTasks,
})(ProgressCategoryComponent);
