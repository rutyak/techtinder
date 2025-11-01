import { useState, useRef, createRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { RiCloseLargeFill } from "react-icons/ri";
import { BiSolidLike } from "react-icons/bi";
import { GoStarFill } from "react-icons/go";
import Instruction from "./Instructions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { addFeeds, removeFeeds } from "../../utils/feedSlice";
import TechTinderIconInner from "../../assets/icons/TechTinderIconInner.svg";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../utils/userSlice";
import Card from "./Card";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function FeedCards({
  profile,
  showActions = true,
  showLabels = true,
  isPreview = false,
}) {
  const navigate = useNavigate();
  const feeds = useSelector((state) => state?.feeds);
  const [people, setPeople] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const cardRefs = useRef([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile) getFeedData();
  }, []);

  useEffect(() => {
    if (!profile && Array.isArray(feeds)) setPeople(feeds);
  }, [feeds]);

  useEffect(() => {
    if (people.length > 0) setCurrIndex(people.length - 1);
  }, [people]);

  useEffect(() => {
    if (people.length > 0) {
      cardRefs.current = Array(people.length)
        .fill(0)
        .map((_, i) => cardRefs.current[i] || createRef());
    }
  }, [people]);

  useEffect(() => {
    if (profile) setPeople([profile]);
  }, [profile]);

  async function getFeedData() {
    try {
      const res = await axios.get(`${base_url}/feeds`, {
        withCredentials: true,
      });
      setPeople(res.data?.feeds);
      dispatch(addFeeds(res.data?.feeds));
    } catch (error) {
      const msg = error.response?.data?.message;
      if (msg === "jwt expired" || msg === "Please login") {
        if (!toast.isActive("tokenExpired")) {
          toast.error("Please log in again", { toastId: "tokenExpired" });
        }
        dispatch(removeUser());
        navigate("/");
      } else {
        console.error(error);
      }
    }
  }

  async function handleCardLeft(dir, id) {
    try {
      let endpoint = "";
      if (dir === "right") {
        endpoint = `${base_url}/request/send/interested/${id}`;
      } else if (dir === "left") {
        endpoint = `${base_url}/request/send/ignored/${id}`;
      } else if (dir === "up") {
        endpoint = `${base_url}/request/send/superinterested/${id}`;
      }

      const res = await axios.post(endpoint, {}, { withCredentials: true });
      toast.success(res.data?.message || "Request sent successfully");

      dispatch(removeFeeds(id));
      if (!isPreview) setPeople((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      if (!toast.isActive("requestErrorToast")) {
        toast.error("Something went wrong", { toastId: "requestErrorToast" });
      }
    }
  }

  // ✅ Swipe manually via button
  async function swipe(dir, id) {
    if (isPreview || currIndex < 0) return;
    const cardRef = cardRefs.current[currIndex]?.current;
    if (cardRef) {
      await cardRef.swipe(dir);
    } else {
      console.warn("No card ref found for index:", currIndex);
    }
  }

  return (
    <div
      data-testid="feedcard"
      className="h-full w-full flex flex-col items-center justify-between sm:gap-6"
    >
      {/* Label / Icon */}
      {showLabels && !isPreview && (
        <img
          src={TechTinderIconInner}
          alt="techTinderIcon"
          className="h-8 w-8 text-gray-300 my-3 hidden sm:block"
        />
      )}

      {/* Tinder Cards */}
      <div className="relative w-[95%] sm:w-[310px] h-full sm:h-[420px] flex justify-center">
        {people?.map((person, index) =>
          isPreview ? (
            <div key={person?._id} className="absolute w-full h-full">
              <Card person={person} />
            </div>
          ) : (
            <TinderCard
              ref={cardRefs.current[index]}
              key={person?._id}
              preventSwipe={["down"]}
              onSwipe={(dir) => handleCardLeft(dir, person?._id)}
              onCardLeftScreen={() => setCurrIndex(index - 1)}
              swipeRequirementType="position"
              className="absolute w-full h-full"
            >
              <Card person={person} />
            </TinderCard>
          )
        )}
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="flex gap-8 mt-6 mb-4">
          <button
            aria-label="left swipe"
            disabled={isPreview}
            onClick={() => swipe("left", people[currIndex]?._id)}
            className="p-4 rounded-full bg-red-100 text-red-500 shadow-lg hover:scale-110 transition"
          >
            <RiCloseLargeFill size={28} />
          </button>

          <button
            aria-label="up-swipe"
            disabled={isPreview}
            onClick={() => swipe("up", people[currIndex]?._id)}
            className="p-4 rounded-full bg-blue-100 text-blue-500 shadow-lg hover:scale-110 transition"
          >
            <GoStarFill size={28} />
          </button>

          <button
            aria-label="right-swipe"
            disabled={isPreview}
            onClick={() => swipe("right", people[currIndex]?._id)}
            className="p-4 rounded-full bg-green-100 text-green-500 shadow-lg hover:scale-110 transition"
          >
            <BiSolidLike size={28} />
          </button>
        </div>
      )}

      {!isPreview && showLabels && <Instruction />}
    </div>
  );
}

export default FeedCards;
