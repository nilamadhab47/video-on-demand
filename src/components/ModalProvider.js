import { createRef } from "react";
import AlertModal from "./AlertModal";

export const alertModalRef = createRef();

export default function ModalProvider() {
  return (
    <>
      <AlertModal ref={alertModalRef} />
    </>
  );
}
