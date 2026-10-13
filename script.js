const el = (selector) => document.querySelector(selector);
const make = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function link(label, href, secondary = false, download = false) {
  const node = make("a", `button${secondary ? " secondary" : ""}`, label);
  node.href = href;
  if (href.startsWith("http")) {
    node.target = "_blank";
    node.rel = "noreferrer";
  }
  if (download) node.download = "Vihal-J-Rotti-Resume.pdf";
  return node;
}

function render(data) {
  el("#hero-eyebrow").textContent = data.hero.eyebrow;
  el("#hero-title").textContent = data.hero.title;
  el("#hero-lede").textContent = data.hero.lede;
  el("#hero-meta").textContent = `${data.person.location} · ${data.person.citizenship}`;
  el("#headshot").src = data.person.headshot;
  el("#headshot").alt = data.person.headshotAlt;

  const actions = el("#hero-actions");
  actions.append(link("View my work ↓", "#projects"));
  actions.append(link("Download résumé", data.person.resume, true, true));

  data.hero.proof.forEach((item) => {
    const li = make("li");
    li.append(make("strong", "", item.value), document.createTextNode(item.label));
    el("#proof-list").append(li);
  });

  data.about.forEach((paragraph) => el("#about-copy").append(make("p", "", paragraph)));

  data.experience.forEach((role) => {
    const article = make("article", "role reveal");
    const meta = make("div", "role-meta");
    meta.append(make("strong", "", role.company), document.createTextNode(role.dates), make("br"), document.createTextNode(role.location));
    const body = make("div", "role-content");
    body.append(make("h3", "", role.role));
    const ul = make("ul");
    role.bullets.forEach((bullet) => ul.append(make("li", "", bullet)));
    body.append(ul);
    article.append(meta, body);
    el("#experience-list").append(article);
  });

  data.projects.forEach((project, index) => {
    const article = make("article", "project-card reveal");
    article.append(make("span", "project-number", `0${index + 1}`), make("h3", "", project.title), make("p", "", `${project.type} · ${project.date}`));
    const dl = make("dl");
    [["Problem", project.problem], ["Action", project.action], ["Result", project.result]].forEach(([term, description]) => {
      dl.append(make("dt", "", term), make("dd", "", description));
    });
    const tags = make("div", "project-tags");
    project.tags.forEach((tag) => tags.append(make("span", "", tag)));
    article.append(dl, tags);
    el("#projects-list").append(article);
  });

  data.skills.forEach((group) => {
    const article = make("article", "skill-group reveal");
    article.append(make("h3", "", group.group));
    const ul = make("ul");
    group.items.forEach((item) => ul.append(make("li", "", item)));
    article.append(ul);
    el("#skills-list").append(article);
  });

  data.education.forEach((item) => {
    const article = make("article", "education-card reveal");
    article.append(make("h3", "", item.school), make("p", "", item.degree), make("p", "", `${item.date} · ${item.location}`));
    el("#education-list").append(article);
  });
  data.certifications.forEach((item) => el("#certifications-list").append(make("span", "", item)));

  data.recommendations.forEach((item) => {
    const block = make("blockquote", "recommendation-placeholder reveal");
    block.append(make("p", "", `“${item.quote}”`), make("cite", "", item.author));
    el("#recommendations-list").append(block);
  });

  el("#contact-copy").textContent = data.contact.copy;
  const contacts = el("#contact-links");
  contacts.append(link("Email me", `mailto:${data.person.email}`));
  contacts.append(link("LinkedIn", data.person.linkedin, true));
  contacts.append(link("GitHub", data.person.github, true));
  contacts.append(link("Résumé", data.person.resume, true, true));
  el("#year").textContent = new Date().getFullYear();

  el("#structured-data").textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.person.name,
    email: data.person.email,
    url: data.person.linkedin,
    sameAs: [data.person.linkedin, data.person.github],
    alumniOf: data.education.map((item) => item.school),
    knowsAbout: data.skills.flatMap((group) => group.items)
  });
}

function activateInteractions() {
  const button = el(".menu-toggle");
  const nav = el("#site-nav");
  button.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", () => {
    nav.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
}

Promise.resolve(window.PORTFOLIO_CONTENT).then((data) => {
  render(data);
  activateInteractions();
}).catch((error) => {
  console.error(error);
  document.body.classList.add("content-error");
});
