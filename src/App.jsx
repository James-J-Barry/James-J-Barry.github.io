import React, { useState, useEffect } from 'react';

// --- PORTFOLIO DATA ---
const portfolioData = {
    name: "James Barry",
    title: "Software Engineer & Researcher",
    // Animated hero statements to cycle through
    heroStatements: [
        "a software engineer.",
        "a problem solver.",
        "a researcher.",
        "a creator.",
        "a scientist.",
        "ready to build."
    ],
    // Add the URL to your professional headshot here
    imageUrl: "/profpic.jpeg",
    // Add the path to your resume PDF (must be in the /public folder)
    resumeUrl: "/JamesBarryResume.pdf",
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
const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-download">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);


// --- HELPER COMPONENTS ---

const Typewriter = ({ statements }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        if (subIndex === statements[index].length + 1 && !reverse) {
            setReverse(true);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % statements.length);
            return;
        }
        
        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 45 : subIndex === statements[index].length ? 1500 : 100);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, statements]);

    // Blinking cursor effect
    useEffect(() => {
        const timeout2 = setTimeout(() => {
            setBlink(prev => !prev);
        }, 500);
        return () => clearTimeout(timeout2);
    }, [blink]);

    return (
        <span className="inline-flex items-center">
            jimb<span className="text-emerald-400">.is</span>&nbsp;
            <span className="text-sky-400">
                {`${statements[index].substring(0, subIndex)}`}
            </span>
            <span className={`transition-opacity duration-300 ${blink ? "opacity-100" : "opacity-0"}`}>
                _
            </span>
        </span>
    );
};


// --- PAGE COMPONENTS ---

const HomePage = ({ navigate }) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleNavClick = (e, path) => {
        e.preventDefault();
        navigate(path);
    };

    return (
        <div className="space-y-16 md:space-y-24">
            {/* --- Hero/About Section --- */}
            <section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left p-8 space-y-8 md:space-y-0 md:space-x-12 lg:space-x-24 min-h-[60vh]">
                <div className="md:w-2/3 max-w-2xl">
                    <h1 className={`text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-2 transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>{portfolioData.name}</h1>
                    <h2 className={`text-xl md:text-2xl xl:text-3xl font-light text-stone-300 mb-4 h-8 transition-all duration-700 ease-out delay-150 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <Typewriter statements={portfolioData.heroStatements} />
                    </h2>
                    <p className={`max-w-xl text-stone-400 lg:text-lg mb-6 mx-auto md:mx-0 transition-all duration-700 ease-out delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>{portfolioData.about}</p>
                    <div className={`flex items-center justify-center md:justify-start space-x-6 transition-all duration-700 ease-out delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-transform hover:scale-110"><GithubIcon /></a>
                        <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-transform hover:scale-110"><LinkedinIcon /></a>
                        <a href={`mailto:${portfolioData.email}`} className="text-stone-400 hover:text-white transition-transform hover:scale-110"><MailIcon /></a>
                        <a href={portfolioData.resumeUrl} download title="Download Resume" className="text-stone-400 hover:text-white transition-transform hover:scale-110"><DownloadIcon /></a>
                    </div>
                </div>
                <div className="md:w-1/3 flex-shrink-0">
                    <img 
                        src={portfolioData.imageUrl} 
                        alt="James Barry" 
                        className={`w-48 h-48 md:w-64 md:h-64 xl:w-72 xl:h-72 2xl:w-80 2xl:h-80 rounded-full mx-auto md:mx-0 object-cover border-4 border-stone-700 shadow-lg transition-all duration-1000 ease-out ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                    />
                </div>
            </section>
            
            {/* --- Experience Preview --- */}
            <section className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Recent Experience</h2>
                <div className="space-y-8">
                    {portfolioData.experience.slice(0, 1).map((job) => (
                         <div key={job.company} className={`relative pl-8 border-l-2 border-stone-700 group transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                             <div className="absolute w-4 h-4 bg-emerald-500 rounded-full -left-2 top-1 border-2 border-stone-900 group-hover:bg-emerald-400 transition-colors"></div>
                            <p className="text-sm font-semibold text-emerald-400 mb-1">{job.period}</p>
                            <h3 className="text-2xl font-bold text-white">{job.role}</h3>
                            <h4 className="text-lg font-medium text-stone-300 mb-3">{job.company}</h4>
                            <p className="text-stone-400 mb-4">{job.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {job.skills.map(skill => (
                                    <span key={skill} className="bg-stone-800 text-stone-300 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <a href="/experienced" onClick={(e) => handleNavClick(e, '/experienced')} className="inline-block bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                        View Full Experience
                    </a>
                </div>
            </section>
            
            {/* --- Projects Preview --- */}
            <section className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioData.projects.slice(0, 3).map((project) => (
                        <div key={project.name} className="bg-stone-800 rounded-lg p-6 flex flex-col transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-emerald-500/20">
                            <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                            <p className="text-stone-400 flex-grow mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.stack.map(tech => (
                                    <span key={tech} className="bg-stone-700 text-stone-300 text-xs font-medium px-2.5 py-1 rounded-full">{tech}</span>
                                ))}
                            </div>
                            <div className="mt-auto pt-4 border-t border-stone-700 flex items-center space-x-4 text-sm">
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors">
                                    <GithubIcon />
                                    <span className="ml-2">Source Code</span>
                                </a>
                                {project.live && (
                                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors">
                                        <LinkIcon />
                                        <span className="ml-1">Live Demo</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <a href="/building" onClick={(e) => handleNavClick(e, '/building')} className="inline-block bg-stone-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-stone-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                        View All Projects
                    </a>
                </div>
            </section>
        </div>
    );
};


const ExperiencePage = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <h1 className={`text-4xl xl:text-5xl font-bold text-white mb-12 text-center transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                jimb<span className="text-emerald-400">.is</span> <span className="text-sky-400">experienced.</span>
            </h1>
            <div className="space-y-12">
                {portfolioData.experience.map((job, index) => (
                    <div 
                        key={job.company} 
                        className={`relative pl-8 border-l-2 border-stone-700 group transition-all duration-700 ease-out`}
                        style={{ transitionDelay: `${index * 150}ms` }}
                    >
                        <div className={`absolute w-4 h-4 bg-emerald-500 rounded-full -left-2 top-1 border-2 border-stone-900 group-hover:bg-emerald-400 transition-colors ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
                        <div className={`${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{transition: 'all 700ms ease-out', transitionDelay: `${index * 150 + 50}ms`}}>
                            <p className="text-sm font-semibold text-emerald-400 mb-1">{job.period}</p>
                            <h3 className="text-2xl font-bold text-white">{job.role}</h3>
                            <h4 className="text-lg font-medium text-stone-300 mb-3">{job.company}</h4>
                            <p className="text-stone-400 mb-4">{job.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {job.skills.map(skill => (
                                    <span key={skill} className="bg-stone-800 text-stone-300 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProjectsPage = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <h1 className={`text-4xl xl:text-5xl font-bold text-white mb-12 text-center transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                jimb<span className="text-emerald-400">.is</span> <span className="text-sky-400">building...</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioData.projects.map((project, index) => (
                    <div 
                        key={project.name} 
                        className={`bg-stone-800 rounded-lg p-6 flex flex-col transform hover:-translate-y-2 transition-all duration-500 ease-out shadow-lg hover:shadow-emerald-500/20 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        style={{ transitionDelay: `${index * 150}ms` }}
                    >
                        <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                        <p className="text-stone-400 flex-grow mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.stack.map(tech => (
                                <span key={tech} className="bg-stone-700 text-stone-300 text-xs font-medium px-2.5 py-1 rounded-full">{tech}</span>
                            ))}
                        </div>
                        <div className="mt-auto pt-4 border-t border-stone-700 flex items-center space-x-4 text-sm">
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors">
                                <GithubIcon />
                                <span className="ml-2">Source Code</span>
                            </a>
                            {project.live && (
                                <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors">
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
};

const NotFoundPage = () => (
    <div className="text-center p-8">
        <h1 className="text-5xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-stone-400">Page Not Found</p>
    </div>
);

// --- LAYOUT COMPONENTS ---

const Header = ({ currentPage, navigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClasses = (path, isMobile = false) => {
        const activeClass = 'bg-stone-800 text-white';
        const inactiveClass = 'text-stone-300 hover:bg-stone-700 hover:text-white';
        const mobileClasses = 'block px-3 py-2 rounded-md text-base font-medium';
        const desktopClasses = 'px-3 py-2 rounded-md text-sm font-medium';
        
        return `${isMobile ? mobileClasses : desktopClasses} transition-colors ${currentPage === path ? activeClass : inactiveClass}`;
    };

    const handleNavClick = (e, path) => {
        e.preventDefault();
        navigate(path);
        setIsMenuOpen(false); // Close menu on navigation
    };

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
        <header className="bg-stone-900/50 backdrop-blur-sm sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <a href="/" onClick={(e) => handleNavClick(e, '/')} className="text-white font-bold text-xl tracking-tight">
                           jimb<span className="text-emerald-400">.is</span>
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a href="/" onClick={(e) => handleNavClick(e, '/')} className={navLinkClasses('/')}><span className="text-stone-500 mr-1">...</span>me</a>
                            <a href="/experienced" onClick={(e) => handleNavClick(e, '/experienced')} className={navLinkClasses('/experienced')}><span className="text-stone-500 mr-1">...</span>experienced</a>
                            <a href="/building" onClick={(e) => handleNavClick(e, '/building')} className={navLinkClasses('/building')}><span className="text-stone-500 mr-1">...</span>building</a>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="bg-stone-800 inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-white hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <XIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="/" onClick={(e) => handleNavClick(e, '/')} className={navLinkClasses('/', true)}>Home</a>
                        <a href="/experienced" onClick={(e) => handleNavClick(e, '/experienced')} className={navLinkClasses('/experienced', true)}>Experience</a>
                        <a href="/building" onClick={(e) => handleNavClick(e, '/building')} className={navLinkClasses('/building', true)}>Projects</a>
                    </div>
                </div>
            )}
        </header>
    );
};

const Footer = () => (
    <footer className="bg-stone-900/50 mt-16 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-stone-400 text-sm">
            <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
        </div>
    </footer>
);

// --- MAIN APP COMPONENT ---

export default function App() {
    const getInitialPage = () => {
        const path = window.location.pathname;
        const validPaths = ['/', '/experienced', '/building'];
        return validPaths.includes(path) ? path : '/';
    };

    const [currentPage, setCurrentPage] = useState(getInitialPage());

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPage(getInitialPage());
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Update document title based on the current page for the "living tab" effect
        switch (currentPage) {
            case '/':
                document.title = "jimb.is a Software Engineer";
                break;
            case '/experienced':
                document.title = "jimb.is experienced";
                break;
            case '/building':
                document.title = "jimb.is building";
                break;
            default:
                document.title = "jimb.is";
        }
    }, [currentPage]);

    const navigate = (path) => {
        if (window.location.pathname !== path) {
            try {
                window.history.pushState({ path }, '', path);
            } catch (error) {
                console.warn("Could not push state to history:", error);
            }
        }
        setCurrentPage(path);
    };

    const renderPage = () => {
        switch (currentPage) {
            case '/':
                return <HomePage navigate={navigate} />;
            case '/experienced':
                return <ExperiencePage />;
            case '/building':
                return <ProjectsPage />;
            default:
                return <NotFoundPage />;
        }
    };

    return (
        <div className="min-h-screen font-sans text-gray-100 flex flex-col bg-stone-900 [background-image:radial-gradient(theme(colors.stone.800)_1px,transparent_1px)] [background-size:16px_16px]">
            {/* Decorative Sidebars for large screens */}
            <div className="hidden lg:block fixed bottom-0 left-12 w-px h-48 bg-stone-700">
                <div className="absolute left-1/2 -translate-x-1/2 -top-40 flex flex-col items-center space-y-6">
                     <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-transform hover:scale-110"><GithubIcon /></a>
                    <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-transform hover:scale-110"><LinkedinIcon /></a>
                    <a href={portfolioData.resumeUrl} download title="Download Resume" className="text-stone-400 hover:text-white transition-transform hover:scale-110"><DownloadIcon /></a>
                </div>
            </div>
            <div className="hidden lg:block fixed bottom-0 right-12 w-px h-48 bg-stone-700">
                 <a href={`mailto:${portfolioData.email}`} className="absolute left-1/2 -translate-x-1/2 -top-24 text-stone-400 hover:text-white [writing-mode:vertical-lr] tracking-widest text-sm transition-colors">
                    {portfolioData.email}
                </a>
            </div>

            <Header currentPage={currentPage} navigate={navigate} />
            <main className="flex-grow w-full py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {renderPage()}
                </div>
            </main>
            <Footer />
        </div>
    );
}

