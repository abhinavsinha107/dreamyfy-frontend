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
    <div className="flex flex-col justify-center items-center gap-2 font-roboto-condensed">
      <div className="text-3xl font-bold text-white">
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
            <span className="text-1xl font-bold text-white">★</span>
            <span className="text-1xl font-bold text-white">★</span>
            <span className="text-1xl font-bold text-white">★</span>
            <span className="text-1xl font-bold text-white">★</span>
          </>
        )}
      </div>
      <div className="font-roboto-condensed text-white">{label}</div>
    </div>
  );
};

const AnimatedNumbersComponent: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center items-center space-x-20 py-12  bg-[#161E2F]">
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
