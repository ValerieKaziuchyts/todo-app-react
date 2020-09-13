import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { store } from '../state-management';
import { addCategory, editTask } from '../state-management/actions';
import '../assets/CSS/NewTask.css';

const EditTaskComponent = ({
  task, editTask, setEditTaskModalValue, taskCategory, categoryList, addCategory,
}) => {
  const [taskNameValue, setTaskNameValue] = useState(task.taskName);
  const [taskColorValue, setTaskColorValue] = useState(task.taskIconColor);
  const [taskCategoryValue, setTaskCategoryValue] = useState(taskCategory);
  const [taskDeadlineValue, setTaskDeadlineValue] = useState(task.taskDeadline);
  const [
    taskResponsiblePersonValue,
    setTaskResponsiblePersonValue,
  ] = useState(task.taskResponsiblePerson);
  const [taskDescriptionValue, setTaskDescriptionValue] = useState(task.taskDescription);
  const [taskLinksValue, setTaskLinksValue] = useState(task.taskLinks);

  const [modalBlockValue, setModalBlockValue] = useState(false);

  const [taskNameInputClassName, setTaskNameInputClassName] = useState('input-long');

  const onChangeTaskNameValue = (event) => {
    setTaskNameValue(event.target.value);
    if (event.target.value !== '') {
      setTaskNameInputClassName('input-long');
    }
  };

  const onSave = () => {
    let taskCategoryId;
    if (taskNameValue === '') {
      setTaskNameInputClassName('input-long empty-input');
    } else {
      if (taskCategoryValue) {
        const categoryItem = categoryList.find((category) => (
          category.categoryName === taskCategoryValue));
        if (categoryItem) {
          taskCategoryId = categoryItem.categoryId;
        } else {
          addCategory(taskCategoryValue);
          const list = store.getState().categoryList;
          const category = list.find((item) => item.categoryName === taskCategoryValue);
          const { categoryId } = category;
          taskCategoryId = categoryId;
        }
      }
      if (taskColorValue === '') {
        editTask(
          task.taskId,
          taskNameValue,
          task.taskIconColor,
          taskCategoryId,
          taskDeadlineValue,
          taskResponsiblePersonValue,
          taskDescriptionValue,
          taskLinksValue,
        );
      } else {
        editTask(
          task.taskId,
          taskNameValue,
          taskColorValue,
          taskCategoryId,
          taskDeadlineValue,
          taskResponsiblePersonValue,
          taskDescriptionValue,
          taskLinksValue,
        );
      }

      setEditTaskModalValue(false);
    }
  };

  let categoryNameValue = taskCategory;

  if (!categoryNameValue) {
    categoryNameValue = '';
  } else if (typeof categoryNameValue === 'number') {
    const category = categoryList.find((item) => (
      item.categoryId === categoryNameValue
    ));
    categoryNameValue = category.categoryName;
  }

  const onCancel = () => {
    if (
      task.taskName !== taskNameValue
      || task.taskIconColor !== taskColorValue
      || categoryNameValue !== taskCategoryValue
      || task.taskDeadline !== taskDeadlineValue
      || task.taskResponsiblePerson !== taskResponsiblePersonValue
      || task.taskDescription !== taskDescriptionValue
      || task.taskLinks !== taskLinksValue
    ) {
      setModalBlockValue(true);
    } else {
      setEditTaskModalValue(false);
    }
  };

  const onCancelYes = () => {
    setModalBlockValue(false);
    setEditTaskModalValue(false);
  };

  const onCancelNo = () => {
    setModalBlockValue(false);
  };

  return (
    <>
      {modalBlockValue
        && (
        <div className="edit-modal-container">
          <div className="inner-text-container">
            <div className="block-name">Are you sure?</div>
            <div className="message-description">The changes will not be saved.</div>
          </div>
          <div className="bottom-btns-panel">
            <button className="cancel-btn" onClick={onCancelNo} type="button">No</button>
            <button className="save-btn" onClick={onCancelYes} type="button">Yes</button>
          </div>
        </div>
        )}

      <div className="edit-container-bgr">
        <div className="block-name">Edit the task</div>
        <div className="inputs-container">
          <div className="horizontal-container">
            <div className="input-name">Task name:</div>
            <input
              className={taskNameInputClassName}
              value={taskNameValue}
              onChange={onChangeTaskNameValue}
            />
          </div>
          <div className="horizontal-container">
            <div className="input-name">Task color:</div>
            <input
              className={taskNameInputClassName}
              value={taskColorValue}
              onChange={(event) => {
                setTaskColorValue(event.target.value);
              }}
            />
          </div>
          <div className="horizontal-container">
            <div className="input-name">Category:</div>
            <input
              className="input-short"
              value={taskCategoryValue}
              onChange={(event) => {
                setTaskCategoryValue(event.target.value);
              }}
            />
            <button className="category-plus-btn" type="button">
              <img src="./assets/img/plus_btn.png" alt="plus button" />
            </button>
          </div>
          <div className="horizontal-container">
            <div className="input-name">Deadline:</div>
            <input
              className="input-short"
              type="date"
              value={taskDeadlineValue}
              onChange={(event) => {
                setTaskDeadlineValue(event.target.value);
              }}
            />
          </div>
          <div className="horizontal-container">
            <div className="input-name">Responsible person:</div>
            <input
              className="input-short"
              value={taskResponsiblePersonValue}
              onChange={(event) => {
                setTaskResponsiblePersonValue(event.target.value);
              }}
            />
          </div>
          <div className="horizontal-container">
            <div className="input-name">Description:</div>
            <textarea
              className="description-area"
              value={taskDescriptionValue}
              onChange={(event) => {
                setTaskDescriptionValue(event.target.value);
              }}
            />
          </div>
          <div className="horizontal-container">
            <div className="input-name">Links:</div>
            <input
              className="input-long"
              value={taskLinksValue}
              onChange={(event) => {
                setTaskLinksValue(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="bottom-btns-panel">
          <button className="cancel-btn" onClick={onCancel} type="button">Cancel</button>
          <button className="save-btn" onClick={onSave} type="button">Save</button>
        </div>
      </div>
    </>
  );
};

EditTaskComponent.propTypes = {
  task: PropTypes.object.isRequired,
  editTask: PropTypes.func.isRequired,
  setEditTaskModalValue: PropTypes.func.isRequired,
  taskCategory: PropTypes.any.isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
  addCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categoryList: state.categoryList,
});

export const EditTask = connect(mapStateToProps, { editTask, addCategory })(EditTaskComponent);
