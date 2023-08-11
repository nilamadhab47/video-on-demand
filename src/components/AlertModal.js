import React, { useState, useRef, useImperativeHandle } from "react";
import Button from "./Button";

const AlertModal = React.forwardRef((props, ref) => {
  const [isOpen, setIsOpenModal] = useState(false);
  const [showText, setShowText] = useState("");

  useImperativeHandle(ref, () => ({
    openModal: (displayText) => {
      setIsOpenModal(true);
      setShowText(displayText);
    },
    closeModal: () => {
      setIsOpenModal(false);
    },
  }));

  return (
    <>
      {isOpen && (
        <div className="absolute flex bg-AvatarModalBg max-w-screen-md h-auto border-2 p-6 sm:p-8 border-AvatarModalBorder top-[20%] sm:top-[45%] left-[10%] sm:left-[15%] lg:left-[24%] right-[10%] sm:right-[15%] flex-col justify-center items-center text-center gap-4 sm:gap-8 z-50">
          <h3 className="font-semibold text-white font20-30 pb-6">
            {showText}
          </h3>
          <Button
            text="Close"
            type="submit"
            btnStyle="w-[95px] sm:w-[111px] h-[44px] bg-btnDark text-[16px] p-0"
            handleClick={() => setIsOpenModal(false)}
          />
        </div>
      )}
    </>
  );
});

AlertModal.displayName = "AlertModal";

export default AlertModal;
