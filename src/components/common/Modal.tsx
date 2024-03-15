import { Svgs } from "src/components/common/Svgs";

type PropsType = {
  isOpen: boolean;
  closeModal: () => void;
  children: any;
};

export function Modal({ isOpen, closeModal, children }: PropsType) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 border border-slate-900 bg-slate-800">
      <div className="relative px-4 py-2 rounded-lg shadow-lg bg-slate-800">
        <button
          onClick={closeModal}
          type="button"
          className="absolute p-2 right-2 top-2"
        >
          <Svgs id="close" size="1.25rem" title="엑스 아이콘" />
        </button>
        {children}
      </div>
    </div>
  );
}
