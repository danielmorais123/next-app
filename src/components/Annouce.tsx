import React from "react";

const Annouce = () => {
  return (
    <div className="bg-[#1A1A1A] w-full xl:w-[350px] xl:min-w-[310px]  rounded-xl  ">
      <div className="w-[90%] mx-auto">
        <div className=" flex flex-col pt-5 pb-3 pl-3 pr-2 ">
          <div className="flex items-center justify-between">
            <h1 className="text-sm">Sponsored</h1>
            <h1 className="text-xs text-gray-300/80">Create Ad</h1>
          </div>
          <img
            src="https://d226aj4ao1t61q.cloudfront.net/7d1bc10s8_engagement-woman.png"
            className="mt-3 rounded-xl w-full object-contain"
          />
          <div className="flex flex-col">
            <div className="flex mt-5 justify-between">
              <p className="text-[11px]">Company Name</p>
              <p className="text-xs text-[10px] text-gray-300/80">
                company@gmail.com
              </p>
            </div>
            <p className="text-gray-300/80 text-xs tracking-wide mt-3">
              Your pathway to stunning and immaculate beauty and made sure your
              skin is exfoliating skin and shining like light.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Annouce;
