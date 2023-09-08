import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { textVariant } from "../utils/motion";
import { experiences } from "../constants";
import { SectionWrapper } from "../hocs";
const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#25002C",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #B7B7B7" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center font-Poppins items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[80%] h-[80%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white font-Poppins text-[24px] font-bold">
          {experience.title}
        </h3>
        <p
          className="font-Poppins text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 font-Poppins text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};
function Experience() {
  return (
    <>
      <motion.div
        className="mt-[20px] flex flex-col justify-center relative items-center"
        variants={textVariant()}
      >
        <div className="fixed rounded-full bg-[#D41EF1B0] blur-[200px] opacity-[0.30] z-0 right-[-250px] top-[120px] h-[400px] w-[400px] absolute" />
        <div className="fixed rounded-[400px] bg-[#D41EF1B0] blur-[200px] opacity-[0.30] top-[800px] left-[-150px] h-[400px] w-[400px] absolute" />
        <div className="fixed rounded-full bg-[#D41EF1B0] blur-[200px] opacity-[0.30] z-0 right-[-250px] top-[1420px] h-[400px] w-[400px] absolute" />
        <div className="fixed rounded-[400px] bg-[#D41EF1B0] blur-[200px] opacity-[0.30] top-[2000px] left-[-150px] h-[400px] w-[400px] absolute" />
        <p
          className={`font-Poppins text-[#CACACA] text-[22px] leading-[33px] text-center`}
        >
          What I have done so far
        </p>
        <h2
          className={`font-Poppins leading-[96px] font-bold text-[64px] text-white`}
        >
          Work Experience.
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
}

export default SectionWrapper(Experience, "experience");
