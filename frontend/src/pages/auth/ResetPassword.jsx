import Input from "../../components/ui/Input";

const passwordFields = [
  { type: "password", name: "password", placeholder: "New Password" },
  {
    type: "password",
    name: "confirmPassword",
    placeholder: "Confirm Password",
  },
];

const ResetPassword = ({ handleChanges }) => {
  return (
    <>
      {passwordFields.map((item, index) => (
        <Input
          key={item.name + index}
          type={item.type}
          name={item.name}
          placeholder={item.placeholder}
          className="w-full p-2 rounded-lg border border-gray-400 placeholder:text-gray-400"
          handleChanges={handleChanges}
        />
      ))}
    </>
  );
};

export default ResetPassword;
