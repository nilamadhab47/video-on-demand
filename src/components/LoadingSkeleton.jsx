const SkeletonCard = () => {
  return (
    <div className="w-[143px] sm:w-60 aspect-[240/360] bg-red-900 rounded-lg shadow-md animate-pulse">
      <div className="h-[103px] bg-red-900 rounded-b-lg px-2 py-0 opacity-0">
        <div className="flex justify-between pt-2">
          <div className="h-4 bg-red-900 w-2/3 rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-300 w-1/3 rounded animate-pulse mb-2"></div>
        </div>
        <div className="flex justify-between mt-7">
          <div className="h-4 bg-gray-300 w-2/3 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-300 w-1/4 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
