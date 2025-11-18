const variants = {
  criarEvento:
    "bg-[#2E8FE0]/53 w-full rounded-4xl p-5 text-3xl font-bold text-white hover:bg-[#2E8FE0]/70 transition-colors",
  criarEventoSM:
    "flex flex-col items-center justify-center bg-white rounded-2xl w-15 h-15 shadow-md hover:bg-gray-400 transition ease-in-out",
};

export default function Button({
  label,
  onClick,
  className,
  id,
  type,
  variant,
  children,
}) {
  if (!label)
    return (
      <button
        onClick={onClick}
        className={`${variants[variant]} ${className}`}
        id={id}
        type={type}
      >
        {children}
      </button>
    );

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className={`${variants[variant]} ${className}`}
        id={id}
        type={type}
      >
        {children}
      </button>
      <p className="text-sm">{label}</p>
    </div>
  );
}
