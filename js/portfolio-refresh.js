(function () {
  const yearTarget = document.getElementById('year');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  const navLinks = document.querySelectorAll('#mainNav .nav-link');
  const navCollapse = document.getElementById('mainNav');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navCollapse).hide();
      }
    });
  });

  const projectCatalog = document.getElementById('project-catalog');
  if (!projectCatalog) {
    return;
  }

  const githubUser = 'tepong32';
  const categories = [
    {
      title: 'Government Process Improvement',
      projects: [
        {
          name: 'TracePoint',
          match: ['tracepoint', 'trace-point'],
          problem: 'Supports lifecycle-driven government assistance workflows that need clearer intake, continuity, and staff accountability.',
          audience: 'Public-facing citizens and secured role-based staff workflows.',
          value: 'Keeps requests visible as lifecycle entities while reinforcing auditability, recoverability, and practical service continuity.',
          technologies: ['Django', 'Python', 'Bootstrap']
        },
        {
          name: 'GRAND',
          note: 'Original prototype that eventually evolved into TracePoint.',
          match: ['grand'],
          problem: 'Explores earlier digital assistance workflow ideas for public service operations.',
          audience: 'Government teams evaluating structured assistance and routing workflows.',
          value: 'Preserves the prototype lineage behind the current TracePoint direction.',
          technologies: ['Django', 'Python', 'Bootstrap']
        }
      ]
    },
    {
      title: 'Desktop Productivity',
      projects: [
        {
          name: 'TraceSync',
          match: ['tracesync', 'trace-sync'],
          problem: 'Helps reduce repetitive desktop workflow steps around tracking and synchronization tasks.',
          audience: 'Users who need practical desktop support for recurring operational work.',
          value: 'Turns repeatable work into a more consistent utility-driven process.',
          technologies: ['Python', 'Tkinter']
        },
        {
          name: 'Excel Companion',
          match: ['excel-companion', 'excelcompanion', 'excel_companion'],
          problem: 'Assists with recurring spreadsheet preparation and data handling work.',
          audience: 'Teams that rely on Excel for operational reports and working documents.',
          value: 'Improves consistency in spreadsheet-based workflows without forcing a larger platform migration.',
          technologies: ['Python', 'Excel', 'OpenPyXL']
        }
      ]
    },
    {
      title: 'Accounting Automation',
      projects: [
        {
          name: 'Accounting repository',
          match: ['accounting'],
          problem: 'Supports accounting-related automation and operational record workflows.',
          audience: 'Users working with accounting files, reports, or repeatable back-office tasks.',
          value: 'Applies an accuracy-focused accounting background to practical software automation.',
          technologies: ['Python', 'Excel', 'Data Processing']
        },
        {
          name: 'Payroll/reporting automation',
          match: ['payroll', 'reporting', 'report'],
          problem: 'Targets repetitive payroll or reporting preparation work.',
          audience: 'Teams handling recurring payroll or internal reporting outputs.',
          value: 'Reduces manual consolidation effort while keeping the presentation concise when repository details are unavailable.',
          technologies: ['Python', 'Excel', 'OpenPyXL']
        }
      ]
    }
  ];

  function normalize(value) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function findRepo(repos, project) {
    const matches = project.match.map(normalize);
    return repos.find((repo) => matches.includes(normalize(repo.name))) || repos.find((repo) => matches.some((match) => normalize(repo.name).includes(match)));
  }

  function repoDescription(repo) {
    if (!repo) {
      return 'Repository metadata is unavailable.';
    }
    return repo.description || 'No repository description provided.';
  }

  function repoLink(repo, project) {
    if (repo) {
      return repo.html_url;
    }
    return `https://github.com/${githubUser}?tab=repositories&q=${encodeURIComponent(project.name)}`;
  }

  function renderProjects(repos) {
    projectCatalog.innerHTML = categories.map((category) => `
      <section class="project-category" aria-labelledby="${normalize(category.title)}">
        <h3 id="${normalize(category.title)}">${category.title}</h3>
        <div class="row g-4">
          ${category.projects.map((project) => {
            const repo = findRepo(repos, project);
            const homepage = repo && repo.homepage ? repo.homepage : '';
            const language = repo && repo.language ? repo.language : '';
            const technologies = Array.from(new Set([...project.technologies, language].filter(Boolean)));
            return `
              <div class="col-md-6">
                <article class="project-card h-100">
                  <p class="project-tag">${project.note || category.title}</p>
                  <h4>${project.name}</h4>
                  <p class="repo-description">${repoDescription(repo)}</p>
                  <dl class="project-answers">
                    <dt>Problem</dt><dd>${project.problem}</dd>
                    <dt>For</dt><dd>${project.audience}</dd>
                    <dt>Useful because</dt><dd>${project.value}</dd>
                  </dl>
                  <div class="tech-list">${technologies.map((tech) => `<span>${tech}</span>`).join('')}</div>
                  <div class="project-links">
                    <a href="${repoLink(repo, project)}" target="_blank" rel="noopener noreferrer">Repository</a>
                    ${homepage ? `<a href="${homepage}" target="_blank" rel="noopener noreferrer">Live demo</a>` : ''}
                  </div>
                </article>
              </div>`;
          }).join('')}
        </div>
      </section>
    `).join('');
  }

  fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100&sort=updated`)
    .then((response) => (response.ok ? response.json() : []))
    .then(renderProjects)
    .catch(() => renderProjects([]));
})();
