import React from "react";
import { motion } from "framer-motion";

export const ScrollBar = ({to}) => {
  return (
    <div className="w-full pb-5 mt-auto flex justify-center items-center">
      <a href={`#${to}`}>
        <div className="w-[30px] h-[54px] rounded-3xl border-[#D41EF1] border-2 flex justify-center items-start p-2">
          <motion.div
            animate={{
              y: [0, 24, 0],
            }}
            transition={{
              duration: 2.0,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-[12px] h-[12px] rounded-full bg-[#D41EF1] mb-1"
          />
        </div>
      </a>
    </div>
  );
};
