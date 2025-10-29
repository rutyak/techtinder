import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addConnections } from "../../utils/connectionsSlice";
import axios from "axios";
import { useGlobalVariable } from "../../context/GlobalContext";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function ChatList() {
  const { search } = useGlobalVariable();

  const connections = useSelector((state) => state.connections);

  const filteredConnections = connections?.filter((person) =>
    person?.firstname.toLowerCase().includes(search.toLowerCase())
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // async function getConnections() {
  //   try {
  //     const res = await axios.get(`${base_url}/user/connections`, {
  //       withCredentials: true,
  //     });

  //     dispatch(addConnections(res.data?.data));
  //   } catch (error) {
  //     if (!toast.isActive("connectionErrorToast")) {
  //       toast.error(error.data?.message, { toastId: "connectionErrorToast" });
  //     }
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   getConnections();
  // }, []);

  function handleClick(id, firstname, imageurl) {
    if (window.innerWidth < 1024) {
      navigate("/chatwindow", {
        state: { targetUser: { id, firstname, imageurl } },
      });
    } else {
      navigate("/dashboard/chatwindow", {
        state: { targetUser: { id, firstname, imageurl } },
      });
    }
  }

  return (
    <div className="h-full flex-1 overflow-y-auto md:bg-gray-50">
      <h3 className="px-4 pt-2 pb-2 text-gray-500 font-medium">Chats</h3>
      <div className="space-y-2 px-2">
        {filteredConnections && filteredConnections?.length > 0 ? (
          filteredConnections?.map(
            (person) =>
              person !== null && (
                <div
                  data-testid="targetUser"
                  key={person?._id}
                  className="flex justify-between gap-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors"
                  onClick={() =>
                    handleClick(
                      person?._id,
                      person?.firstname,
                      person?.imageurl
                    )
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={person?.imageurl}
                        alt="profile"
                        className="z-10 w-12 h-12 rounded-full object-contain border-2 border-blue-400"
                      />
                      <div className="absolute bg-green-600 border-white border-2 right-1 bottom-0 w-3 h-3 rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {person?.firstname}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-[180px]">
                        New Match! Say Hello 👋
                      </div>
                    </div>
                  </div>
                  <div className="text-xs pt-1 text-gray-400">2m</div>
                </div>
              )
          )
        ) : (
          <div className="text-gray-500 text-center py-3">
            No connections found
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatList;
