interface Props {
  title: string;
  style?: React.CSSProperties;
  onClick?: any;
  icon?: any;
}

const RoundButton = ({ title, style, onClick, icon }: Props) => {
  return (
    <button
      className="w-full flex items-center justify-center rounded-full bg-[#ffd700] text-[#003366] font-semibold h-[50px]"
      style={style}
      onClick={onClick}
    >
      {title}
      {icon && <span className="px-2">{icon}</span>}
    </button>
  );
};

export default RoundButton;
