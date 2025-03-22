import SectionHeading from '../Sections/SectionHeading/SectionHeading'
import review from "~/data/review.json"

const reviewer = review.reviews;

const Reviewer = ({ color }: { color?: boolean }) => {
  const bgColor = color ? "#e5e7eb" : "#ffffff";

  return (
    <div className="mt-[-80px] px-[120px] py-[70px]" style={{ backgroundColor: bgColor }}>
      <SectionHeading title={"Reviewer"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 cursor-pointer">
        {reviewer.map((reviewer, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:scale-105 hover:bg-gray-100">
            <h3 className="text-xl font-semibold">{reviewer.name}</h3>
            <p className="text-gray-600">"{reviewer.comment}"</p>
            <p className="text-yellow-500">Rating: {reviewer.rating}⭐</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviewer;
