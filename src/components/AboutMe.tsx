import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export const AboutMe: React.FC = () => {
  return (
    <div className="prose prose-sm max-w-none">
      <div className="mb-1 text-center mt-10">
        <img
          src="https://media.licdn.com/dms/image/v2/D5603AQHNc6bO45N1Rg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720363416069?e=1738195200&v=beta&t=bqOASVAD2-TdTxYmJvI4_TtPiqSaQ0eiCdLiJ7fXox0"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />
        <h1 className="text-2xl font-bold mb-2 text-gray-500">Srijan Das</h1>
        <p className="text-gray-600">Full Stack Developer</p>
      </div>

      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold mb-3">About Me</h2>
        <p className="text-gray-700">
        I am a third-year Computer Science undergraduate at LNMIIT, a passionate full-stack web developer, and a machine learning enthusiast.
        In the last 2+ years, I have gained hands-on experience by contributing to various projects/internship and working with skills that include Data Structures and Algorithms (Java), full-stack web development (ReactJS, MongoDB, MySQL, Express, NodeJS), and machine learning (Python, ScikitLearn).
        Currently I am serving as the development domain lead of the Google Developer's Group for my college, & I enjoy collaborating on innovative projects and contributing to the open-source community.
        Outside of my academic and professional life, I am an anime enthusiast and I also love documenting my life..
        </p>
      </div>

      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold mb-3 text-gray-500">Skills</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {['React', 'TypeScript', 'Node.js', 'Next.js' , 'AWS', 'Docker', 'JavaScript', 'SQL', 'MongoDB', 'Express', 'K8s', 'Linux', 'Java']
            .map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-blue-600 hover:text-white cursor-pointer"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <a href="https://github.com/thisIsSrijan" className="text-gray-700 hover:text-blue-600">
          <Github className="w-6 h-6" />
        </a>
        <a href="https://www.linkedin.com/in/dassrijan16/" className="text-gray-700 hover:text-blue-600">
          <Linkedin className="w-6 h-6" />
        </a>
        <a href="mailto:dassrijan16@gmail.com" className="text-gray-700 hover:text-blue-600">
          <Mail className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};