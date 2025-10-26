import Input from "../../components/ui/Input";

const signupFields = [
  { type: "text", name: "firstname", placeholder: "Enter first name" },
  { type: "text", name: "lastname", placeholder: "Enter last name" },
  { type: "email", name: "email", placeholder: "Email Address" },
  { type: "password", name: "password", placeholder: "Enter password" },
];

const SignUp = ({ handleChanges }) => {
  return (
    <>
      {signupFields?.map((item, index) => (
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

export default SignUp;
