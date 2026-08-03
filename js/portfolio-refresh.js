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
          repo: 'Tracepoint',
          problem: 'Supports lifecycle-driven GovTech assistance workflows where public citizen continuity and secured staff handling both matter.',
          audience: 'Citizens using public account-less workflows and staff using secured role-based workflows.',
          value: 'Helps position assistance requests as auditable lifecycle entities instead of disconnected records.'
        },
        {
          name: 'GRAND',
          repo: 'grand',
          note: 'Original prototype that eventually evolved into TracePoint.',
          problem: 'Captures the earlier prototype direction for digital government assistance workflows.',
          audience: 'Government process improvement work that later informed the TracePoint direction.',
          value: 'Shows the project lineage behind the current TracePoint platform without presenting the prototype as the current system.'
        }
      ]
    },
    {
      title: 'Desktop Productivity',
      projects: [
        {
          name: 'TraceSync',
          repo: 'TraceSync',
          problem: 'Supports recurring desktop productivity work where repeatable tracking or synchronization tasks need a focused utility.',
          audience: 'Users who need a lightweight desktop tool instead of a full web platform.',
          value: 'Keeps operational support practical and close to the user workflow.'
        },
        {
          name: 'Excel Companion',
          repo: 'xl_tkinter',
          problem: 'Supports spreadsheet-based work that benefits from a small desktop companion tool.',
          audience: 'Users who rely on Excel and desktop workflows for recurring operational tasks.',
          value: 'Improves spreadsheet workflow support while preserving familiar tools.'
        }
      ]
    },
    {
      title: 'Accounting Automation',
      projects: [
        {
          name: 'Accounting Payroll/reporting automation',
          repo: 'acctgFiles',
          problem: 'Supports accounting payroll or reporting work where repetitive file preparation can be automated.',
          audience: 'Users handling recurring accounting, payroll, or reporting files.',
          value: 'Applies accounting-aware software practice to reduce repetitive preparation work and support consistent outputs.'
        }
      ]
    }
  ];

  function normalize(value) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function repositoryUrl(project) {
    return `https://github.com/${githubUser}/${project.repo}`;
  }

  function apiUrl(project) {
    return `https://api.github.com/repos/${githubUser}/${project.repo}`;
  }

  function projectId(project) {
    return normalize(`${project.name}-${project.repo}`);
  }

  function unavailableText(value, fallback) {
    return value || fallback;
  }

  function technologyList(metadata) {
    if (!metadata) {
      return [];
    }

    const languageNames = Object.keys(metadata.languages || {});
    const topicNames = metadata.repo && metadata.repo.topics ? metadata.repo.topics : [];
    return Array.from(new Set([...languageNames, ...topicNames])).filter(Boolean);
  }

  function projectFromMetadata(project, metadata) {
    const repo = metadata && metadata.repo ? metadata.repo : null;
    return {
      ...project,
      description: repo ? unavailableText(repo.description, 'No repository description provided.') : 'Repository metadata is unavailable.',
      htmlUrl: repo && repo.html_url ? repo.html_url : repositoryUrl(project),
      homepage: repo && repo.homepage ? repo.homepage : '',
      technologies: technologyList(metadata)
    };
  }

  function renderProjects(metadataByRepo) {
    projectCatalog.innerHTML = categories.map((category) => `
      <section class="project-category" aria-labelledby="${normalize(category.title)}">
        <h3 id="${normalize(category.title)}">${category.title}</h3>
        <div class="row g-4">
          ${category.projects.map((project) => {
            const metadata = metadataByRepo[project.repo];
            const renderedProject = projectFromMetadata(project, metadata);
            const technologies = renderedProject.technologies.length ? renderedProject.technologies : ['Repository metadata unavailable'];
            return `
              <div class="col-md-6">
                <article class="project-card h-100" id="${projectId(project)}">
                  <p class="project-tag">${project.note || category.title}</p>
                  <h4>${renderedProject.name}</h4>
                  <p class="repo-description">${renderedProject.description}</p>
                  <dl class="project-answers">
                    <dt>Problem</dt><dd>${renderedProject.problem}</dd>
                    <dt>For</dt><dd>${renderedProject.audience}</dd>
                    <dt>Useful because</dt><dd>${renderedProject.value}</dd>
                  </dl>
                  <div class="tech-list" aria-label="Relevant technologies">${technologies.map((tech) => `<span>${tech}</span>`).join('')}</div>
                  <div class="project-links">
                    <a href="${renderedProject.htmlUrl}" target="_blank" rel="noopener noreferrer">Repository</a>
                    ${renderedProject.homepage ? `<a href="${renderedProject.homepage}" target="_blank" rel="noopener noreferrer">Live demo</a>` : ''}
                  </div>
                </article>
              </div>`;
          }).join('')}
        </div>
      </section>
    `).join('');
  }

  function fetchRepo(project) {
    return fetch(apiUrl(project), {
      headers: { Accept: 'application/vnd.github+json' }
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((repo) => {
        if (!repo) {
          return [project.repo, null];
        }

        return fetch(repo.languages_url, {
          headers: { Accept: 'application/vnd.github+json' }
        })
          .then((response) => (response.ok ? response.json() : {}))
          .catch(() => ({}))
          .then((languages) => [project.repo, { repo, languages }]);
      })
      .catch(() => [project.repo, null]);
  }

  function allProjects() {
    return categories.flatMap((category) => category.projects);
  }

  renderProjects({});

  Promise.all(allProjects().map(fetchRepo))
    .then((entries) => renderProjects(Object.fromEntries(entries)))
    .catch(() => renderProjects({}));

})();
