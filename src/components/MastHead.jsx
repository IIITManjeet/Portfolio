import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.png";

export const MastHead = () => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 1500); // Set the time delay in milliseconds (5 seconds in this case)

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col relative mt-auto justify-center items-center z-0">
      <div className="font-Preahvihear leading-[40.59px] text-[28px] border-[#D41EF1B0] font-normal z-[1000px] absolute top-[100px] border-[1px] py-[8px] px-[36px] rounded-[56px] left-[58vw] text-white">
        Hello!
      </div>
      <div className="web flex justify-center items-center absolute w-[100%]">
        <span className="h1 font-Poppins w-[100%] text-center">
          Web Developer
        </span>
      </div>
      <div className="flex items-center justify-center z-[100px]">
        <img
          src={avatar}
          className="relative fade-in-image z-0"
          alt="avatar"
          height={400}
          width={400}
        />
        <div
          className={
            showImage
              ? `fade-in-avatar rounded-full bg-black shadow-custom h-[100px] z-[-100px] self-end w-[35%] m-[-40px] blur-2xl absolute`
              : "hidden"
          }
        />
        <div
          className={
            showImage
              ? `fade-in-avatar flex gap-[25px] absolute self-end justify-center m-[-20px]`
              : "hidden"
          }
        >
          <p className="bg-gradient-to-r z-[1000px] font-Poppins from-[#916EF1] to-[#D41EF1] leading-[70px] text-transparent bg-clip-text font-semibold text-[70px]">
            Manjeet Pathak
          </p>
        </div>
      </div>
    </div>
  );
};
