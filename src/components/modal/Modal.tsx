import { Svgs } from "src/components/common/Svgs";

type Props = {
  onCloseModal: () => void;
  children: React.ReactElement;
};

export default function Modal({ onCloseModal, children }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 border border-slate-900 bg-slate-800">
      <div className="p-4 rounded-lg shadow-lg bg-slate-800">
        <div className="flex justify-end w-full p-2">
          <button onClick={onCloseModal} type="button" className="justify-end">
            <Svgs id="close" size="1.25rem" title="엑스 아이콘" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
