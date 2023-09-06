import React from "react";
import { fadeIn, slideIn, textVariant, zoomIn } from "../utils/motion";
import { motion } from "framer-motion";
import avatar from "../assets/avatar-about.png";
import commafirst from "../assets/commafirst.svg";
import commalast from "../assets/commalast.svg";

import { SectionWrapper } from "../hocs";
const About = () => {
  return (
    <>
      <div
        id="about"
        className="w-[100%] text-white w-[100%] flex mt-[80px] p-[40px] h-min-screen justify-between"
      >
        <div className="flex flex-col gap-[20px] justify-start items-between w-[60%] text-justify">
          <motion.div variants={textVariant()}>
            <span className="font-Poppins leading-[96px] text-[64px] bg-gradient-to-r z-[1000px] from-[#631FD2] to-[#A32B99] text-transparent bg-clip-text font-bold">
              About
            </span>
          </motion.div>
          <motion.p
            variants={fadeIn("", "", 0.2, 2)}
            className="font-Poppins leading-[30px] text-[#A1A1A6] text-[20px]"
          >
            I am a passionate and experienced full-stack web developer with a
            proven track record of creating multiple impressive websites. With a
            genuine love for web development, I am always eager to expand my
            skill set and stay at the forefront of the ever-evolving digital
            landscape. My dedication to crafting engaging and functional web
            experiences shines through in every project. Explore my portfolio to
            witness a blend of{" "}
            <span className="text-white">
              creativity, technical expertise, and a relentless drive for
              excellence.
            </span>
          </motion.p>
        </div>
        <motion.img
          variants={zoomIn(0.2, 2)}
          src={avatar}
          alt="about-avatar"
          height={400}
          width={400}
        />
      </div>
      <motion.div
        variants={slideIn("up","ease-in",0.1,1.2)}
        className="flex w-[100%] gap-[20px] my-[90px] justify-center items-center"
      >
        <span className="flex self-start pt-2">
          <img src={commafirst} alt="comma" />
        </span>
        <div className="flex flex-col">
          <span className="font-Poppins leading-[48px] text-justify text-white text-[32px]">
            Living the life of a Full Stack Web Developer:
          </span>
          <span className="font-Poppins leading-[48px] text-justify text-white text-[32px]">
            where{" "}
            <span className="bg-gradient-to-r z-[1000px] from-[#5794F0] to-[#B715E0] text-transparent bg-clip-text">
              bugs are features
            </span>{" "}
            &{" "}
            <span className="bg-gradient-to-r z-[1000px] from-[#631FD2] to-[#C130B5] text-transparent bg-clip-text">
              coffee is the ultimate debugger!
            </span>
          </span>
        </div>
        <span className="flex self-end py-[50px]">
          <img src={commalast} alt="comma" />
        </span>
      </motion.div>
    </>
  );
};

export default SectionWrapper(About, "about");
