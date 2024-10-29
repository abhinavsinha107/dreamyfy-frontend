import background from "../../assets/Images/background.jpg";
import books from "../../assets/Images/books.png";

const BackgroundLogo = () => {
  return (
    <section className="bg-slate-100 py-10">
      <div className="container mx-auto px-4">
        <div className="w-full flex items-center flex-wrap gap-y-6 md:gap-y-0">
          <div className="relative  w-full md:w-5/12">
            <div className="flex absolute top-10 right-10 p-4 bg-white shadow-2xl shadow-slate-300 rounded-lg">
              <span>500 +</span>
              <span>Courses</span>
            </div>
            <div className="flex absolute bottom-10 left-10 p-4 bg-white shadow-2xl shadow-slate-300 rounded-lg">
              <span>Learn the</span>
              <span>Skills</span>
            </div>
            <img src={books} alt="background" className="h-[400px]" />
          </div>
          <div className="text-center md:text-start sm:text-2xl text-lg leading-1 pr-0 md:pr-20 w-full md:w-7/12">
            At DreamFy, we empower individuals to learn the skills they've always
            dreamed of, skills that can shape their future. With over 500 courses,
            we are dedicated to helping people realize their potential, thanks to
            our passionate and dedicated teachers.
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackgroundLogo;
