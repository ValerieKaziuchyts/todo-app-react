import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editCategory } from '../state-management/actions';
import '../assets/CSS/NewTask.css';

const EditCategoryComponent = ({
  setOpenMenu,
  setOpenEditCategory,
  categoryId,
  categoryName,
  categoryBorderColor,
  categoryList,
  editCategory,
}) => {
  const [categoryNameValue, setCategoryNameValue] = useState(categoryName);
  const [categoryBorderColorValue, setCategoryBorderColorValue] = useState(categoryBorderColor);

  const [modalBlockValue, setModalBlockValue] = useState(false);
  const [categoryInputClassName, setCategoryInputClassName] = useState('input-category-short');

  const category = categoryList.find((item) => item.categoryId === categoryId);

  const onChangeCategoryNameValue = (event) => {
    setCategoryNameValue(event.target.value);
    if (event.target.value !== '') {
      setCategoryInputClassName('input-category-short');
    }
  };

  const onSave = () => {
    if (categoryNameValue && categoryBorderColorValue) {
      editCategory(categoryId, categoryNameValue, categoryBorderColorValue);
      setOpenMenu(false);
    } else if (categoryNameValue !== '' && categoryBorderColorValue === '') {
      editCategory(categoryId, categoryNameValue, categoryBorderColor);
      setOpenMenu(false);
    } else {
      setCategoryInputClassName('input-category-short empty-input');
    }
  };

  const onCancel = () => {
    if (
      categoryNameValue !== category.categoryName
      || categoryBorderColorValue !== category.categoryBorderColor
    ) {
      setModalBlockValue(true);
    } else {
      setOpenEditCategory(false);
      setOpenMenu(false);
    }
  };

  const onCancelYes = () => {
    setModalBlockValue(false);
    setOpenEditCategory(false);
    setOpenMenu(false);
  };

  const onCancelNo = () => {
    setModalBlockValue(false);
  };

  return (
    <>
      {modalBlockValue
        && (
          <div className="edit-modal-container-category">
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

      <div className="edit-container-bgr-category">
        <div className="block-name">Edit the category</div>
        <div className="inputs-container">
          <div className="horizontal-container">
            <div className="input-category-name">Category name:</div>
            <input
              className={categoryInputClassName}
              value={categoryNameValue}
              onChange={onChangeCategoryNameValue}
            />
          </div>
          <div className="horizontal-container">
            <div className="input-category-name">Border color:</div>
            <input
              className="input-category-short"
              value={categoryBorderColorValue}
              onChange={(event) => {
                setCategoryBorderColorValue(event.target.value);
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

EditCategoryComponent.propTypes = {
  setOpenMenu: PropTypes.func.isRequired,
  setOpenEditCategory: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
  categoryBorderColor: PropTypes.string.isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
  editCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categoryList: state.categoryList,
});

export const EditCategory = connect(mapStateToProps, { editCategory })(EditCategoryComponent);
