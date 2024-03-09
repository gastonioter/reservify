import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Button from "./Button";
import { useRef } from "react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();
function Modal({ children }) {
  const [windowOpen, setWindowOpen] = useState("");
  const close = () => setWindowOpen("");
  const open = setWindowOpen;

  return (
    <ModalContext.Provider value={{ close, open, windowOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function Window({ children, name }) {
  const { windowOpen, close } = useContext(ModalContext);
  const ref = useRef();

  function handleClickOutside(e) {
    if (e.target.id === "overlay") {
      console.log("out");
      console.log(e.target.id);
      close();
    }
  }

  useEffect(
    function () {
      if (!ref.current) return;

      const current = ref.current;
      const handleClickOutside = (e) => {
        if (e.target === current) {
          close();
        }
      };

      current.addEventListener("click", handleClickOutside);

      return () => current.removeEventListener("click", handleClickOutside);
    },
    [close]
  );

  if (name === windowOpen) {
    return createPortal(
      <Overlay onClick={handleClickOutside} ref={ref}>
        <StyledModal>
          <CloseButton onClick={close}>
            <HiXMark />
          </CloseButton>
          {cloneElement(children, { onCloseModal: close })}
        </StyledModal>
      </Overlay>,
      document.body
    );
  }
}

function Open({ children, opens }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opens) });
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
