import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveSettings, changeShowValue } from '../state-management/actions';
import '../assets/CSS/Settings.css';

const SettingsComponent = ({
  settings, saveSettings, changeShowValue, setOpenSettings,
}) => {
  const [taskListActive, setTaskListActive] = useState(settings.taskListActive);
  const [taskListInProgress, setTaskListInProgress] = useState(settings.taskListInProgress);
  const [taskListDone, setTaskListDone] = useState(settings.taskListDone);
  const [settingsActive, setSettingsActive] = useState(settings.settingsActive);
  const [settingsInProgress, setSettingsInProgress] = useState(settings.settingsInProgress);
  const [settingsDone, setSettingsDone] = useState(settings.settingsDone);
  const [
    autoDeleteEmptyCategory, setAutoDeleteEmptyCategory,
  ] = useState(settings.autoDeleteEmptyCategory);
  const [
    displayEmptyCategories, setDisplayEmptyCategories,
  ] = useState(settings.displayEmptyCategories);

  const saveSettingsFunc = () => {
    saveSettings(
      taskListActive,
      taskListInProgress,
      taskListDone,
      settingsActive,
      settingsInProgress,
      settingsDone,
      autoDeleteEmptyCategory,
      displayEmptyCategories,
    );

    changeShowValue('Active', taskListActive, settingsActive);
    changeShowValue('In progress', taskListInProgress, settingsInProgress);
    changeShowValue('Done', taskListDone, settingsDone);

    setOpenSettings(false);
  };

  return (
    <div className="modal-container-settings">
      <div className="inner-text-container">
        <div className="block-name">Settings</div>
        <div className="section-name">Task List</div>
        <div className="dark-text">What kind of tasks do you like to see on the page “Task List”?</div>
        <div className="inputs-container-settings">
          <input
            type="checkbox"
            id="active-task-list"
            checked={taskListActive}
            onChange={() => setTaskListActive(!taskListActive)}
          />
          <label className="label-text" htmlFor="active-task-list">Active</label>
          <input
            type="checkbox"
            id="in-progress-task-list"
            checked={taskListInProgress}
            onChange={() => setTaskListInProgress(!taskListInProgress)}
          />
          <label className="label-text" htmlFor="in-progress-task-list">In progress</label>
          <input
            type="checkbox"
            id="done-task-list"
            checked={taskListDone}
            onChange={() => setTaskListDone(!taskListDone)}
          />
          <label className="label-text" htmlFor="done-task-list">Done</label>
        </div>
        <div className="dark-text">Do you want the empty category automatically to be deleted?</div>
        <div className="inputs-container-settings">
          <label className="label-text">
            <input
              type="radio"
              name="auto-delete"
              checked={autoDeleteEmptyCategory}
              onChange={() => setAutoDeleteEmptyCategory(!autoDeleteEmptyCategory)}
            />
            Yes
          </label>
          <label className="label-text">
            <input
              type="radio"
              name="auto-delete"
              checked={!autoDeleteEmptyCategory}
              onChange={() => setAutoDeleteEmptyCategory(!autoDeleteEmptyCategory)}
            />
            No
          </label>
        </div>
        <div className="dark-text">Do you want empty categories to be displayed?</div>
        <div className="inputs-container-settings">
          <label className="label-text">
            <input
              type="radio"
              name="display-empty-categories"
              checked={displayEmptyCategories}
              onChange={() => setDisplayEmptyCategories(!displayEmptyCategories)}
            />
            Yes
          </label>
          <label className="label-text">
            <input
              type="radio"
              name="display-empty-categories"
              checked={!displayEmptyCategories}
              onChange={() => setDisplayEmptyCategories(!displayEmptyCategories)}
            />
            No
          </label>
        </div>
        <div className="section-name">Search Page</div>
        <div className="dark-text">What kind of tasks do you like to see on the page “Search”?</div>
        <div className="inputs-container-settings">
          <input
            type="checkbox"
            id="active-search"
            checked={settingsActive}
            onChange={() => setSettingsActive(!settingsActive)}
          />
          <label className="label-text" htmlFor="active-search">Active</label>
          <input
            type="checkbox"
            id="in-progress-search"
            checked={settingsInProgress}
            onChange={() => setSettingsInProgress(!settingsInProgress)}
          />
          <label className="label-text" htmlFor="in-progress-search">In progress</label>
          <input
            type="checkbox"
            id="done-search"
            checked={settingsDone}
            onChange={() => setSettingsDone(!settingsDone)}
          />
          <label className="label-text" htmlFor="done-search">Done</label>
        </div>
      </div>
      <div className="bottom-btns-panel">
        <button className="save-btn-settings" type="button" onClick={saveSettingsFunc}>Save</button>
      </div>
    </div>
  );
};

SettingsComponent.propTypes = {
  settings: PropTypes.object.isRequired,
  saveSettings: PropTypes.func.isRequired,
  changeShowValue: PropTypes.func.isRequired,
  setOpenSettings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

export const Settings = connect(mapStateToProps, {
  saveSettings, changeShowValue,
})(SettingsComponent);
