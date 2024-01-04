import { Router } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";

export default function CustomRouter({ history, children }) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });
  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

CustomRouter.propTypes = {
  history: PropTypes.shape().isRequired,
  children: PropTypes.shape().isRequired,
};
