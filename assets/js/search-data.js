// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
  id: "nav-about",
    title: "about",
  section: "Navigation",
  handler: () => {
  window.location.href = "/";
},
},{id: "nav-blog",
    title: "blog",
  description: "",
  section: "Navigation",
  handler: () => {
  window.location.href = "/blog/";
},
},{id: "nav-repositories",
    title: "repositories",
  description: "",
  section: "Navigation",
  handler: () => {
  window.location.href = "/repositories/";
},
},{id: "nav-cv",
    title: "CV",
  description: "",
  section: "Navigation",
  handler: () => {
  window.location.href = "/cv/";
},
},{
  id: 'social-cv',
    title: 'CV',
  section: 'Socials',
  handler: () => {
  window.open("/assets/pdf/example_pdf.pdf", "_blank");
},
},{
  id: 'social-email',
    title: 'email',
  section: 'Socials',
  handler: () => {
  window.open("mailto:%74%6F%7A%7A%61.%67%65%6E%6E%61%72%6F%63%61%72%6D%69%6E%65@%67%6D%61%69%6C.%63%6F%6D", "_blank");
},
},{
  id: 'social-github',
    title: 'GitHub',
  section: 'Socials',
  handler: () => {
  window.open("https://github.com/gennarocarmine", "_blank");
},
},{
  id: 'social-linkedin',
    title: 'LinkedIn',
  section: 'Socials',
  handler: () => {
  window.open("https://www.linkedin.com/in/gennaro-carmine-tozza", "_blank");
},
},];