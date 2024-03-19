type Props = {
  children: React.ReactNode;
};

export default function Button({ children }: Props) {
  return (
    <button
      type="submit"
      className="w-full rounded-md bg-slate-500 py-2 text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
    >
      {children}
    </button>
  );
}
