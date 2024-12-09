import React from "react";

type Props = {};

const Feature = (props: Props) => {
  return (
    <div className="flex gap-4 max-w-7xl sm:mx-auto mx-5">
      <div className="w-[30%] shadow-lg rounded-md">
        <img src="images\court-1.jpg" alt="" className="rounded-md" />
      </div>
      <div className="flex-1">
        <h2 className="text-4xl font-bold">Features</h2>
        <ul className="list-disc pl-6 mt-4 text-xl">
          <li>Full-sized indoor basketball court</li>
          <li>Marked for various sports including Futsal and Volleyball</li>
          <li>
            High-quality wooden flooring designed for professional gameplay
          </li>
          <li>Adjustable basketball hoops to suit different skill levels</li>
          <li>Seating arrangements for spectators</li>
          <li>Access to amenities such as restrooms and locker rooms</li>
          <li>Ample on-site parking</li>
          <li>Outdoor community BBQ areas</li>
        </ul>
      </div>
    </div>
  );
};

export default Feature;
