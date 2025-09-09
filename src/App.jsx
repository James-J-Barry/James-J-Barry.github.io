import React, { useState, useEffect } from 'react';

const portfolioData = {
    name: "James Barry",
    title: "Software Engineer & Researcher",
    location: "College Park, MD",
    email: "james.j.barry@icloud.com",
    socials: {
        github: "https://github.com/James-J-Barry",
        linkedin: "https://linkedin.com/in/James-J-Barry",
    },
    about: "I'm a Computer Science student at the University of Maryland with a passion for building scalable, efficient software solutions. My experience ranges from developing data science pipelines on high-performance computing clusters to creating user-facing web applications and browser extensions. I am deeply interested in NLP, parallel computing, and quantum machine learning.",
    experience: [
        {
            company: "Parsons Corporation & Army Research Lab DSRC",
            role: "Software Engineer & Data Scientist Intern",
            period: "Jun 2025 - Aug 2025",
            description: "Built and deployed a scalable evaluation system for semantic similarity algorithms on Army Test Incident Reports. Improved search precision by over 280% using multi-stage LLM summarization pipelines and cut processing time by 8x by parallelizing analysis across an 8-node HPC cluster. Designed and created reproducible, documented Python tooling for long-term research integration.",
            skills: ["Python", "HPC", "PBS", "NLP", "Prompt Engineering", "GitLab"]
        },
        {
            company: "First Year Innovation and Research Experience (FIRE)",
            role: "Quantum Machine Learning Researcher",
            period: "Jan 2025 - Present",
            description: "Developing a strong foundational understanding of quantum computing and machine learning through hands-on research in collaboration with the QLab Quantum research lab. Executing projects centered on quantum software, hardware, and data analysis using state-of-the-art tools.",
            skills: ["Quantum Machine Learning", "Python", "Data Analysis", "Research"]
        },
        {
            company: "Bitcamp",
            role: "Logistics and Hardware Organizer",
            period: "Oct 2024 - May 2025",
            description: "As part of the organizing team for UMD's premier hackathon, I secured and managed hardware for over 1,400 participants. I also utilized CAD software to design and construct a large collaborative art piece for the event.",
            skills: ["Project Management", "Logistics", "CAD", "Hardware"]
        }
    ],
    projects: [
        {
            name: "High-Vis Grades for Gradescope",
            description: "A Chrome Extension addressing a key limitation in the Gradescope platform for 40,000+ UMD students. It injects a script to automatically calculate and display weighted course grades.",
            stack: ["JavaScript", "Chrome APIs", "DOM Manipulation", "HTML"],
            link: "https://github.com/James-J-Barry", // Update with specific repo link if available
            live: null
        },
        {
            name: "RecipEZ - HopHacks Project",
            description: "An online recipe database created at HopHacks to store recipes and nutrition info for users with dietary restrictions. Features a web app for users to search for and contribute recipes.",
            stack: ["TypeScript", "React", "Node.js", "MongoDB", "Auth0"],
            link: "https://github.com/James-J-Barry", // Update with specific repo link if available
            live: null
        }
    ]
};

// --- SVG ICONS ---
const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);
const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
    </svg>
);
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);
const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
    </svg>
);
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
        <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);
const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);


// --- PAGE COMPONENTS ---

const HomePage = ({ navigate }) => {
    // The navigate function is passed down from App to handle routing
    const handleNavClick = (e, path) => {
        e.preventDefault();
        navigate(path);
    };

    return (
        <div className="space-y-16 md:space-y-24">
            {/* --- Hero/About Section --- */}
            <section className="flex flex-col items-center justify-center text-center p-8">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">{portfolioData.name}</h1>
                <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-6">{portfolioData.title}</h2>
                <p className="max-w-2xl text-gray-400 mb-8">{portfolioData.about}</p>
                <div className="flex items-center space-x-6">
                    <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><GithubIcon /></a>
                    <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><LinkedinIcon /></a>
                    <a href={`mailto:${portfolioData.email}`} className="text-gray-400 hover:text-white transition-colors"><MailIcon /></a>
                </div>
            </section>
            
            {/* --- Experience Preview --- */}
            <section className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Recent Experience</h2>
                <div className="space-y-8">
                    {portfolioData.experience.slice(0, 1).map((job) => (
                        <div key={job.company} className="relative pl-8 border-l-2 border-gray-700">
                            <div className="absolute w-4 h-4 bg-teal-500 rounded-full -left-2 top-1"></div>
                            <p className="text-sm font-semibold text-teal-400 mb-1">{job.period}</p>
                            <h3 className="text-2xl font-bold text-white">{job.role}</h3>
                            <h4 className="text-lg font-medium text-gray-300 mb-3">{job.company}</h4>
                            <p className="text-gray-400 mb-4">{job.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {job.skills.map(skill => (
                                    <span key={skill} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <a href="/experience" onClick={(e) => handleNavClick(e, '/experience')} className="inline-block bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-500 transition-colors">
                        View Full Experience
                    </a>
                </div>
            </section>
            
            {/* --- Projects Preview --- */}
            <section className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioData.projects.slice(0, 3).map((project) => (
                        <div key={project.name} className="bg-gray-800 rounded-lg p-6 flex flex-col hover:shadow-lg hover:shadow-teal-500/20 transition-shadow">
                            <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                            <p className="text-gray-400 flex-grow mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.stack.map(tech => (
                                    <span key={tech} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{tech}</span>
                                ))}
                            </div>
                            <div className="mt-auto pt-4 border-t border-gray-700 flex items-center space-x-4 text-sm">
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-400 hover:text-teal-300 transition-colors">
                                    <GithubIcon />
                                    <span className="ml-2">Source Code</span>
                                </a>
                                {project.live && (
                                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-400 hover:text-teal-300 transition-colors">
                                        <LinkIcon />
                                        <span className="ml-1">Live Demo</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <a href="/projects" onClick={(e) => handleNavClick(e, '/projects')} className="inline-block bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors">
                        View All Projects
                    </a>
                </div>
            </section>
        </div>
    );
};


const ExperiencePage = () => (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Work Experience</h1>
        <div className="space-y-12">
            {portfolioData.experience.map((job) => (
                <div key={job.company} className="relative pl-8 border-l-2 border-gray-700">
                    <div className="absolute w-4 h-4 bg-teal-500 rounded-full -left-2 top-1"></div>
                    <p className="text-sm font-semibold text-teal-400 mb-1">{job.period}</p>
                    <h3 className="text-2xl font-bold text-white">{job.role}</h3>
                    <h4 className="text-lg font-medium text-gray-300 mb-3">{job.company}</h4>
                    <p className="text-gray-400 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {job.skills.map(skill => (
                            <span key={skill} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ProjectsPage = () => (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project) => (
                <div key={project.name} className="bg-gray-800 rounded-lg p-6 flex flex-col hover:shadow-lg hover:shadow-teal-500/20 transition-shadow">
                    <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                    <p className="text-gray-400 flex-grow mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.stack.map(tech => (
                            <span key={tech} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{tech}</span>
                        ))}
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-700 flex items-center space-x-4 text-sm">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-400 hover:text-teal-300 transition-colors">
                            <GithubIcon />
                            <span className="ml-2">Source Code</span>
                        </a>
                        {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-400 hover:text-teal-300 transition-colors">
                                <LinkIcon />
                                <span className="ml-1">Live Demo</span>
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const NotFoundPage = () => (
    <div className="text-center p-8">
        <h1 className="text-5xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-400">Page Not Found</p>
    </div>
);

// --- LAYOUT COMPONENTS ---

const Header = ({ currentPage, navigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClasses = (path, isMobile = false) => {
        const activeClass = 'bg-gray-900 text-white';
        const inactiveClass = 'text-gray-300 hover:bg-gray-700 hover:text-white';
        const mobileClasses = 'block px-3 py-2 rounded-md text-base font-medium';
        const desktopClasses = 'px-3 py-2 rounded-md text-sm font-medium';
        
        return `${isMobile ? mobileClasses : desktopClasses} transition-colors ${currentPage === path ? activeClass : inactiveClass}`;
    };

    const handleNavClick = (e, path) => {
        e.preventDefault();
        navigate(path);
        setIsMenuOpen(false); // Close menu on navigation
    };

    // Effect to prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    return (
        <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <a href="/" onClick={(e) => handleNavClick(e, '/')} className="text-white font-bold text-xl">
                            {portfolioData.name}
                        </a>
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a href="/" onClick={(e) => handleNavClick(e, '/')} className={navLinkClasses('/')}>Home</a>
                            <a href="/experience" onClick={(e) => handleNavClick(e, '/experience')} className={navLinkClasses('/experience')}>Experience</a>
                            <a href="/projects" onClick={(e) => handleNavClick(e, '/projects')} className={navLinkClasses('/projects')}>Projects</a>
                        </div>
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <XIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu, show/hide based on menu state */}
            {isMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="/" onClick={(e) => handleNavClick(e, '/')} className={navLinkClasses('/', true)}>Home</a>
                        <a href="/experience" onClick={(e) => handleNavClick(e, '/experience')} className={navLinkClasses('/experience', true)}>Experience</a>
                        <a href="/projects" onClick={(e) => handleNavClick(e, '/projects')} className={navLinkClasses('/projects', true)}>Projects</a>
                    </div>
                </div>
            )}
        </header>
    );
};

const Footer = () => (
    <footer className="bg-gray-800/50 mt-16 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
        </div>
    </footer>
);

// --- MAIN APP COMPONENT ---

export default function App() {
    // Helper function to determine the initial page.
    // This fixes an issue in preview environments where the initial path is not '/',
    // ensuring the homepage is shown by default instead of a 404 page.
    const getInitialPage = () => {
        const path = window.location.pathname;
        const validPaths = ['/', '/experience', '/projects'];
        // If the browser's path is not one of our defined pages, default to home.
        return validPaths.includes(path) ? path : '/';
    };

    // State to track the current page, initialized by our helper function.
    const [currentPage, setCurrentPage] = useState(getInitialPage());


    // This effect listens for browser back/forward navigation
    useEffect(() => {
        const handlePopState = () => {
            setCurrentPage(window.location.pathname);
        };
        // Add event listener for browser navigation
        window.addEventListener('popstate', handlePopState);
        
        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    // Function to handle navigation clicks from the Header
    const navigate = (path) => {
        try {
            // This will work on a live server but might fail in sandboxed environments like the preview
            window.history.pushState({}, '', path);
        } catch (error) {
            console.warn("Could not push state to history due to sandbox restrictions:", error);
            // Fallback for environments where pushState is restricted.
            // The page will still change, just the URL bar won't update in the preview.
        }
        // Update the state to re-render the correct page
        setCurrentPage(path);
    };

    // Simple router to render the correct page component
    const renderPage = () => {
        switch (currentPage) {
            case '/':
                return <HomePage navigate={navigate} />;
            case '/experience':
                return <ExperiencePage />;
            case '/projects':
                return <ProjectsPage />;
            default:
                // Show a 404 page for any other URL
                return <NotFoundPage />;
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen font-sans text-gray-100 flex flex-col">
            <Header currentPage={currentPage} navigate={navigate} />
            {/* This new structure for main ensures content is centered.
              1. The main tag is a full-width block that grows to fill space.
              2. The inner div acts as a container, handling centering, max-width, and padding.
            */}
            <main className="flex-grow w-full py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {renderPage()}
                </div>
            </main>
            <Footer />
        </div>
    );
}

