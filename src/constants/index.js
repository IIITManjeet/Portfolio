import codame from "../assets/codame.svg";
import singularityAI from "../assets/singularityAI.jpg";
import metaverse from "../assets/metaverse.png";
import iiit from "../assets/iiitbhopal.jpg";
import EHR from "../assets/EHR.png";
const experiences = [
  {
    title: "Web Development Lead",
    company_name: "CODAME, IIIT Bhopal",
    icon: codame,
    iconBg: "#000000",
    date: "August 2023 - Present",
    points: [
      "Lead a team of three web developers in the design, development, and maintenance of the official website for CODAME IIIT Bhopal, ensuring it aligns with the club's goals and objectives.",
      "Bring your web development expertise to the forefront by guiding the team in selecting appropriate technologies, frameworks, and best practices for building an innovative and user-friendly website.",
      "Foster a collaborative and creative work environment, providing mentorship to team members, sharing knowledge, and fostering skill development. Encourage open communication and teamwork to achieve project milestones and deliver an exceptional website and hackathon experience.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "GrowthFarm",
    icon: singularityAI,
    iconBg: "#000000",
    date: "May 2023 - Jul 2023",
    points: [
      "Developed robust and reliable front-end for web and Android applications that increased ease by 90 %",
      "Integrated potent, reliable back-end using NestJS 13 and Nhipster to manage SASS applications.",
      "Incorporated GPT-based data scraping via 3rd party API and used Docker and Kubernetes for deployment",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Web 3 Full Stack Developer",
    company_name: "Metaverse Ventures Pvt Ltd",
    icon: metaverse,
    iconBg: "#383E56",
    date: "February 2023 - May 2023",
    points: [
      "Developing and maintaining web3 applications using Next.js, Tailwind.js and other related technologies.",
      "Engineered a smooth user experience by implementing powerful and engaging frontend designs for web 3",
      "Streamlined data management by incorporating reliable back-end for enhanced efficiency and accuracy",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Assistant Web Developer",
    company_name: "CODAME, IIIT Bhopal",
    icon: codame,
    iconBg: "#000000",
    date: "Oct 2022 - Aug 2023",
    points: [
      "Developing and maintaining web applications using Next.js and other related technologies.",
      "Deployed the official website of the club with intuitive interfaces and seamless navigation for enhanced UX",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Enhanced engagement with lazy loading, caching & advanced optimizations to boost performance by 15%",
    ],
  },
  {
    title: "Teaching Assistant",
    company_name: "IIIT Bhopal",
    icon: iiit,
    iconBg: "#000000",
    date: "Aug 2023 - Present",
    points: [
      "With a strong academic foundation and a cumulative GPA of 9.72, I have actively engaged in both coursework and hands-on projects that have equipped me with a diverse skill set. I am currently working as a Teaching Assistant under Professor Dr. Gaurav Kumar Bharti.",
    ],
  },
];
const projects = [
  {
    name: "EHR",
    subHead: "Electronic Health Record",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: EHR,
    source_code_link: "https://github.com/",
  },
  {
    name: "EHR",
    subHead: "Electronic Health Record",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: EHR,
    source_code_link: "https://github.com/",
  },
  {
    name: "EHR",
    subHead: "Electronic Health Record",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: EHR,
    source_code_link: "https://github.com/",
  },
];

const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
    title: "Experiences",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export { experiences, projects, navLinks };
