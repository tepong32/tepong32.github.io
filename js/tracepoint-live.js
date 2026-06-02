(function () {
  const repoConfig = {
    owner: 'tepong32',
    repo: 'tracepoint',
    branch: 'main'
  };

  const apiBase = `https://api.github.com/repos/${repoConfig.owner}/${repoConfig.repo}`;
  const repoUrl = `https://github.com/${repoConfig.owner}/${repoConfig.repo}`;
  const fallbackPrs = [
    {
      number: 'local',
      title: 'TracePoint activity sync is ready for public repository data',
      state: 'warning',
      html_url: repoUrl,
      updated_at: new Date().toISOString(),
      body: 'If GitHub rate limits the visitor or the repository is private, this board keeps the project story intact while pointing visitors to the source repository.',
      user: { login: repoConfig.owner }
    }
  ];
  const fallbackCommits = [
    {
      html_url: repoUrl,
      sha: 'pending',
      commit: {
        message: 'Waiting for public GitHub commit activity',
        author: {
          name: repoConfig.owner,
          date: new Date().toISOString()
        }
      }
    }
  ];

  const elements = {
    healthTitle: document.getElementById('repo-health-title'),
    healthCopy: document.getElementById('repo-health-copy'),
    branch: document.getElementById('repo-branch'),
    lastTouch: document.getElementById('repo-last-touch'),
    description: document.getElementById('repo-description'),
    visibility: document.getElementById('repo-visibility'),
    stars: document.getElementById('repo-stars'),
    forks: document.getElementById('repo-forks'),
    openIssues: document.getElementById('repo-open-issues'),
    pushed: document.getElementById('repo-pushed'),
    terminalOne: document.getElementById('terminal-line-one'),
    terminalTwo: document.getElementById('terminal-line-two'),
    prFeed: document.getElementById('pull-request-feed'),
    commitStream: document.getElementById('commit-stream'),
    refresh: document.getElementById('repo-refresh')
  };

  const formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatDate(value) {
    if (!value) return 'Not available';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Not available';
    return formatter.format(date);
  }

  function summarize(text) {
    if (!text) return 'No public PR body was provided, but the activity record still shows recent project movement.';
    const cleaned = text
      .replace(/```[\s\S]*?```/g, '')
      .replace(/[#*_>`~-]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 220);

    return escapeHtml(cleaned || 'No public PR body was provided, but the activity record still shows recent project movement.');
  }

  function statusLabel(pr) {
    if (pr.merged_at) return 'merged';
    if (pr.state === 'open') return 'open';
    if (pr.state === 'warning') return 'sync note';
    return 'closed';
  }

  function renderRepo(repo) {
    const pushedDate = formatDate(repo.pushed_at);
    elements.healthTitle.textContent = 'TracePoint repository is actively inspectable';
    elements.healthCopy.textContent = `Latest public repository touch detected on ${pushedDate}. Visitors can verify ongoing implementation from the source activity.`;
    elements.branch.textContent = repo.default_branch || repoConfig.branch;
    elements.lastTouch.textContent = pushedDate;
    elements.description.textContent = repo.description || 'TracePoint is a lifecycle-driven GovTech assistance platform under active development.';
    elements.visibility.textContent = repo.private ? 'Private repo' : 'Public repo';
    elements.stars.textContent = repo.stargazers_count ?? '0';
    elements.forks.textContent = repo.forks_count ?? '0';
    elements.openIssues.textContent = repo.open_issues_count ?? '0';
    elements.pushed.textContent = pushedDate;
    elements.terminalOne.textContent = `repo: ${repo.full_name || `${repoConfig.owner}/${repoConfig.repo}`} · branch: ${repo.default_branch || repoConfig.branch}`;
    elements.terminalTwo.textContent = `last-push: ${pushedDate} · visibility: ${repo.private ? 'private' : 'public'}`;
  }

  function renderPrs(prs) {
    elements.prFeed.innerHTML = prs.map((pr) => `
      <article class="repo-feed-item">
        <div class="feed-item-topline">
          <span class="pr-state pr-state-${statusLabel(pr).replace(' ', '-')}">${statusLabel(pr)}</span>
          <time datetime="${escapeHtml(pr.updated_at || '')}">${formatDate(pr.updated_at)}</time>
        </div>
        <h3><a href="${escapeHtml(pr.html_url || repoUrl)}" target="_blank" rel="noopener noreferrer">#${escapeHtml(pr.number)} ${escapeHtml(pr.title)}</a></h3>
        <p>${summarize(pr.body)}</p>
        <span class="feed-author"><i class="bi bi-person-circle" aria-hidden="true"></i> touched by ${escapeHtml(pr.user?.login || repoConfig.owner)}</span>
      </article>
    `).join('');
  }

  function renderCommits(commits) {
    elements.commitStream.innerHTML = commits.map((commit) => {
      const message = commit.commit?.message?.split('\n')[0] || 'Implementation update';
      const author = commit.commit?.author?.name || repoConfig.owner;
      const date = commit.commit?.author?.date || '';
      const sha = commit.sha ? commit.sha.slice(0, 7) : 'pending';
      return `
        <a class="commit-item" href="${escapeHtml(commit.html_url || repoUrl)}" target="_blank" rel="noopener noreferrer">
          <span class="commit-node" aria-hidden="true"></span>
          <span class="commit-copy">
            <strong>${escapeHtml(message)}</strong>
            <small>${escapeHtml(sha)} · ${escapeHtml(author)} · ${formatDate(date)}</small>
          </span>
        </a>
      `;
    }).join('');
  }

  function renderFallback(error) {
    elements.healthTitle.textContent = 'GitHub sync fallback is active';
    elements.healthCopy.textContent = 'The live board is ready, but public GitHub data could not be loaded right now. This can happen because of rate limits, a private repository, or a renamed repo.';
    elements.lastTouch.textContent = 'Sync unavailable';
    elements.pushed.textContent = 'Unavailable';
    elements.terminalOne.textContent = 'sync: fallback-mode · reason: public-api-unavailable';
    elements.terminalTwo.textContent = `next-step: confirm repo path ${repoConfig.owner}/${repoConfig.repo}`;
    renderPrs(fallbackPrs);
    renderCommits(fallbackCommits);
    console.warn('TracePoint GitHub sync unavailable:', error);
  }

  async function fetchJson(url) {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json'
      }
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async function loadRepoBoard() {
    elements.refresh?.setAttribute('disabled', 'disabled');
    elements.refresh?.classList.add('is-loading');

    try {
      const [repo, prs, commits] = await Promise.all([
        fetchJson(apiBase),
        fetchJson(`${apiBase}/pulls?state=all&sort=updated&direction=desc&per_page=6`),
        fetchJson(`${apiBase}/commits?per_page=7`)
      ]);

      renderRepo(repo);
      renderPrs(prs.length ? prs : fallbackPrs);
      renderCommits(commits.length ? commits : fallbackCommits);
    } catch (error) {
      renderFallback(error);
    } finally {
      elements.refresh?.removeAttribute('disabled');
      elements.refresh?.classList.remove('is-loading');
    }
  }

  document.querySelectorAll('[data-repo-link]').forEach((link) => {
    link.href = repoUrl;
  });

  elements.refresh?.addEventListener('click', loadRepoBoard);
  loadRepoBoard();
})();
