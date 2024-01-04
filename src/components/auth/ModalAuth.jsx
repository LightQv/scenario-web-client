import { useRef, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotForm from "./ForgotForm";
import PropTypes from "prop-types";
import CloseSvg from "../svg/nav/CloseSvg";

export default function ModalAuth({ showAuth, setShowAuth }) {
  const [form, setForm] = useState({
    login: true,
    register: false,
    reset: false,
  });
  const formRef = useRef(null);

  const closeModal = (e) => {
    const target = e.target;
    //--- Check which element being clicked on ---//
    if (target.matches("button") && !formRef.current?.contains(target)) {
      setShowAuth(false);
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-theme-light-bg-opacity text-theme-light-text-secondary filter backdrop-blur-sm dark:bg-theme-dark-bg-blury dark:text-theme-dark-text-primary">
      <button
        type="button"
        onClick={closeModal}
        className="absolute left-0 top-0 z-20 h-full w-full"
      />
      {showAuth && (
        <button
          type="button"
          onClick={() => setShowAuth(false)}
          className="absolute right-4 top-3 z-30 h-fit w-fit text-theme-dark-bg-primary lg:hidden"
        >
          <CloseSvg />
        </button>
      )}
      {form.login && (
        <LoginForm
          setShowAuth={setShowAuth}
          setForm={setForm}
          formRef={formRef}
        />
      )}
      {form.register && <RegisterForm setForm={setForm} formRef={formRef} />}
      {form.reset && <ForgotForm setForm={setForm} formRef={formRef} />}
    </div>
  );
}

ModalAuth.propTypes = {
  showAuth: PropTypes.bool.isRequired,
  setShowAuth: PropTypes.func.isRequired,
};
