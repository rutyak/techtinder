import BlueTick from "../../assets/icons/BlueTick.svg";

const Card = ({ person }) => {

  return (
    <div
      style={{
        backgroundImage: `url(${person?.imageurl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-full rounded-2xl flex items-end p-4 text-white shadow-lg"
    >
      <div className="bg-black/40 p-3 rounded-lg">
        <h2 className="text-xl font-bold flex items-center gap-2">
          {person?.firstname} {person?.lastname}, {person?.age}
          {person?.isPremium && (
            <img src={BlueTick} alt="BlueTick" className="w-4 h-4" />
          )}
        </h2>
        <p className="text-sm">{person?.job}</p>
        {person?.isPremium && (
          <p className="text-xs text-blue-300 mt-1">• Premium Verified</p>
        )}
      </div>
    </div>
  );
};

export default Card;
