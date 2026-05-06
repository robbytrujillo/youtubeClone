const videos = [
  {
    title: "Video 1: Pemandangan Indah",
    youtubeId: "Ju-l5zr0EOI", // ✅ hanya ID-nya saja
    thumbnail: "https://img.youtube.com/vi/Ju-l5zr0EOI/mqdefault.jpg",
    category: "Nature",
  },
  {
    title: "Video 2: Suara Alam",
    youtubeId: "W5d53lLmlPA",
    thumbnail: "https://img.youtube.com/vi/W5d53lLmlPA/mqdefault.jpg",
    category: "Nature",
  },
  {
    title: "Video 3: Animasi Lucu",
    youtubeId: "8Dt33uYPj9Y",
    thumbnail: "https://img.youtube.com/vi/8Dt33uYPj9Y/mqdefault.jpg",
    category: "Entertainment",
  },
  {
    title: "Video 4: Ibnu Hajar Boarding School",
    youtubeId: "4XtEr72Ac6o",
    thumbnail: "https://img.youtube.com/vi/4XtEr72Ac6o/mqdefault.jpg",
    category: "Education",
  },
  {
    title: "Video 5: Dokumenter Agresi Militer",
    youtubeId: "ZakSYH0bZgY",
    thumbnail: "https://img.youtube.com/vi/ZakSYH0bZgY/mqdefault.jpg",
    category: "Documentary",
  },
  {
    title: "Video 6: Dokumenter Pendidikan",
    youtubeId: "Zw6DrK8jkAQ",
    thumbnail: "https://img.youtube.com/vi/Zw6DrK8jkAQ/mqdefault.jpg",
    category: "Documentary",
  },
  {
    title: "Video 7: Dokumenter Economy",
    youtubeId: "qHviWqxqEAY",
    thumbnail: "https://img.youtube.com/vi/qHviWqxqEAY/mqdefault.jpg",
    category: "Documentary",
  },
  {
    title: "Video 8: Dokumenter Guru Gembul",
    youtubeId: "rVw95MptLkU",
    thumbnail: "https://img.youtube.com/vi/rVw95MptLkU/mqdefault.jpg",
    category: "Documentary",
  },
];

const videoList = document.getElementById("video-list");
const modalVideo = document.getElementById("modalVideo");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const toggleDark = document.getElementById("toggleDark");

function playVideo(youtubeId) {
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
  modalVideo.innerHTML = `
      <div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" src="${embedUrl}" allowfullscreen></iframe>
      </div>
    `;
  $("#videoModal").modal("show");
}

function renderVideos() {
  const keyword = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  videoList.innerHTML = "";

  const filtered = videos.filter((video) => {
    return (
      video.title.toLowerCase().includes(keyword) &&
      (category === "" || video.category === category)
    );
  });

  if (filtered.length === 0) {
    videoList.innerHTML = `<div class="col-12"><p class="text-center">Video tidak ditemukan.</p></div>`;
    return;
  }

  filtered.forEach((video) => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
        <div class="card shadow-sm">
          <img src="${video.thumbnail}" class="card-img-top" alt="Video Thumbnail">
          <div class="card-body">
            <h5 class="card-title">${video.title}</h5>
            <button class="btn btn-primary btn-sm btn-block" onclick="playVideo('${video.youtubeId}')">Play</button>
          </div>
        </div>
      `;
    videoList.appendChild(col);
  });
}

searchInput.addEventListener("input", renderVideos);
categoryFilter.addEventListener("change", renderVideos);

toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleDark.textContent = document.body.classList.contains("dark-mode")
    ? "🌞 Light Mode"
    : "🌓 Dark Mode";
});

// Bersihkan modal saat ditutup
$("#videoModal").on("hidden.bs.modal", function () {
  modalVideo.innerHTML = "";
});

renderVideos();
