import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const BookingForm = () => {
  return (
    <div className="bg-[#e5ebef] py-20">
      <div className="flex gap-10 max-w-7xl sm:mx-auto mx-5">
        <div className="w-1/3">
          <img
            src="images/Booking-form.jpg"
            alt=""
            className="rounded-tr-[5rem] rounded-bl-[5rem] border"
          />
        </div>
        <div className=" p-8 grid grid-cols-2 gap-x-32">
          <h2 className="text-4xl font-bold text-[#00054b] mb-6 col-span-2">
            Book the Badminton <br /> Court Today
          </h2>
          {/* Form Section */}
          <div className="flex-1">
            <form className="flex flex-col justify-between gap-8">
              <input
                type="text"
                placeholder="Full Name"
                className="border-b-2 border-[#00054b] focus:outline-none focus:border-blue-700 text-gray-700 p-2 bg-transparent h-[100px]"
              />
              <input
                type="email"
                placeholder="E-mail"
                className="border-b-2 border-[#00054b] focus:outline-none focus:border-blue-700 text-gray-700 p-2 bg-transparent h-[100px]"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="border-b-2 border-[#00054b] focus:outline-none focus:border-blue-700 text-gray-700 p-2 bg-transparent h-[100px]"
              />
              <button
                type="submit"
                className="bg-[#00054b] text-white rounded-full hover:bg-[#00054bea] transition h-[75px] text-2xl"
              >
                Advance Book
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold text-[#00054b] mb-2">
                Contact
              </h3>
              <p className="text-gray-700 text-xl">
                <span className="font-bold">Email: </span>
                tuivanu@blacktown.nsw.gov.au
              </p>
              <p className="text-gray-700 text-xl">
                <span className="font-bold">Phone: </span>(02) 1234 5678
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#00054b] mb-2">
                Based in
              </h3>
              <p className="text-gray-700 text-xl">
                New York, California, Ohio
              </p>
            </div>
            <div className="flex justify-between text-[#00054b]">
              <a href="#" aria-label="Facebook">
                <FaFacebook size={48} />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram size={48} />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter size={48} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
