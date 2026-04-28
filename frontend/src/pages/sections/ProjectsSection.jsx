import React from 'react';
import SectionHeading from '../../components/common/SectionHeading';
import Section from '../../components/layout/Section';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';
import ProjectCard from '../../components/cards/ProjectCard';

const ProjectsSection = ({ projects, loading }) => (
  <Section id="projects">
    <SectionHeading subtitle="A selection of my recent Delivered Applications endeavors.">
      Featured Projects
    </SectionHeading>

    {loading ? (
      <Spinner size="lg" />
    ) : projects.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 grid-stagger">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    ) : (
      <EmptyState message="No projects found. Use the Admin Dashboard to add some!" />
    )}
  </Section>
);

export default ProjectsSection;
