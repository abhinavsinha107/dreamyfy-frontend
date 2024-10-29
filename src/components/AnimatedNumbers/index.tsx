import React from "react";
import CountUp from "react-countup";

const stats: Stat[] = [
  { value: 44000, label: "Experienced tutors" },
  { value: 300000, label: "5-star tutor reviews" },
  { value: 120, label: "Subjects taught" },
  { value: 180, label: "Tutor nationalities" },
  { value: 4.8, label: "on the App Store", isDecimal: true },
]; //will be dynamic

const StatCard: React.FC<StatCardProps> = ({ value, label, isDecimal }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full font-roboto-condensed last:border-r-0">
      <div className="text-3xl font-bold text-white ">
        <CountUp
          start={0}
          end={value}
          duration={5}
          decimals={isDecimal ? 1 : 0}
          separator={isDecimal ? "" : ","}
          className="text-3xl font-bold"
        />

        {isDecimal && (
          <>
            <span className="text-1xl font-bold text-white">★</span>
            {/* <span className="text-1xl font-bold text-white">★</span>
            <span className="text-1xl font-bold text-white">★</span>
            <span className="text-1xl font-bold text-white">★</span>
            <span className="text-1xl font-bold text-white">★</span> */}
          </>
        )}
      </div>
      <div className="font-roboto-condensed text-white">{label}</div>
    </div>
  );
};

const AnimatedNumbersComponent: React.FC = () => {
  return (
    <div className="w-full py-12  bg-[#161E2F]">
      <div className="flex justify-center items-center container mx-auto *:border-r-slate-600 *:border-r">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            value={stat.value}
            label={stat.label}
            isDecimal={stat.isDecimal}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedNumbersComponent;
