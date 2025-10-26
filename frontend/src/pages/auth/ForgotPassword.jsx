import Input from "../../components/ui/Input";

const ForgotPassword = ({ handleChanges }) => {
  return (
    <>
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="w-full p-2 rounded-lg border border-gray-400 placeholder:text-gray-400"
        handleChanges={handleChanges}
      />
    </>
  );
};

export default ForgotPassword;
