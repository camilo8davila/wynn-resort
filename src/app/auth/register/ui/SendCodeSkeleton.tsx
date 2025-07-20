export const SendCodeSkeleton = () => {
  return (
    <div className="animate-pulse w-full">
      <p className="w-[160px] h-8 mb-10 bg-gray-400"></p>
      <div className="bg-gray-200 flex flex-col items-center justify-center p-6">
        <h3 className="bg-gray-400 w-[300] h-[27] mb-3"></h3>
        <p className="bg-gray-400 w-[250] h-[27] mb-6"></p>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-15 h-15 sm:w-20 sm:h-20 bg-gray-400 rounded-lg"></div>
          <div className="w-15 h-15 sm:w-20 sm:h-20 bg-gray-400 rounded-lg"></div>
          <div className="w-15 h-15 sm:w-20 sm:h-20 bg-gray-400 rounded-lg"></div>
          <div className="w-15 h-15 sm:w-20 sm:h-20 bg-gray-400 rounded-lg"></div>
        </div>

        <p className="bg-gray-400 w-[250] h-[27] mb-4"></p>

      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-10 my-10">
        <div className="w-[200px] h-10 sm:w-50 sm:h-12 bg-gray-400 rounded-lg"></div>
        <div className="w-[200px] h-10 sm:w-50 sm:h-12 bg-gray-400 rounded-lg"></div>
      </div>
    </div>
  )
}
