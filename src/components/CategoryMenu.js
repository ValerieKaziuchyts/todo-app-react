import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCategory, deleteAllCategoryTasks } from '../state-management/actions';
import { EditCategory } from './EditCategory';

const CategoryMenuComponent = ({
  setOpenMenu,
  categoryId,
  categoryName,
  categoryBorderColor,
  deleteCategory,
  deleteAllCategoryTasks,
}) => {
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [modalBlockDeleteValue, setModalBlockDeleteValue] = useState(false);

  const onCancelYesDelete = () => {
    deleteCategory(categoryId);
    deleteAllCategoryTasks(categoryId);
    setModalBlockDeleteValue(false);
    setOpenMenu(false);
  };

  const onCancelNoDelete = () => {
    setModalBlockDeleteValue(false);
    setOpenMenu(false);
  };

  const categoryMenuRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={categoryMenuRef}>
      <div className="menu-container">
        <button className="horizontal-menu-container" type="button" onClick={() => setOpenEditCategory(!openEditCategory)}>
          <img src="./assets/img/pencil.svg" alt="pencil button" />
          <div className="option-name">Edit category</div>
        </button>
        <button className="horizontal-menu-container" type="button" onClick={() => setModalBlockDeleteValue(true)}>
          <img src="./assets/img/bin.svg" alt="bin button" />
          <div className="option-name">Delete with all tasks</div>
        </button>
      </div>
      {openEditCategory
      && (
        <EditCategory
          setOpenMenu={setOpenMenu}
          setOpenEditCategory={setOpenEditCategory}
          categoryId={categoryId}
          categoryName={categoryName}
          categoryBorderColor={categoryBorderColor}
        />
      )}
      {modalBlockDeleteValue
        && (
          <div className="edit-modal-container-category">
            <div className="inner-text-container">
              <div className="block-name">Are you sure?</div>
              <div className="message-description">This action will not be undone.</div>
            </div>
            <div className="bottom-btns-panel">
              <button className="cancel-btn" onClick={onCancelNoDelete} type="button">No</button>
              <button className="save-btn" onClick={onCancelYesDelete} type="button">Yes</button>
            </div>
          </div>
        )}
    </div>
  );
};

CategoryMenuComponent.propTypes = {
  setOpenMenu: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
  categoryBorderColor: PropTypes.string.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  deleteAllCategoryTasks: PropTypes.func.isRequired,
};

export const CategoryMenu = connect(null, {
  deleteCategory, deleteAllCategoryTasks,
})(CategoryMenuComponent);
