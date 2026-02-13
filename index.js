const projects = [
  {
    title: "Portfolio Website",
    tech: ["HTML", "CSS", "JS"],
    description: "A responsive portfolio website showcasing my projects and skills.",
    link: "#",
  },
  {
    title: "To-Do App",
    tech: ["JavaScript"],
    description: "A simple yet functional to-do list application with local storage.",
    link: "#",
  },
  {
    title: "Weather App",
    tech: ["API", "JS"],
    description: "An application that displays current weather information using a public API.",
    link: "#",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // Grab existing HTML elements by ID
  const techSelect = document.getElementById("techSelect");
  const filterBtn = document.getElementById("filterBtn");
  const clearBtn = document.getElementById("clearBtn");
  const list = document.getElementById("projects-list");

  // If these are null, the HTML block above isn't in your Projects section yet
  if (!techSelect || !filterBtn || !clearBtn || !list) {
    console.warn("Projects UI not found. Add the #projects-ui HTML block to your Projects section.");
    return;
  }

  // Populate dropdown
  const techOptions = ["All", ...getUniqueTech(projects)];
  techSelect.innerHTML = techOptions
    .map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`)
    .join("");

  // Initial render
  renderProjects(list, projects);

  // Filter button
  filterBtn.addEventListener("click", () => {
    const selectedTech = techSelect.value;

    const filtered =
      selectedTech === "All"
        ? projects
        : projects.filter((p) =>
            p.tech.some((t) => normalize(t) === normalize(selectedTech))
          );

    renderProjects(list, filtered);
  });

  // Show all
  clearBtn.addEventListener("click", () => {
    techSelect.value = "All";
    renderProjects(list, projects);
  });
});

function renderProjects(listEl, items) {
  listEl.innerHTML = "";

  if (items.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No projects match that filter.";
    listEl.appendChild(li);
    return;
  }

  items.forEach((project) => {
    const li = document.createElement("li");
    li.style.marginBottom = "1.1em";

    // Title
    const titleLine = document.createElement("div");

    if (project.link && project.link !== "#") {
      const a = document.createElement("a");
      a.href = project.link;
      a.textContent = project.title;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.style.color = "inherit";
      a.style.textDecoration = "underline";
      titleLine.appendChild(a);
    } else {
      const strong = document.createElement("strong");
      strong.textContent = project.title;
      titleLine.appendChild(strong);
    }

    // Description
    const desc = document.createElement("div");
    desc.textContent = `Description: ${project.description || "No description available."}`;
    desc.style.marginTop = "0.35em";
    desc.style.opacity = "0.95";
    desc.style.fontSize = "1rem";

    // Tech
    const tech = document.createElement("div");
    tech.textContent = `Tech: ${project.tech.join(", ")}`;
    tech.style.marginTop = "0.25em";
    tech.style.opacity = "0.9";
    tech.style.fontSize = "1rem";

    li.appendChild(titleLine);
    if (project.description) li.appendChild(desc);
    li.appendChild(tech);

    listEl.appendChild(li);
  });
}

function getUniqueTech(items) {
  const set = new Set();
  items.forEach((p) => p.tech.forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function normalize(str) {
  return String(str).trim().toLowerCase();
}

// Only needed because we build <option> HTML strings.
function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}




