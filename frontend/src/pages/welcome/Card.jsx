
function Card({ name, position, rating, text }) {
  return (
    <div className="h-[230px] sm:h-[320px] xl:h-[300px] border border-gray-200 p-4 sm:p-6 flex flex-col gap-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-default">
      <div>
        <h1 className="text-md md:text-xl font-bold text-gray-800">{name}</h1>
        <h3 className="text-xs sm:text-sm text-gray-500 mt-1">{position}</h3>
      </div>

      <hr className="border-gray-100" />

      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed flex-1 line-clamp-5">
        {text}
      </p>

      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-2">({rating}/5)</span>
      </div>
    </div>
  );
}

export default Card;
