import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Upload, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Company Overview Page
function CompanyOverview() {
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState("");
  const [history, setHistory] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    // Handle submission logic here
    toast({
      title: "Company Overview Saved",
      description: "Your company details have been successfully updated.",
      action: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Company Overview</h1>
      <Input
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <Textarea
        placeholder="Company Introduction"
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
        className="min-h-[100px]"
      />
      <Textarea
        placeholder="Vision"
        value={vision}
        onChange={(e) => setVision(e.target.value)}
        className="min-h-[100px]"
      />
      <Textarea
        placeholder="Mission"
        value={mission}
        onChange={(e) => setMission(e.target.value)}
        className="min-h-[100px]"
      />
      <Textarea
        placeholder="Short History"
        value={history}
        onChange={(e) => setHistory(e.target.value)}
        className="min-h-[150px]"
      />
      <Button onClick={handleSubmit}>Save Overview</Button>
    </div>
  );
}

// Our Story / Journey Page
function OurStory() {
  const [story, setStory] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Our Story Saved",
      description: "Your company's journey has been updated.",
      action: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Our Story / Journey</h1>
      <Textarea
        placeholder="Tell us your company's story, milestones, and growth."
        value={story}
        onChange={(e) => setStory(e.target.value)}
        className="min-h-[200px]"
      />
      <Button onClick={handleSubmit}>Save Story</Button>
    </div>
  );
}

// Leadership / Team Page
function LeadershipTeam() {
  const [teamMembers, setTeamMembers] = useState([
    { name: "", role: "", profile: "" },
  ]);
  const { toast } = useToast();

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", role: "", profile: "" }]);
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...teamMembers];
    newMembers[index][field] = value;
    setTeamMembers(newMembers);
  };

  const handleSubmit = () => {
    toast({
      title: "Team Updated",
      description: "Your leadership and team information has been updated.",
      action: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Leadership / Team</h1>
      {teamMembers.map((member, index) => (
        <div key={index} className="border p-4 rounded-md space-y-4">
          <Input
            placeholder="Member Name"
            value={member.name}
            onChange={(e) => handleMemberChange(index, "name", e.target.value)}
          />
          <Input
            placeholder="Role (e.g., Founder, Director)"
            value={member.role}
            onChange={(e) => handleMemberChange(index, "role", e.target.value)}
          />
          <Textarea
            placeholder="Profile Summary / Bio"
            value={member.profile}
            onChange={(e) => handleMemberChange(index, "profile", e.target.value)}
            className="min-h-[100px]"
          />
          {/* You could add an upload button for photos here */}
        </div>
      ))}
      <Button onClick={addTeamMember}>Add Team Member</Button>
      <Button onClick={handleSubmit} className="ml-2">Save Team</Button>
    </div>
  );
}

// Vision & Mission Page
function VisionMissionDetailed() {
  const [detailedVision, setDetailedVision] = useState("");
  const [detailedMission, setDetailedMission] = useState("");
  const [values, setValues] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Vision & Mission Updated",
      description: "Your detailed vision, mission, and values have been updated.",
      action: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Vision & Mission</h1>
      <Textarea
        placeholder="Detailed Vision"
        value={detailedVision}
        onChange={(e) => setDetailedVision(e.target.value)}
        className="min-h-[150px]"
      />
      <Textarea
        placeholder="Detailed Mission"
        value={detailedMission}
        onChange={(e) => setDetailedMission(e.target.value)}
        className="min-h-[150px]"
      />
      <Textarea
        placeholder="Core Values (e.g., Integrity, Innovation, Excellence)"
        value={values}
        onChange={(e) => setValues(e.target.value)}
        className="min-h-[150px]"
      />
      <Button onClick={handleSubmit}>Save Vision & Mission</Button>
    </div>
  );
}

// Core Values / Culture Page
function CoreValuesCulture() {
  const [valuesDescription, setValuesDescription] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Culture Values Saved",
      description: "Your company's core values and culture have been updated.",
      action: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Core Values / Culture</h1>
      <Textarea
        placeholder="Detail your core values like Integrity, Innovation, Excellence."
        value={valuesDescription}
        onChange={(e) => setValuesDescription(e.target.value)}
        className="min-h-[200px]"
      />
      <Button onClick={handleSubmit}>Save Values</Button>
    </div>
  );
}

// Careers / Work With Us Page
function Careers() {
  const [jobOpenings, setJobOpenings] = useState([
    { title: "", description: "", requirements: "" },
  ]);
  const [hiringProcess, setHiringProcess] = useState("");
  const [internships, setInternships] = useState("");
  const { toast } = useToast();

  const addJobOpening = () => {
    setJobOpenings([...jobOpenings, { title: "", description: "", requirements: "" }]);
  };

  const handleJobChange = (index, field, value) => {
    const newJobs = [...jobOpenings];
    newJobs[index][field] = value;
    setJobOpenings(newJobs);
  };

  const handleSubmit = () => {
    toast({
      title: "Careers Info Updated",
      description: "Your job openings and hiring process have been updated.",
      action: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Careers / Work With Us</h1>
      <h2 className="text-xl font-semibold">Job Openings</h2>
      {jobOpenings.map((job, index) => (
        <div key={index} className="border p-4 rounded-md space-y-4">
          <Input
            placeholder="Job Title"
            value={job.title}
            onChange={(e) => handleJobChange(index, "title", e.target.value)}
          />
          <Textarea
            placeholder="Job Description"
            value={job.description}
            onChange={(e) => handleJobChange(index, "description", e.target.value)}
            className="min-h-[100px]"
          />
          <Textarea
            placeholder="Requirements"
            value={job.requirements}
            onChange={(e) => handleJobChange(index, "requirements", e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      ))}
      <Button onClick={addJobOpening}>Add Job Opening</Button>

      <h2 className="text-xl font-semibold pt-6">Hiring Process</h2>
      <Textarea
        placeholder="Describe your hiring process."
        value={hiringProcess}
        onChange={(e) => setHiringProcess(e.target.value)}
        className="min-h-[150px]"
      />

      <h2 className="text-xl font-semibold pt-6">Internships</h2>
      <Textarea
        placeholder="Information about internships."
        value={internships}
        onChange={(e) => setInternships(e.target.value)}
        className="min-h-[150px]"
      />

      <Button onClick={handleSubmit}>Save Careers Info</Button>
    </div>
  );
}

// Achievements / Milestones Page
function AchievementsMilestones() {
  const [achievements, setAchievements] = useState([
    { year: "", description: "" },
  ]);
  const { toast } = useToast();

  const addAchievement = () => {
    setAchievements([...achievements, { year: "", description: "" }]);
  };

  const handleAchievementChange = (index, field, value) => {
    const newAchievements = [...achievements];
    newAchievements[index][field] = value;
    setAchievements(newAchievements);
  };

  const handleSubmit = () => {
    toast({
      title: "Achievements Saved",
      description: "Your company's achievements and milestones have been updated.",
      action: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Achievements / Milestones</h1>
      {achievements.map((achievement, index) => (
        <div key={index} className="border p-4 rounded-md space-y-4">
          <Input
            placeholder="Year"
            value={achievement.year}
            onChange={(e) => handleAchievementChange(index, "year", e.target.value)}
          />
          <Textarea
            placeholder="Description (e.g., Awards, Recognitions, Partnerships, Key Clients)"
            value={achievement.description}
            onChange={(e) => handleAchievementChange(index, "description", e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      ))}
      <Button onClick={addAchievement}>Add Achievement</Button>
      <Button onClick={handleSubmit} className="ml-2">Save Achievements</Button>
    </div>
  );
}

// Navbar Component (example of how you might structure navigation)
function Navbar() {
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">Your Logo</a>
        <div className="space-x-4">
          <a href="/" className="hover:text-gray-300">Home</a>
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
              className="hover:text-gray-300 focus:outline-none"
            >
              About Us
            </button>
            {isAboutDropdownOpen && (
              <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a href="/about-us/company-overview" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Company Overview</a>
                  <a href="/about-us/our-story" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Our Story / Journey</a>
                  <a href="/about-us/leadership-team" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Leadership / Team</a>
                  <a href="/about-us/vision-mission" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Vision & Mission</a>
                  <a href="/about-us/core-values-culture" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Core Values / Culture</a>
                  <a href="/about-us/achievements-milestones" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Achievements / Milestones</a>
                  <a href="/about-us/careers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Careers / Work With Us</a>
                </div>
              </div>
            )}
          </div>
          <a href="/contact" className="hover:text-gray-300">Contact</a>
        </div>
      </div>
    </nav>
  );
}

// Example App component to demonstrate usage
function App() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        {/* In a real app, you would use a router here to display the correct page */}
        {/* Example: */}
        {/* <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us/company-overview" element={<CompanyOverview />} />
          <Route path="/about-us/our-story" element={<OurStory />} />
          <Route path="/about-us/leadership-team" element={<LeadershipTeam />} />
          <Route path="/about-us/vision-mission" element={<VisionMissionDetailed />} />
          <Route path="/about-us/core-values-culture" element={<CoreValuesCulture />} />
          <Route path="/about-us/careers" element={<Careers />} />
          <Route path="/about-us/achievements-milestones" element={<AchievementsMilestones />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes> */}

        {/* For demonstration purposes, let's render one of the pages */}
        <CompanyOverview />
      </main>
    </div>
  );
}

// Placeholder for Contact Page and HomePage
function ContactPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Contact Us</h1>
      <p>Contact details and form will go here.</p>
      <Mail className="h-12 w-12 mt-4 text-blue-500" />
    </div>
  );
}

function HomePage() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Company</h1>
      <p className="text-lg text-gray-600">Explore our services and learn more about us.</p>
    </div>
  );
}


export default App;