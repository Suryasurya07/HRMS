import React from 'react';
import { Button, Avatar, LinearProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const Projects = () => {
  const projects = [
    {
      title: 'Project 1',
      companyProfilePicture: 'https://via.placeholder.com/40',
      status: 'In Progress',
      about: 'This is a web development project using React.js and Node.js.',
      members: [
        { name: 'Alice', profilePicture: 'https://via.placeholder.com/30' },
        { name: 'Bob', profilePicture: 'https://via.placeholder.com/30' },
        { name: 'Charlie', profilePicture: 'https://via.placeholder.com/30' },
      ],
      progress: 70,
      color: 'goldenrod',
      date: '2023-08-01',
    },
    {
      title: 'Project 2',
      companyProfilePicture: 'https://via.placeholder.com/40',
      status: 'Completed',
      about: 'Machine learning model built with Python and TensorFlow.',
      members: [
        { name: 'Dave', profilePicture: 'https://via.placeholder.com/30' },
        { name: 'Emma', profilePicture: 'https://via.placeholder.com/30' },
      ],
      progress: 100,
      color: 'green',
      date: '2023-09-15',
    },
    {
      title: 'Project 3',
      companyProfilePicture: 'https://via.placeholder.com/40',
      status: 'Pending',
      about: 'A task management mobile app built with React Native.',
      members: [
        { name: 'Frank', profilePicture: 'https://via.placeholder.com/30' },
        { name: 'Grace', profilePicture: 'https://via.placeholder.com/30' },
        { name: 'Heidi', profilePicture: 'https://via.placeholder.com/30' },
      ],
      progress: 30,
      color: 'orange',
      date: '2023-10-01',
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-white">My Projects</h2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => alert('Add Project functionality coming soon!')}
        >
          Add Project
        </Button>
      </div>

      <VerticalTimeline>
        {projects.map((project, index) => (
          <VerticalTimelineElement
            key={index}
            date={project.date}
            icon={<Avatar alt="Company Logo" src={project.companyProfilePicture} />}
            iconStyle={{ backgroundColor: project.color }}
            contentStyle={{ backgroundColor: '#2d2d2d', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid #2d2d2d' }}
          >
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p>{project.status}</p>
            <p className="text-sm">{project.about}</p>
            <div className="flex my-2">
              {project.members.map((member, idx) => (
                <Avatar
                  key={idx}
                  alt={member.name}
                  src={member.profilePicture}
                  style={{ marginLeft: idx !== 0 ? -10 : 0, border: '2px solid white' }}
                />
              ))}
            </div>
            <div className="flex items-center">
              <LinearProgress
                variant="determinate"
                value={project.progress}
                style={{
                  width: '100%',
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#e0e0e0',
                  color: project.color,
                }}
              />
              <span style={{ marginLeft: 10, color: project.color }}>{project.progress}%</span>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Projects;
