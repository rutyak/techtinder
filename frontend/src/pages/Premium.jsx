import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

const plans = [
  {
    title: "Basic",
    price: "₹99/month",
    features: ["See who liked you", "Unlimited swipes", "Basic profile boosts"],
    bg: "from-indigo-200 to-indigo-400",
  },
  {
    title: "Gold",
    price: "₹299/month",
    features: [
      "All Basic features",
      "Message anyone",
      "2x profile boosts",
      "Priority support",
    ],
    bg: "from-yellow-200 to-yellow-500",
    highlight: true,
  },
  {
    title: "Platinum",
    price: "₹599/month",
    features: [
      "All Gold features",
      "Unlimited boosts",
      "Exclusive badge",
      "Early access to new features",
    ],
    bg: "from-purple-200 to-purple-500",
  },
];

const Premium = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  async function verifyPremiumUser() {
    try {
      const res = await axios.get(`${base_url}/premium/verification`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data?.user));
    } catch (error) {
      console.error("Error verifying premium:", error);
    }
  }

  async function handleSubscribeClick(type) {
    try {
      let plan = type.toLowerCase();

      const res = await axios.post(
        `${base_url}/payment/create`,
        { membershipType: plan },
        { withCredentials: true }
      );

      const { keyId, amount, currency, orderId, notes } = res.data.payment;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "TechTinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstname + " " + notes.lastname,
          email: notes.email,
        },
        theme: {
          color: "#6D28D9",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  }

  // ✅ Premium Member Page
  if (user.isPremium) {
    return (
      <div className="h-full lg:h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-indigo-200">
        <div className="bg-white shadow-2xl rounded-3xl mx-4 sm:mx-8 px-6 py-9 sm:p-14 text-center max-w-xl relative overflow-hidden">
          {/* Premium Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-400 opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-pink-400 opacity-30 rounded-full blur-3xl"></div>

          {/* Crown Icon */}
          <div className="flex justify-center mb-6">
            <span className="text-5xl sm:text-6xl">👑</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-5xl font-extrabold text-purple-800 mb-4 animate-bounce">
            Oohhoo 🎉
          </h1>
          <h2 className="text-xl sm:text-3xl font-bold text-pink-600 mb-6">
            You are a Premium Member!
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-sm sm:text-lg mb-8 leading-relaxed">
            Welcome to the{" "}
            <span className="font-semibold text-purple-700">
              exclusive club
            </span>
            . Unlock unlimited features, faster access, and a premium experience
            on TechTinder 🚀
          </p>

          {/* Action Button */}
          <Link
            to="/dashboard"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Normal plans page if not premium
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="h-screen py-8 xl:pt-9 xl:pb-4 px-6 overflow-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12 xl:mb-14">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-purple-900 drop-shadow-lg">
            Go Premium
          </h1>
          <p className="text-gray-600 mt-4 max-w-xl xl:max-w-2xl mx-auto text-sm md:text-md xl:text-lg">
            Unlock exclusive features and boost your chances of finding the
            perfect match. Choose a plan that suits you best.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-1 xl:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl shadow-xl p-8 bg-gradient-to-b ${
                plan.bg
              }
              backdrop-blur-lg bg-opacity-80 transition-transform transform hover:scale-105 
              hover:shadow-2xl ${
                plan.highlight ? "ring-4 ring-yellow-400 xl:scale-105" : ""
              }`}
            >
              {plan.highlight && (
                <span className="absolute top-4 right-4 bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                  Popular
                </span>
              )}
              <h2 className="text-2xl xl:text-3xl font-bold mb-4 text-gray-900">
                {plan.title}
              </h2>
              <p className="text-2xl xl:text-4xl font-extrabold mb-6 text-purple-800">
                {plan.price}
              </p>
              <ul className="mb-6 space-y-3 text-gray-800 font-medium">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-600">✔</span> {feature}
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-3 rounded-xl bg-purple-700 text-white font-semibold 
              hover:bg-purple-900 hover:shadow-xl transition-all"
                onClick={() => handleSubscribeClick(plan.title)}
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-8 mt-14 text-gray-600">
          <Link
            to="/subscription-terms"
            className="hover:text-purple-800 transition"
          >
            Subscription Terms
          </Link>
          <Link
            to="/refund-policy"
            className="hover:text-purple-800 transition"
          >
            Refund Policy
          </Link>
          <Link
            to="/cancellation-policy"
            className="hover:text-purple-800 transition"
          >
            Cancellation Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Premium;
