export default function Button() {
  return (
    <div className="flex items-center justify-between">
      <button
        type="submit"
        className="focus:shadow-outline m-auto rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      >
        만들기
      </button>
    </div>
  );
}
