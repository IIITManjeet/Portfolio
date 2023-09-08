import React from "react";
import { motion } from "framer-motion";
import { projects } from "../constants";
import github from "../assets/github.png";
import { fadeIn, slideIn, textVariant } from "../utils/motion";
import { Tilt } from "react-tilt";
import { SectionWrapper } from "../hocs";
import arrow from "../assets/arrow.svg";

const ProjectCard = ({
  index,
  name,
  subHead,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spr", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-[#310238] font-Poppins p-[10px] relative rounded-[24px] sm:w-[360px] w-full"
      >
        <div className="fixed bg-[#D41EF1B0] blur-[200px] opacity-[0.30] z-0 top-[-40px] right-[-250px] h-[400px] w-[400px] absolute" />
        <div className="relative w-full rounded-[20px] h-[230px]">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-[20px]"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="bg-black font-Poppins w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="my-5">
          <h3 className="text-white font-bold text-[24px] text-justify">
            {name} -{"  "}
            <span className="text-white font-normal text-[#CBCBCB] text-[20px]">
              {subHead}
            </span>
          </h3>
        </div>

        <div className="mt-2 flex justify-end items-center px-4">
          <span className="flex w-[34px] h-[34px] bg-[#d41ef121] stroke-[2px] stroke-[#D41EF133] justify-center items-center rounded-full ">
            <img
              src={arrow}
              alt="arrow"
              className="text-white"
              width={24}
              height={24}
            />
          </span>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2
          className={`mt-[40px] drop-shadow-lg font-Poppins font-bold leading-[96px] text-[64px] text-white bg-clip-text font-bold`}
        >
          Projects.
        </h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-[#7B7B7B] text-[20px] text-justify font-Poppins max-w-[756px] leading-normal"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
      <motion.div
        variants={textVariant()}
        className="flex justify-center items-center sm:gap-[150px] mt-[60px]"
      >
        <div className="flex sm:flex-row flex-col justify-center items-center gap-[-18px] flex-[33%]">
          <span className="sm:w-[47%] bg-gradient-to-r from-[#631FD2] font-[Poppins] text-[64px] font-bold leading-[96px] to-[#A32B99] text-transparent bg-clip-text">
            1.5+
          </span>
          <span className="sm:w-[30%] font-[Poppins] text-[18px] font-normal leading-[19.28px] sm:text-left text-center text-[#D1D1D1]">
            Years of Experience
          </span>
        </div>
        <div className="flex  sm:flex-row flex-col justify-center items-center gap-[-10px] flex-[33%]">
          <span className="sm:w-[20%] bg-gradient-to-r from-[#631FD2] font-[Poppins] text-[64px] font-bold leading-[96px] to-[#A32B99] text-transparent bg-clip-text">
            1
            <sup className="bg-gradient-to-r from-[#631FD2] text-[20px] leading-[30px] align-super font-[Poppins] font-bold to-[#A32B99] text-transparent bg-clip-text">
              st
            </sup>
          </span>
          <span className="sm:w-[50%] font-[Poppins] text-[18px] font-normal leading-[19.28px] sm:text-left text-center text-[#D1D1D1]">
            Runner Up in <span className="text-white">Codeutsava 6.0</span>
          </span>
        </div>
        <div className="flex  sm:flex-row flex-col justify-center items-center gap-[-8px] flex-[33%]">
          <span className="sm:w-[50%] bg-gradient-to-r from-[#631FD2] font-[Poppins] text-[64px] font-bold leading-[96px] to-[#A32B99] text-transparent bg-clip-text">
            500+
          </span>
          <span className="sm:w-[30%] font-[Poppins] text-[18px] align-left font-normal leading-[19.28px] text-[#D1D1D1]">
            DSA Ques. Solved
          </span>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Projects, "projects");
