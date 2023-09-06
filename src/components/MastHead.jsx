import React from "react";
import avatar from "../assets/avatar.png";

export const MastHead = () => {
  return (
    <div className="flex flex-col relative justify-center items-center z-0">
      <div className="font-Preahvihear leading-[40.59px] text-[28px] border-[#D41EF1B0] font-normal z-[1000px] absolute top-[100px] border-[1px] py-[8px] px-[36px] rounded-[56px] left-[58vw] text-white">
        Hello!
      </div>
      <div className="flex justify-center items-center absolute w-[100%]">
        <span className="h1 font-Poppins w-[100%] text-center">
          Web Developer
        </span>
      </div>
      <div className="flex items-center justify-center z-[100px]">
        <img
          src={avatar}
          className="relative z-0"
          alt="avatar"
          height={400}
          width={400}
        />
        <div className="rounded-full bg-black shadow-custom h-[150px] z-[-100px] self-end w-[40%] m-[-60px] blur-2xl absolute" />
        <div className="flex gap-[10px] absolute self-end justify-center m-[-20px]">
          <span className="bg-gradient-to-r z-[1000px] font-Poppins from-[#916EF1] to-[#D41EF1] leading-[70px] text-transparent bg-clip-text font-semibold text-[70px]">
            Manjeet
          </span>
          <span className="font-Poppins z-[1000px] text-white leading-[70px] font-semibold text-[70px] ">
            Pathak
          </span>
        </div>
      </div>
    </div>
  );
};
