import background from "../../assets/Images/background.jpg";

const BackgroundLogo = () => {
  return (
    <div className="w-full relative">
      <img src={background} alt="background" className="w-[100vw] h-[500px]" />
      <div className="w-full h-full bg-black opacity-50 absolute top-0"></div>
      <div className="absolute sm:left-2/3 left-0 top-1/2 transform sm:-translate-x-1/4 -translate-y-1/2 p-2 sm:p-0 text-white sm:text-2xl text-lg leading-1 opacity-65 italic">
        At DreamFy, we empower individuals to learn the skills they've always
        dreamed of, skills that can shape their future. With over 500 courses,
        we are dedicated to helping people realize their potential, thanks to
        our passionate and dedicated teachers.
      </div>
    </div>
  );
};

export default BackgroundLogo;
