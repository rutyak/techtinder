import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeRequest } from "../utils/requestsSlice";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

const Requests = () => {
  const requests = useSelector((state) => state.requests);

  const dispatch = useDispatch();

  const handleAccept = async (id) => {
    try {
      const res = await axios.post(
        `${base_url}/request/review/accepted/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
      toast.success(res.data?.message || "Request accepted!");
    } catch (error) {
      toast.error(error.message || "Something is wrong");
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axios.post(
        `${base_url}/request/review/rejected/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));

      toast.success(res.data?.message || "Request rejected!");
    } catch (error) {
      toast.error(error.message || "Something is wrong");
      console.error(error);
    }
  };

  return (
    <div className="px-5 sm:px-8 xl:px-0 w-full">
      <div className="max-w-4xl mx-auto rounded-2xl">
        <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-blue-700 mt-4 mb-6 lg:m-10 xl:m-12 text-center">
          Pending Requests
        </h2>

        {requests?.length === 0 ? (
          <p className="text-center text-gray-500">No pending requests.</p>
        ) : (
          <div className="space-y-6">
            {requests?.map((req) => (
              <div
                key={req._id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border rounded-xl p-5 bg-white shadow-lg hover:shadow-md transition"
              >
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={req.fromUserId?.imageurl}
                    alt={req.fromUserId?.firstname}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-blue-200"
                  />
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-700">
                      {req.fromUserId?.firstname +
                        " " +
                        req.fromUserId?.lastname}
                      {", "}
                      {req.fromUserId?.age}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {req.fromUserId?.job}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    onClick={() => handleAccept(req._id)}
                    className="flex-1 md:flex-none px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(req._id)}
                    className="flex-1 md:flex-none px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
