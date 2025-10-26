const Input = ({ type, name, placeholder, className, handleChanges }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={className}
      onChange={handleChanges}
      required
    />
  );
};

export default Input;
