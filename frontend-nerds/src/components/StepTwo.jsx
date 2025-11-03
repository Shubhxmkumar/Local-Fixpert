import Nav from "./Nav";

const experts = [
  {
    name: "AKINWUMI MICHAEL",
    service: "Plumber",
    phone: "9877423242",
    city: "Amritsar",
    clients: "50+",
    rating: 4,
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "John Carter",
    service: "Electrician",
    phone: "9988776655",
    city: "Amritsar",
    clients: "80+",
    rating: 5,
    img: "https://randomuser.me/api/portraits/men/55.jpg"
  }
];

const StepTwo = ({ onNext, form, step, onBack }) => {
  return (
    <>
      <Nav step={step} />

      <div className="min-h-screen bg-[#F6FAFF] pt-28 px-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Experts Profiles
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {experts.map((ex, i) => (
            <div key={i} className="bg-blue-100 rounded-2xl p-6 text-center shadow">
              <img src={ex.img} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover" />
              <h3 className="font-bold text-lg">{ex.name}</h3>
              <p className="text-gray-600">{ex.service}</p>

              <div className="text-sm text-left mt-3 space-y-1">
                <p><b>Contact:</b> {ex.phone}</p>
                <p><b>City:</b> {ex.city}</p>
                <p><b>Clients served:</b> {ex.clients}</p>
                <p className="flex items-center gap-1">
                  ⭐ {ex.rating} Rating
                </p>
              </div>

              <div className="flex gap-3 mt-5 justify-center">
                <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full">Contact</button>
                <button
                  onClick={() => onNext({ expert: ex })}
                  className="px-5 py-2 bg-blue-600 text-white rounded-full"
                >
                  Hire me
                </button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onBack} className="mt-6 text-blue-600 underline block mx-auto">
          ← Back
        </button>
      </div>
    </>
  );
};

export default StepTwo;
