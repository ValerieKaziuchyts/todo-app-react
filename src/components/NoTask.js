import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const NoTask = () => {
  const [redirect, setRedirect] = useState(false);

  return (
    <>
      <div className="message-bgr-container">
        <div className="category-name">There is no task.</div>
        <div className="light-text">Let&apos;s create it now!</div>
        <button className="sign-in-button" onClick={() => setRedirect(true)} type="button">Create a task</button>
      </div>
      {redirect ? <Redirect to="/new_task" /> : null}
    </>
  );
};

export { NoTask };
