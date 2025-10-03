import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { FiSave, FiX } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { addUser } from "../../utils/userSlice";
import SkillTags from "./SkillTags";
import ChangePassword from "./ChangePassword";
import FeedCards from "../../components/FeedCard/FeedCards";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [profileImageFile, setProfileImageFile] = useState();
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [tags, setTags] = useState(
    user.skills?.length ? user.skills : ["HTML", "CSS", "JS"]
  );

  const { firstname, lastname, age, gender, job, imageurl, skills } = user;

  const [formData, setFormData] = useState({
    firstname,
    lastname,
    age,
    gender,
    job,
    imageurl,
    skills,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileEdit = async () => {
    try {
      let imageRes = null;
      if (profileImageFile) {
        const imageFormData = new FormData();
        imageFormData.append("profileImage", profileImageFile);

        imageRes = await axios.post(`${base_url}/upload/image`, imageFormData, {
          withCredentials: true,
        });
      }

      const res = await axios.patch(
        `${base_url}/profile/edit`,
        { ...formData, imageurl: imageRes?.data?.imageurl, skills: tags },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res?.data?.message);
        dispatch(addUser(res?.data?.user));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen xl:flex xl:items-center px-3 sm:px-8 py-3 w-full max-w-6xl mx-auto">
      <div className="w-full flex flex-col xl:flex-row gap-8 lg:mt-4">
        <div className="w-full xl:w-1/2 bg-white rounded-xl shadow-lg p-5 md:p-6 border border-gray-600 sm:border-none xl:max-h-[650px] xl:overflow-auto">
          <div className="flex justify-between items-baseline">
            <h2 className="text-lg md:text-xl xl:text-xl font-bold text-blue-700 mb-6 text-center">
              My Profile
            </h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-500 text-white text-sm sm:text-base rounded-md hover:bg-blue-600 transition"
              >
                <FaEdit /> Edit
              </button>
            ) : (
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    handleProfileEdit();
                    setIsEditing(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-500 text-white text-sm sm:text-base rounded-md hover:bg-green-600 transition"
                >
                  <FiSave /> Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gray-300 text-gray-800 text-sm sm:text-base rounded-md hover:bg-gray-400 transition"
                >
                  <FiX /> Cancel
                </button>
              </div>
            )}
          </div>

          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <img
              src={imagePreview || user?.imageurl}
              alt="Profile"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-contain border-4 border-blue-100"
            />
            {isEditing && (
              <label className="cursor-pointer px-4 py-2 border rounded-lg text-blue-500 border-blue-500 hover:bg-blue-50 text-sm">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  aria-label="Upload Profile Image"
                />
              </label>
            )}
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {[
              ["firstname", "First Name"],
              ["lastname", "Last Name"],
              ["age", "Age"],
              ["gender", "Gender"],
              ["job", "Job"],
            ].map(([key, label]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {label}
                </label>
                {isEditing ? (
                  <input
                    type={key === "age" ? "number" : "text"}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded text-gray-700">
                    {user[key]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Password Section */}
          {!isEditing && (
            <div className="mt-6">
              <ChangePassword
                showPasswordFields={showPasswordFields}
                setShowPasswordFields={setShowPasswordFields}
              />
            </div>
          )}

          {/* Skills */}
          {isEditing ? (
            <div className="mt-6">
              <SkillTags tags={tags} setTags={setTags} />
            </div>
          ) : (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {user.skills && user.skills.length > 0 ? (
                  user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full"
                    >
                      #{skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No skills added</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="h-[650px] w-full xl:w-1/2 rounded-xl p-2 xl:p-6 flex flex-col items-center">
          <h2 className="text-xl xl:text-2xl font-bold text-blue-700 mb-6 text-center border-b-4 border-blue-200 pb-2 inline-block">
            Preview
          </h2>
          <FeedCards
            profile={{
              firstname: formData?.firstname,
              lastname: formData?.lastname,
              age: formData?.age,
              job: tags.length ? formData?.job : "Not specified",
              distance: 0,
              imageurl: imagePreview || formData?.imageurl,
            }}
            showActions={true}
            showLabels={true}
            isPreview={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
