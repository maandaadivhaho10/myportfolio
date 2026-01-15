// Function to get URL parameter
function getProjectId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Function to populate project details
function populateProjectDetails() {
    const projectId = getProjectId();
    const project = projectsData[projectId];

    if (!project) {
        // Handle case where project doesn't exist
        document.getElementById('project-title').textContent = 'Project Not Found';
        document.getElementById('project-short-desc').textContent = 'The requested project could not be found.';
        return;
    }

    // Populate hero section
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-short-desc').textContent = project.shortDesc;
    document.getElementById('time-taken').textContent = project.timeTaken;
    document.getElementById('team-size').textContent = project.teamSize;
    
    if (document.getElementById('project-hero-img')) {
        document.getElementById('project-hero-img').src = project.heroImage;
        document.getElementById('project-hero-img').alt = project.title;
    }
    
    // New fields for modern layout
    if (document.getElementById('project-category')) {
        document.getElementById('project-category').textContent = project.category || 'Project';
    }
    if (document.getElementById('project-tech')) {
        document.getElementById('project-tech').textContent = project.techStack[0] || 'Various';
    }

    // Populate detail sections
    document.getElementById('project-problem').textContent = project.problem;
    document.getElementById('project-solution').textContent = project.solution;
    document.getElementById('project-full-desc').textContent = project.fullDesc;

    // Populate tech stack
    const techStackContainer = document.getElementById('project-tech-stack');
    techStackContainer.innerHTML = '';
    project.techStack.forEach(tech => {
        const techBadge = document.createElement('span');
        techBadge.className = `tech-badge ${tech.toLowerCase().replace('.', '')}`;
        techBadge.textContent = tech;
        techStackContainer.appendChild(techBadge);
    });

    // Populate links
    document.getElementById('github-link').href = project.githubUrl;
    document.getElementById('live-link').href = project.liveUrl;

    // Hide live demo link if not available
    if (project.liveUrl === '#') {
        document.getElementById('live-link').style.display = 'none';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', populateProjectDetails);