import "../styles/Button.css";

export default function Button({
  children,
  onClick,
  className,
  style: extraStyle,
}) {
  return (
    <button
      className={`customButton ${className}`}
      onClick={onClick}
      style={extraStyle}
    >
      {children}
    </button>
  );
}
