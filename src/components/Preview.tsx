import { Portfolio } from "../types/Portfolio";

const Preview = ({ data }: { data: Portfolio }) => {
  return (
    <div className="p-6 bg-white shadow rounded space-y-4">
      <h1 className="text-3xl font-bold">{data.name || "Your Name"}</h1>
      <h2 className="text-lg text-gray-600">{data.title || "Your Title"}</h2>
      <p className="text-gray-800">{data.about || "Write something about yourself here."}</p>
    </div>
  );
};

export default Preview;
