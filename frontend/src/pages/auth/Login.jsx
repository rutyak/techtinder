import Input from "../../components/ui/Input";

const loginFields = [
  { type: "email", name: "email", placeholder: "Email Address" },
  { type: "password", name: "password", placeholder: "Email Password" },
];

const Login = ({ setAuthView, setError, handleChanges }) => {
  return (
    <>
      {loginFields?.map((item, index) => (
        <Input
          key={item.name + index}
          type={item.type}
          name={item.name}
          placeholder={item.placeholder}
          className="w-full p-2 rounded-lg border border-gray-400 placeholder:text-gray-400"
          handleChanges={handleChanges}
        />
      ))}

      <div
        className="text-sm text-blue-500 text-right mt-1 cursor-pointer"
        onClick={() => {
          setAuthView("forgotPassword");
          setError("");
        }}
      >
        Forgot Password?
      </div>
    </>
  );
};

export default Login;
