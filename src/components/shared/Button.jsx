const Button = ({ children, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-[17.4375rem] h-[3rem] md:w-[21rem] bg-red text-white text-bm font-outfit font-light rounded-[0.375rem] hover:bg-white hover:text-dark"
    >
      {children}
    </button>
  );
};

export default Button;
