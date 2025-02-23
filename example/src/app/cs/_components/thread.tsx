export const Thread = ({ name }: { name: string }) => {
  return (
    <div className="relative bg-white text-gray-800 rounded px-2 py-1 mb-1 shadow transition-transform hover:scale-[1.03] w-full text-center">
      <span className="text-sm">스레드: {name}</span>
    </div>
  );
};
