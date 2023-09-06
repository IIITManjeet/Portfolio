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
            className="w-[60%] h-[60%] object-contain"
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
        className="mt-[20px] flex flex-col gap-[5px] justify-center items-center"
        variants={textVariant()}
      >
        <p
          className={`font-Poppins text-[#CACACA] text-[22px] leading-[33px] text-center`}
        >
          What I have done so far
        </p>
        <h2
          className={`font-Poppins leading-[96px] text-[64px] bg-gradient-to-r z-[1000px] from-[#640FEF] to-[#A32B99] text-transparent bg-clip-text font-bold`}
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
