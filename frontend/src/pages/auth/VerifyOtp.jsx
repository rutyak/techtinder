const VerifyOtp = ({ handleChanges }) => {
  return (
    <>
      <input
        type="text"
        name="otp"
        placeholder="Enter OTP"
        className="w-full p-2 rounded-lg border border-gray-400 placeholder:text-gray-400"
        onChange={handleChanges}
        required
        maxLength={6}
      />
    </>
  );
};

export default VerifyOtp;
