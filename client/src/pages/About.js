import React from "react";

const About = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-300 to-blue-300 pt-20 pb-5">
      <div className="container mx-auto p-8 shadow-lg rounded-lg bg-white">
        <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
          About EcoScore
        </h1>

        <section className="mb-8">
          <div className="flex flex-col lg:flex-row mb-6">
            <div className="lg:w-1/2 mb-6 lg:mb-0">
              <img
                src={
                  "https://live.staticflickr.com/8099/8547476618_bdfb4f299f.jpg"
                }
                alt="EcoScore Team"
                className="rounded-lg w-full h-64 object-cover"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center mx-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                At EcoScore, we are passionate about finding practical ways to
                reduce carbon emissions. Our team—Abhi, Faraz, Vijay, and
                Mohamed—came together with a shared commitment to environmental
                sustainability. Our goal is to provide accessible tools and
                insights to empower individuals and communities to make
                eco-friendly choices. Through EcoScore, we hope to contribute to
                a greener, more sustainable future.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            The Urgency of Climate Action
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            The Earth currently emits around <span className="font-bold text-green-600">37.4 billion tonnes of carbon
            dioxide annually,</span>  contributing to increased climate instability—from
            extreme weather events to rising sea levels. At EcoScore, our aim is
            to help reduce global carbon emissions to net zero by 2050.
            Achieving this will require collective action, and small changes
            like reducing energy use, opting for public transport, and
            advocating for renewable energy can make a real difference.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            The Impact of Air Pollution
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Every year, <span className="text-green-600 font-bold">8.1 million premature deaths</span> are attributed to air
            pollution, and <span className="font-bold text-green-600">90% of the world's population</span>  breathes air that
            exceeds the World Health Organization's guideline limits. Pollution
            is a major threat to human health, <span className="font-bold text-green-600">affecting over 100 million people
            globally</span> At EcoScore, we believe that by spreading awareness and
            encouraging sustainable choices, we can reduce emissions and improve
            air quality for all.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Join the Movement
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            The world is facing a critical moment in its battle against climate
            change. But with the right tools, knowledge, and commitment, we can
            make a lasting impact. At EcoScore, we aim to provide individuals
            with the means to track and reduce their carbon footprints through
            gamified actions, community engagement, and educational resources.
            Together, we can create a greener, more sustainable future.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
