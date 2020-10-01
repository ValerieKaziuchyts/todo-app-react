import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Redirect, Route, NavLink, Switch,
} from 'react-router-dom';
import { NewTask } from './NewTask';
import { TaskList } from './TaskList';
import { TaskProgress } from './TaskProgress';
import { Search } from './Search';
import { Settings } from './Settings';
import { NotFound } from './NotFound';
import '../assets/CSS/App.css';

const AppComponent = () => {
  const [searchValue, setSearchValue] = useState('');
  const saveValue = useCallback((event) => setSearchValue(event.target.value), []);
  const [redirect, setRedirect] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const redirectToSearchPage = (event) => {
    event.preventDefault();
    setRedirect(true);
  };

  return (
    <>
      <aside className="sidebar">
        <div className="logo-container">
          <img className="logo" src="./assets/img/logo.svg" alt="task app logo" />
        </div>
        <NavLink exact to="/" className="router-link" activeClassName="active">
          <button className="menu-button" type="button">
            <img className="menu-button-img" src="./assets/img/task_list.svg" alt="task list button" />
            <span className="menu-button-name">Task List</span>
          </button>
        </NavLink>
        <NavLink exact to="/new_task" className="router-link" activeClassName="active">
          <button className="menu-button" type="button">
            <img className="menu-button-img" src="./assets/img/new_task.svg" alt="new task button" />
            <span className="menu-button-name">New Task</span>
          </button>
        </NavLink>
        <NavLink exact to="/task_progress" className="router-link" activeClassName="active">
          <button className="menu-button" type="button">
            <img className="menu-button-img" src="./assets/img/task_progress.svg" alt="task progress button" />
            <span className="menu-button-name">Task Progress</span>
          </button>
        </NavLink>
        <button className="settings-btn" type="button" onClick={() => setOpenSettings(!openSettings)}>
          <img src="./assets/img/bytesize_settings.svg" alt="settings button" />
        </button>
      </aside>
      <div className="block-right">
        <header>
          <form onSubmit={redirectToSearchPage}>
            <input
              className="search-input"
              value={searchValue}
              onChange={saveValue}
            />
          </form>
          <div className="sign-btns-container">
            <button className="sign-in-button" type="button">Sign in</button>
            <button className="sign-up-button" type="button">Sign up</button>
          </div>
        </header>
        <Switch>
          <Route exact path="/">
            <TaskList />
          </Route>
          <Route exact path="/new_task">
            <NewTask />
          </Route>
          <Route exact path="/task_progress">
            <TaskProgress />
          </Route>
          <Route exact path="/task_search">
            <Search searchValue={searchValue} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        {redirect ? <Redirect to="/task_search" /> : null}
        {openSettings ? <Settings setOpenSettings={setOpenSettings} /> : null}
      </div>
    </>
  );
};

export const App = connect()(AppComponent);
