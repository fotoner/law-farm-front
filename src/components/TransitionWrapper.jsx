import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

const TransitionWrapper = ({ children, match }) => {
  const transitionRef = useRef(null);
  
  return (
    <CSSTransition
      nodeRef={transitionRef}
      in={match != null}
      timeout={300}
      classNames="pageSlider"
      unmountOnExit
    >
      <div ref={transitionRef} className="pageSlider">
        {children}
      </div>
    </CSSTransition>
  );
};

export default TransitionWrapper;
