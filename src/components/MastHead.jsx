import React from "react";
import avatar from "../assets/avatar.png";

export const MastHead = () => {
  return (
    <div className="flex flex-col relative justify-center items-center z-0">
      <div className="font-Preahvihear leading-[40.59px] text-[28px] border-[#D41EF1B0] animate-bounce font-normal z-[1000px] absolute top-[100px] border-[1px] py-[8px] px-[36px] rounded-[56px] left-[58vw] text-white">
        Hello!
      </div>
      <div className="flex justify-center items-center absolute">
        <span className="h1 font-Poppins">Web Developer</span>
      </div>
      <div className="flex items-center justify-center z-[100px]">
        <img
          src={avatar}
          className="relative z-0"
          alt="avatar"
          height={400}
          width={400}
        />
        <div className="flex gap-[10px] absolute self-end justify-center m-[-20px]">
          <div className="flex justify-center items-center relative gap-[20px] rounded-full">
            <div className="rounded-full bg-black shadow-custom h-[100px] opacity-[0.85] z-[-100px] blur-xl w-[100%] absolute" />
            <span className="bg-gradient-to-r z-[10px] brightness-[1.5] font-Poppins from-[#916EF1] to-[#D41EF1] leading-[70px] text-transparent bg-clip-text font-bold text-[70px] font-normal">
              Manjeet
            </span>
            <span className="font-Poppins z-[10px] brightness-[1.5] text-white leading-[70px] font-bold text-[70px] font-normal">
              Pathak
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};