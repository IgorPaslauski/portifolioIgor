import React from "react";
import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/projects/ProjectsSection";
import ExperienceSection from "../components/experience/ExperienceSection";
import CertificationsSection from "../components/certifications/CertificationsSection";
import SkillsSection from "../components/skills/SkillsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import PostsSection from "@/components/medium/PostsSection";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <SkillsSection />
        <PostsSection />
        <ContactSection />
        <BackToTop />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
