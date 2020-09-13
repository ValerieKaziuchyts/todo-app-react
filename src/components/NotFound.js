import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import '../assets/CSS/NotFound.css';

const NotFound = () => {
  const [redirect, setRedirect] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const time = setTimeout(() => { if (timer > 0) { setTimer(timer - 1); } }, 1000);
    const timeout = setTimeout(() => { if (timer === 0) { setRedirect(true); } }, 0);

    return () => {
      clearTimeout(timeout);
      clearTimeout(time);
    };
  }, [timer]);

  return (

    <div className="notFoundPage">
      <img className="seoImg" src="./assets/img/page_not_found.svg" alt="error 404" />
      <span className="notFoundBoldText">We can’t seem to find the page you’re looking for.</span>
      <span className="notFoundHome">
        Return to Home page in
        <span className="greenNumbers">
          {' '}
          {timer}
        </span>
        .
      </span>
      {redirect ? <Redirect to="/" /> : null}
    </div>
  );
};

export { NotFound };
