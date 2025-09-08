import React, { useState, useEffect } from 'react';

// --- MOCK DATA ---
// You can replace this with your actual data
const portfolioData = {
    name: "Jim B.",
    title: "Software Engineer",
    location: "New York, NY",
    email: "hello@jimb.is",
    socials: {
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        twitter: "https://twitter.com/yourusername",
    },
    about: "I'm a passionate software engineer with a knack for building elegant solutions to complex problems. I specialize in full-stack development with a focus on creating performant and user-friendly web applications. When I'm not coding, you can find me exploring new technologies or contributing to open-source projects.",
    experience: [
        {
            company: "Tech Solutions Inc.",
            role: "Senior Software Engineer",
            period: "Jan 2021 - Present",
            description: "Led the development of a new client-facing analytics dashboard using React and D3.js. Mentored junior developers and improved code quality by implementing a new CI/CD pipeline, reducing build times by 30%.",
            skills: ["React", "Node.js", "TypeScript", "AWS", "CI/CD"]
        },
        {
            company: "Innovate Co.",
            role: "Software Engineer",
            period: "Jun 2018 - Dec 2020",
            description: "Developed and maintained features for a large-scale e-commerce platform. Worked across the stack with Python (Django) and JavaScript (Vue.js). Contributed to a 15% improvement in page load times through performance optimization.",
            skills: ["Python", "Django", "Vue.js", "PostgreSQL", "Docker"]
        }
    ],
    projects: [
        {
            name: "Project Alpha",
            description: "A real-time collaborative code editor built with WebSockets and Monaco Editor. Allows multiple users to code in the same environment simultaneously.",
            stack: ["React", "Node.js", "WebSocket", "Monaco"],
            link: "https://github.com/yourusername/project-alpha",
            live: "https://project-alpha.example.com"
        },
        {
            name: "Data Visualizer",
            description: "A web application for creating beautiful and interactive charts from CSV data. Built with a focus on performance and usability.",
            stack: ["Next.js", "D3.js", "Tailwind CSS"],
            link: "https://github.com/yourusername/data-visualizer",
            live: null
        },
        {
            name: "E-commerce API",
            description: "A robust RESTful API for an e-commerce platform, featuring authentication, product management, and order processing.",
            stack: ["Python", "FastAPI", "PostgreSQL", "Docker"],
            link: "https://github.com/yourusername/ecommerce-api",
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
const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
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
                    <a href={portfolioData.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon /></a>
                    <a href={`mailto:${portfolioData.email}`} className="text-gray-400 hover:text-white transition-colors"><MailIcon /></a>
                </div>
            </section>
            
            {/* --- Experience Preview --- */}
            <section className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Recent Experience</h2>
                <div className="space-y-8">
                    {portfolioData.experience.slice(0, 1).map((job, index) => (
                        <div key={index} className="relative pl-8 border-l-2 border-gray-700">
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
                    {portfolioData.projects.slice(0, 3).map((project, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-6 flex flex-col hover:shadow-lg hover:shadow-teal-500/20 transition-shadow">
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
            {portfolioData.experience.map((job, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-gray-700">
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
            {portfolioData.projects.map((project, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6 flex flex-col hover:shadow-lg hover:shadow-teal-500/20 transition-shadow">
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
        // Update the browser's history and URL
        window.history.pushState({}, '', path);
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
            {/* Removed the "container" and "mx-auto" classes to allow the main content to fill the screen width */}
            <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-8">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
}
