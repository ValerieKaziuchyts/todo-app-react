import React, { useState, useMemo, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { store } from '../state-management';
import { addTask, addCategory, addSubcategory } from '../state-management/actions';
import '../assets/CSS/NewTask.css';

const NewTaskComponent = ({
  addTask, addCategory, addSubcategory, categoryList,
}) => {
  const [taskNameValue, setTaskNameValue] = useState('');
  const [taskCategoryValue, setTaskCategoryValue] = useState('');
  // const [taskSubcategoryValue, setTaskSubategoryValue] = useState('');
  const [taskDeadlineValue, setTaskDeadlineValue] = useState('');
  const [taskResponsiblePersonValue, setTaskResponsiblePersonValue] = useState('');
  const [taskDescriptionValue, setTaskDescriptionValue] = useState('');
  const [taskLinksValue, setTaskLinksValue] = useState('');

  const [taskNameInputClassName, setTaskNameInputClassName] = useState('input-long');

  const [modalBlockValue, setModalBlockValue] = useState(false);
  const [emptyInputsValue, setEmptyInputsValue] = useState(true);

  const [categoryListHint, setCategoryListHint] = useState(false);
  // const [addSubcategoryInput, setAddSubcategoryInput] = useState(false);

  const categoriesToRender = useMemo(() => {
    const result = categoryList.filter((item) => (
      item.categoryName.toLowerCase().includes(taskCategoryValue.toLowerCase())
    ), [taskCategoryValue]);
    return result;
  }, [taskCategoryValue]);

  const categoryHintRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (categoryHintRef.current && !categoryHintRef.current.contains(event.target)) {
        setCategoryListHint(false);
      }
    };

    document.addEventListener('mousedown', handler);
  }, []);

  const onChangeTaskNameValue = (event) => {
    setTaskNameValue(event.target.value);
    if (event.target.value !== '') {
      setEmptyInputsValue(false);
      setTaskNameInputClassName('input-long');
    } else {
      setEmptyInputsValue(true);
    }
  };

  const saveTask = (categoryId) => {
    addTask(
      taskNameValue,
      categoryId,
      taskDeadlineValue,
      taskResponsiblePersonValue,
      taskDescriptionValue,
      taskLinksValue,
    );
    setTaskNameValue('');
    setTaskCategoryValue('');
    setTaskDeadlineValue('');
    setTaskResponsiblePersonValue('');
    setTaskDescriptionValue('');
    setTaskLinksValue('');
    setEmptyInputsValue(true);
  };

  const onSave = () => {
    if (taskNameValue) {
      if (taskCategoryValue) {
        const doesCategoryExist = categoryList.find((item) => (
          item.categoryName === taskCategoryValue
        ));
        if (!doesCategoryExist) {
          addCategory(taskCategoryValue);
          const list = store.getState().categoryList;
          const category = list.find((item) => item.categoryName === taskCategoryValue);
          const { categoryId } = category;
          saveTask(categoryId);
        } else {
          saveTask(doesCategoryExist.categoryId);
        }
      } else {
        saveTask('');
      }
    } else {
      setTaskNameInputClassName('input-long empty-input');
    }
  };

  const onCancel = () => {
    setModalBlockValue(true);
  };

  const onCancelYes = () => {
    setModalBlockValue(false);
    setTaskNameValue('');
    setTaskCategoryValue('');
    setTaskDeadlineValue('');
    setTaskResponsiblePersonValue('');
    setTaskDescriptionValue('');
    setTaskLinksValue('');
    setEmptyInputsValue(true);
  };

  const onCancelNo = () => {
    setModalBlockValue(false);
  };

  return (
    <div className="main-container">
      {modalBlockValue
        && (
        <div className="modal-container">
          <div className="inner-text-container">
            <div className="block-name">Are you sure?</div>
            <div className="message-description">The task will not be saved.</div>
          </div>
          <div className="bottom-btns-panel">
            <button className="cancel-btn" onClick={onCancelNo} type="button">No</button>
            <button className="save-btn" onClick={onCancelYes} type="button">Yes</button>
          </div>
        </div>
        )}
      <div className="container-bgr">
        <div className="block-name">Create a task</div>
        <div className="inputs-container">
          <div className="horizontal-container">
            <div className="input-name">Task name:</div>
            <input
              className={taskNameInputClassName}
              value={taskNameValue}
              onChange={onChangeTaskNameValue}
            />
          </div>
          <div className="horizontal-container" ref={categoryHintRef}>
            <div className="input-name">Category:</div>
            <input
              className="input-short"
              value={taskCategoryValue}
              onChange={(event) => {
                setTaskCategoryValue(event.target.value);
              }}
              onFocus={() => {
                setCategoryListHint(true);
              }}
            />
            <button className="category-plus-btn" type="button">
              <img src="./assets/img/plus_btn.png" alt="plus button" />
            </button>
            {categoryListHint
            && (
              <div className="categories-container">
                {categoriesToRender && categoriesToRender.map((category) => (
                  <button
                    className="category-search-name"
                    key={category.categoryId}
                    onClick={() => {
                      setTaskCategoryValue(category.categoryName);
                    }}
                    type="button"
                  >
                    {category.categoryName}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* {addSubcategoryInput && (
            <div className="horizontal-container">
              <div className="input-name">Subcategory:</div>
              <input
                className="input-short"
                value={taskSubcategoryValue}
                onChange={(event) => {
                  setTaskSubategoryValue(event.target.value);
                }}
              />
            </div>
          )} */}
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
          <button className="cancel-btn" onClick={onCancel} disabled={emptyInputsValue} type="button">Cancel</button>
          <button className="save-btn" onClick={onSave} type="button">Save</button>
        </div>
      </div>
    </div>
  );
};

NewTaskComponent.propTypes = {
  addTask: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  addSubcategory: PropTypes.func.isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  categoryList: state.categoryList,
});

export const NewTask = connect(mapStateToProps, {
  addTask, addCategory, addSubcategory,
})(NewTaskComponent);
