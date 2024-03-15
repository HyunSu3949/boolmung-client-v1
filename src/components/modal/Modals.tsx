import { useDispatch, useSelector } from "react-redux";

import { closeModal } from "src/redux/features/modalSlice";
import { RootState } from "src/redux/store";

export default function Modals() {
  const { openedModals } = useSelector(
    (state: RootState) => state.reducer.modalReducer,
  );
  const dispatch = useDispatch();

  return (
    <div>
      {openedModals.map((modal, idx) => {
        const { Component, props } = modal;
        const onCloseModal = () => {
          dispatch(closeModal(Component));
        };

        return <Component key={idx} onCloseModal={onCloseModal} {...props} />;
      })}
    </div>
  );
}
