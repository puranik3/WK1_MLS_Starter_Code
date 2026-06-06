const posts = [
  {
    id: 1,
    author: "Ananya Gupta",
    role: "Engineer",
    content: "Refactored a legacy component today. Small wins matter.",
    likes: 18,
    comments: 3,
    timestamp: "2024-01-12"
  },
  {
    id: 2,
    author: "David Miller",
    role: "Designer",
    content: "Design systems save more time than they take to build.",
    likes: 42,
    comments: 7,
    timestamp: "2024-01-10"
  },
  {
    id: 3,
    author: "Sophia Lee",
    role: "Manager",
    content: "Strong communication is the most underrated leadership skill.",
    likes: 30,
    comments: 5,
    timestamp: "2024-01-09"
  }
];

const feed = document.getElementById("feed");
const filterRole = document.getElementById("filterRole");
const sortPosts = document.getElementById("sortPosts");

// Load likes from localStorage if available
function loadLikes() {
  const savedLikes = localStorage.getItem("postLikes");
  if (savedLikes) {
    const likes = JSON.parse(savedLikes);
    posts.forEach(post => {
      if (likes[post.id] !== undefined) post.likes = likes[post.id];
    });
  }
}

// Save likes to localStorage
function saveLikes() {
  const likes = {};
  posts.forEach(post => {
    likes[post.id] = post.likes;
  });
  localStorage.setItem("postLikes", JSON.stringify(likes));
}

// Track user actions
function getUserActions() {
  const actions = localStorage.getItem("userPostActions");
  return actions ? JSON.parse(actions) : {};
}
function setUserActions(actions) {
  localStorage.setItem("userPostActions", JSON.stringify(actions));
}

// Render feed
function renderFeed(list) {
  const userActions = getUserActions();
  feed.innerHTML = "";

  list.forEach(post => {
    const liked = userActions[post.id]?.liked;

    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <div class="post-header">
        <div>
          <div class="post-author">${post.author}</div>
          <div class="post-role">${post.role}</div>
        </div>
        <div>${post.timestamp}</div>
      </div>

      <p>${post.content}</p>

      <div class="post-actions">
        <button class="${liked ? 'liked' : ''}" data-id="${post.id}">👍 ${liked ? 'Unlike' : 'Like'} (${post.likes})</button>
        <button>💬 ${post.comments} Comments</button>
      </div>
    `;

    feed.appendChild(div);
  });
}

// Like button logic
feed.addEventListener("click", event => {
  const btn = event.target.closest('button[data-id]');
  if (!btn) return;

  const postId = Number(btn.getAttribute('data-id'));
  const userActions = getUserActions();
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  const currentlyLiked = !!userActions[postId]?.liked;

  if (currentlyLiked) {
    // Unlike
    post.likes = Math.max(0, post.likes - 1);
    userActions[postId] = { ...userActions[postId], liked: false };
  } else {
    // Like
    post.likes = post.likes + 1;
    userActions[postId] = { ...userActions[postId], liked: true };
  }

  // Clean up falsy liked entries to keep storage small
  if (userActions[postId] && userActions[postId].liked === false) {
    delete userActions[postId];
  }

  setUserActions(userActions);
  saveLikes();

  // Re-render current view to reflect changes
  applyFilterAndSort();
});

function applySorting(list, sortBy) {
  if (sortBy === "likes") {
    return [...list].sort((a, b) => b.likes - a.likes);
  } else if (sortBy === "recent") {
    return [...list].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
  return list;
}

// Apply both filter and sort together
function applyFilterAndSort() {
  const selectedRole = filterRole.value;
  const sortBy = sortPosts.value;

  // First filter
  let filteredPosts = posts;
  if (selectedRole && selectedRole !== "all") {
    filteredPosts = posts.filter(post => post.role === selectedRole);
  }

  // Then sort
  const finalPosts = applySorting(filteredPosts, sortBy);
  renderFeed(finalPosts);
}

filterRole.addEventListener("change", applyFilterAndSort);
sortPosts.addEventListener("change", applyFilterAndSort);

loadLikes();
applyFilterAndSort();
