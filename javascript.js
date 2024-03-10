const darkModeToggle = document.querySelector('#dark-mode-toggle');
const instagram = document.querySelector('#instagram');
const linkedin = document.querySelector('#linkedin');
const github = document.querySelector('#github');
const myPhotoLightmode = document.querySelector('#my-photo-lightmode');
const myPhotoDarkmode = document.querySelector('#my-photo-darkmode');
const body = document.querySelector('body');
const quote = document.querySelector('#quote');
const name = document.getElementById("name");
const aboutMeBtn = document.getElementById("about-me-btn");
const skillsBtn = document.getElementById("skills-btn");
const languagesBtn = document.getElementById("languages-btn");
const clearBtn = document.getElementById("clear-btn");
var favicon = document.getElementById("favicon");
function updateTime() {
  var datetime = new Date().toLocaleTimeString();
  document.getElementById("time").textContent = datetime;
}


function fetchRandomQuote() {
  fetch('https://api.quotable.io/random?maxLength=50')
    .then((response) => response.json())
    .then((data) => {
      const formattedQuote = `"${data.content}"`;
      const formattedAuthor = `- ${data.author}`;
      const finalHtml = `${formattedQuote}<br><span class="author">${formattedAuthor}</span>`;
      quote.innerHTML = finalHtml;
    });
}

fetchRandomQuote();
quote.addEventListener("click", () => {
  fetchRandomQuote();
})
const colorChange = document.getElementById("my-photo-lightmode");

colorChange.addEventListener("click", () => {
  let hue = 0;
  let timerId;
  clearInterval(timerId);
  timerId = setInterval(() => {
    document.body.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    hue++;
  }, 1);
  setTimeout(() => {
    clearInterval(timerId);
    document.body.removeAttribute("style");
  }, 3000);
});
setInterval(updateTime, 1000);
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  darkModeToggle.querySelector('i').classList.toggle('fa-moon');
  darkModeToggle.querySelector('i').classList.toggle('fa-sun');

  if (body.classList.contains('dark-mode')) {
    myPhotoLightmode.style.display = 'none';
    myPhotoDarkmode.style.display = 'block';
    favicon.parentNode.removeChild(favicon);
    var link = document.createElement('link');
    link.rel = 'icon';
    link.href = 'assets/iconDark.png';
    link.type = 'image/x-icon';
    link.id = 'favicon';
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
    favicon = link;
  } else {
    myPhotoLightmode.style.display = 'block';
    myPhotoDarkmode.style.display = 'none';
    favicon.parentNode.removeChild(favicon);
    var link = document.createElement('link');
    link.rel = 'icon';
    link.href = 'assets/iconLight.png';
    link.type = 'image/x-icon';
    link.id = 'favicon';
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
    favicon = link;
  }
});

const API_ENDPOINT = "https://dev.to/api/articles?username=pratyushnirwan&per_page=5";

async function fetchBlogPosts() {
  const response = await fetch(API_ENDPOINT);
  const posts = await response.json();
  const blogPostsElement = document.getElementById("blog-posts");
  const slider = document.createElement("div")
  const blogPostSlider = document.createElement("div")
  blogPostSlider.id = "blog-post-slider";
  slider.classList.add("slider-container");
  for (let post of posts) {
    const blogPostElement = document.createElement("a");
    const blogPostCard = document.createElement("div");
    blogPostCard.classList.add("blog-post")
    blogPostElement.href = post.url;
    blogPostElement.target = "_blank";

    const coverImageElement = document.createElement("img");
    coverImageElement.src = post.cover_image;

    const titleElement = document.createElement("h2");
    titleElement.textContent = post.title;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = post.description;

    blogPostsElement.appendChild(slider);
    slider.appendChild(blogPostSlider);
    blogPostSlider.appendChild(blogPostElement)
    blogPostElement.appendChild(blogPostCard);
    blogPostCard.appendChild(coverImageElement);
    blogPostCard.appendChild(titleElement);
    blogPostCard.appendChild(descriptionElement);
  }
}
function updateBlogs() {
  const blogPostsElement = document.getElementById("blog-posts");
  while (blogPostsElement.hasChildNodes()) {
    blogPostsElement.removeChild(blogPostsElement.firstChild)
  }
  fetchBlogPosts();
  console.log("blogs updates")
}
fetchBlogPosts();
setInterval(updateBlogs, 5 * 60 * 1000);

function typerWriter(id) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ~`@#$%^&*_+-=<>!{}[]()";
  const element = document.getElementById(id);
  const text = element.getAttribute("data-value");
  let iterations = 0;
  const letterInter = setInterval(() => {
    element.innerHTML = text.split("").map((letter, index) => {
      if (index < iterations) {
        return text[index];
      }
      return letters[Math.floor(Math.random() * letters.length)];
    }).join("");
    if (iterations >= text.length) clearInterval(letterInter);
    iterations += 1 / 3;
  }, 30);
}

window.onload = () => {
  typerWriter("name");
};
name.addEventListener("click", () => {
  typerWriter("name");
})

function typeThis(elementId, message, interval) {
  const cursor = document.createElement('span');
  const container = document.getElementById(elementId);
  container.textContent = ""
  container.appendChild(cursor);
  const lines = message.split('\n');
  let i = 0, j = 0;
  const typing = setInterval(() => {
    if (i < lines.length) {
      const line = lines[i];
      if (j <= line.length) {
        container.children[i].textContent = line.slice(0, j);
        j++;
      } else if (i < lines.length - 1) {
        const div = document.createElement('div');
        container.appendChild(div);
        const cursor = document.createElement('span');
        div.appendChild(cursor);
        i++;
        j = 0;
      } else {
        clearInterval(typing);
      }
    }
  }, interval);
}


aboutMeBtn.addEventListener("click", () => {
  aboutMeBtn.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  const result = `I'm Pratyush, a Btech student at Yeshwantrao Chavan College of Engineering in Nagpur. I love coding and have developed some exciting projects, including this website. Technology changed my life, and I'm happy to share my experiences and offer advice to those learning to code.`
  typeThis('prompt', "about-me", 30);
  setTimeout(function () {
    typeThis('result', result, 20);
  }, 700)
})


skillsBtn.addEventListener("click", () => {
  skillsBtn.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  const result = `
  Python
  ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▱▱▱▱
  JavaScript
  ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱
  C++/C
  ▰▰▰▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱ 
  Web Development
  ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▱▱▱ 
  Android Development
  ▰▰▰▰▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱`;
  typeThis('prompt', "skills", 30);
  setTimeout(function () {
    typeThis('result', result, 20);
  }, 700)
})

languagesBtn.addEventListener("click", () => {
  languagesBtn.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  const result = `
  English
  ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▱▱▱▱
  Hindi
  ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱ 
  Marathi
  ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▱▱▱`;
  typeThis('prompt', "languages", 30);
  setTimeout(function () {
    typeThis('result', result, 20);
  }, 700)
})

clearBtn.addEventListener("click", () => {
  const prompt = document.getElementById("prompt");
  const result = document.getElementById("result");

  prompt.textContent = "";
  result.textContent = "";
})
console.log(` 
█▀█ █▀█ ▄▀█ ▀█▀ █▄█ █░█ █▀ █░█
█▀▀ █▀▄ █▀█ ░█░ ░█░ █▄█ ▄█ █▀█
          ▀█▀ █▀▀ █▀█ █▀▄▀█ █ █▄░█ ▄▀█ █░░
          ░█░ ██▄ █▀▄ █░▀░█ █ █░▀█ █▀█ █▄▄ v2.08]
Welcome!!❤️`)

//created by Pratyush with ❤️