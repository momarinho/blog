export default function Loader() {
  return (
    <div class="flex justify-center items-center h-screen">
      <div class="relative inline-block">
        <div class="w-16 h-16 border-4 border-gray-300 rounded-full"></div>
        <div class="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-500 rounded-full border-t-0 animate-spin"></div>
      </div>
    </div>
  );
}
