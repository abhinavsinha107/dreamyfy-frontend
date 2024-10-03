import styles from "./index.module.css";

interface Props {
  src: string;
  isMobile: boolean;
}

const StudentTestimonialCard = ({ src, isMobile }: Props) => {
  return (
    <div
      className={`p-4 max-w-[350px] border-2 border-gray-200 rounded-lg  ${styles.card}`}
    >
      <div className="w-full pb-8 pt-16">
        <img
          src={src}
          alt="img"
          className="rounded-full w-[80px] h-[80px] mx-auto"
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-2xl title-font font-medium text-white mb-1">
          Emma Convey
        </p>
        <p className="text-sm font-medium text-gray-700 mb-4">Parent</p>
        <p className="text-sm text-white italic">
          "Having a peer mentor made a huge difference to my daughter: built her
          confidence, motivated her and gave her the tools and belief that she
          could do it. And she did! She's off to university in September, thank
          you!"
        </p>
      </div>
    </div>
  );
};

export default StudentTestimonialCard;
