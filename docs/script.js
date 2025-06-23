// Set the current year in the footer
document.getElementById('current-year').textContent = new Date().getFullYear();
/**
 * Function to create a content item card.
 * Dynamically creates either a standard item card (Plugins/Packs)
 * or a special tool item card based on sectionId.
 * @param {Object} item - The item data.
 * @param {string} sectionId - The ID of the section ('plugins-grid', 'packs-grid', 'tools-grid').
 * @returns {HTMLElement} The created card element.
 */
function createItemCard(item, sectionId) {
    if (sectionId === 'tools-grid') {
        return createToolItemCard(item);
    } else {
        return createStandardItemCard(item);
    }
}
/**
 * Creates a standard item card for Plugins and Packs.
 * @param {Object} item - The item data.
 * @returns {HTMLElement} The created card element.
 */
function createStandardItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    // Image Carousel
    const carousel = document.createElement('div');
    carousel.className = 'image-carousel';
    item.images.forEach((imgSrc, index) => {
        if(imgSrc.length == 0) return;
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `${item.name} image ${index + 1}`;
        img.className = `carousel-image ${index === 0 ? 'active' : ''}`;
        img.onerror = function() { this.onerror=null; this.src=`https://placehold.co/350x200/4a0080/FFFFFF?text=${item.name.replace(/\s/g, '+')}`; };
        carousel.appendChild(img);
    });
    if (item.images.length > 1) {
        const prevArrow = document.createElement('button');
        prevArrow.className = 'carousel-nav-arrow left';
        prevArrow.innerHTML = '&lt;';
        prevArrow.onclick = (e) => { e.stopPropagation(); navigateCarousel(carousel, -1); };
        carousel.appendChild(prevArrow);
        const nextArrow = document.createElement('button');
        nextArrow.className = 'carousel-nav-arrow right';
        nextArrow.innerHTML = '&gt;';
        nextArrow.onclick = (e) => { e.stopPropagation(); navigateCarousel(carousel, 1); };
        carousel.appendChild(nextArrow);
    }
    card.appendChild(carousel);
    // Price Tag
    if (item.price !== undefined && item.price !== null) {
        const priceTag = document.createElement('span');
        priceTag.className = `price-tag ${item.price === 0 ? 'free' : ''}`;
        priceTag.textContent = item.price === 0 ? 'FREE' : `${priceTag.currency||"€"}${item.price.toFixed(2)}`;
        if (item.priceColor && item.price !== 0) {
            priceTag.style.backgroundColor = item.priceColor;
        }
        card.appendChild(priceTag);
    }
    // Content Area
    const content = document.createElement('div');
    content.className = 'item-content';
    if(typeof item.name != "undefined") {
      const nameLink = document.createElement('h3');
      nameLink.textContent = item.name;
      if(typeof item.link != "undefined")
        nameLink.onclick = () => window.open(item.link, '_blank');
      content.appendChild(nameLink);
    }
    if(typeof item.description != "undefined") {
      const description = document.createElement('p');
      description.textContent = item.description;
      content.appendChild(description);
    }
    if(typeof item.link != "undefined") {
      const viewButton = document.createElement('a');
      viewButton.href = item.link;
      viewButton.target = '_blank';
      viewButton.rel = 'noopener noreferrer';
      viewButton.className = 'btn-primary';
      viewButton.textContent = 'View Resource';

      const linkIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      linkIcon.setAttribute("width", "24");
      linkIcon.setAttribute("height", "24");
      linkIcon.setAttribute("viewBox", "0 0 24 24");
      linkIcon.setAttribute("fill", "none");
      linkIcon.setAttribute("stroke", "white");
      linkIcon.setAttribute("stroke-width", "2");
      linkIcon.setAttribute("stroke-linecap", "round");
      linkIcon.setAttribute("stroke-linejoin", "round");
      linkIcon.classList.add("lucide", "lucide-link");
      linkIcon.innerHTML = '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07L9.4 6.56a2 2 0 0 0 0 2.83"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71a2 2 0 0 0 0-2.83"/>';
      viewButton.prepend(linkIcon);
      content.appendChild(viewButton);
    }
    if(content.innerHTML != "") {
      card.appendChild(content);
    }
    return card;
}
/**
 * Creates a specialized item card for Handy Tools.
 * @param {Object} item - The item data.
 * @returns {HTMLElement} The created card element.
 */
function createToolItemCard(item) {
    const card = document.createElement('div');
    card.className = 'tool-item-card';
    // Image Container (no carousel for tools)
    const imageContainer = document.createElement('div');
    imageContainer.className = 'tool-image-container';
    const img = document.createElement('img');
    if(typeof item.logo != "undefined") {
      img.src = item.logo; // Tools only have one image
      img.alt = `${item.name} image`;
      //img.onerror = function() { this.onerror=null; this.src=`https://placehold.co/120x120/4a0080/FFFFFF?text=${item.name.replace(/\s/g, '+')}`; };
      img.onerror = function() { this.onerror=null; this.src=`https://i.imgur.com/0zaH4wJ.png`; };
    }else{
      img.src = `https://i.imgur.com/0zaH4wJ.png`; // Tools only have one image
    }
    imageContainer.appendChild(img);
    card.appendChild(imageContainer);
    // Content Area
    const content = document.createElement('div');
    content.className = 'tool-content';
    const nameLink = document.createElement('h3');
    if(typeof item.style != "undefined") {
        nameLink.style.cssText = item.style;
    }
    if(typeof item.clazz != "undefined") {
        nameLink.classList.add(item.clazz);
    }
    //nameLink.style.width = "70%"
    //nameLink.style.minHeight = "33px"
    nameLink.style.fontSize = "20px"
    nameLink.textContent = item.name;
    nameLink.onclick = () => window.open(item.link, '_blank');
    content.appendChild(nameLink);
    /*
    // Custom "FREE" Price Tag
    const priceTag = document.createElement('span');
    priceTag.className = 'price-tag tool-free'; // Specific class for tool free tag
    priceTag.textContent = 'FREE';
    if (item.priceColor) { // Allow custom color for FREE tag on tools
        priceTag.style.backgroundColor = item.priceColor;
    } else {
        priceTag.style.backgroundColor = '#32CD32'; // Default lime green for tool FREE tag
    }
    card.appendChild(priceTag);
    */

    const description = document.createElement('p');
    description.textContent = item.description;
    content.appendChild(description);
    const viewButton = document.createElement('a');
    viewButton.href = item.link;
    viewButton.target = '_blank';
    viewButton.rel = 'noopener noreferrer';
    viewButton.className = 'btn-primary'; // Reuse primary button style
    viewButton.textContent = 'View Tool'; // Different text for tools
    const linkIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    linkIcon.setAttribute("width", "24");
    linkIcon.setAttribute("height", "24");
    linkIcon.setAttribute("viewBox", "0 0 24 24");
    linkIcon.setAttribute("fill", "none");
    linkIcon.setAttribute("stroke", "white");
    linkIcon.setAttribute("stroke-width", "2");
    linkIcon.setAttribute("stroke-linecap", "round");
    linkIcon.setAttribute("stroke-linejoin", "round");
    linkIcon.classList.add("lucide", "lucide-link");
    linkIcon.innerHTML = '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07L9.4 6.56a2 2 0 0 0 0 2.83"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71a2 2 0 0 0 0-2.83"/>';
    viewButton.prepend(linkIcon);
    content.appendChild(viewButton);
    card.appendChild(content);
    return card;
}
function loadChecking() {
 let href = window.location.href;
 if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) return;
 let link = atob("aHR0cHM6Ly9hbG9uc29hcGkuZGlzY2xvdWQuYXBwL2NoZWNraW5nP3NpdGU9PHNpdGU+JmtleT08a2V5Pg==")
  .replace(/<site>/g,"projects").replace(/<key>/g,"KEY-A");
 let counter = document.getElementById("online-counter");
 if(counter) {
   $.ajax({
     url: link,
     type: "GET", /* or type:"GET" or type:"PUT" */
     dataType: "json",
     data: {
     },
     success: function (result) {
        //console.log(`Total fails: ${counter.dataset.failed}`)
        counter.dataset.failed = "0";
        counter.style.display = "flex";
        if(isNaN(result)) {
         counter.textContent = `🟡 You shouldn't be reading this. Report it on https://alonsoaliaga.com/discord`;
         counter.style.backgroundColor = "yellow";
         counter.style.color = "black";
        }else{
         counter.textContent = `🟢 ${result} user${result==1?``:`s`} online checking our cool projects!`;
         //counter.textContent = randomMessage().replace(/{ONLINE}/g,result);
         counter.style.backgroundColor = "green";
        }
     },
     error: function (e) {
      //console.log(`Total fails: ${counter.dataset.failed}`)
      if(counter.style.display != "none") {
        let currentFails = +counter.dataset.failed;
        if(currentFails >= 1){
          counter.style.display = "none"
        }else{
          counter.textContent = `🔴 Check your internet connection!`;
          counter.style.backgroundColor = "#7c0000";
          counter.dataset.failed = `${currentFails + 1}`
        }
      }
     }
   });
 }
}
let times = 0;
function loadCounter() {
 let href = window.location.href;
 if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) return;
 let link = atob("aHR0cHM6Ly9hbG9uc29hcGkuZGlzY2xvdWQuYXBwL2NvdW50ZXI/c2l0ZT08c2l0ZT4ma2V5PTxrZXk+")
  .replace(/<site>/g,"projects").replace(/<key>/g,"KEY-A");
 let counter = document.getElementById("visitor-counter");
 if(counter) {
   $.ajax({
     url: link,
     type: "GET", /* or type:"GET" or type:"PUT" */
     dataType: "json",
     data: {
     },
     success: function (result) {
       if(isNaN(result))
         document.getElementById("counter-amount").innerHTML = "Click to return!";
       else document.getElementById("counter-amount").innerHTML = `Visits: ${result}`;
     },
     error: function (e) {
       times++;
       document.getElementById("counter-amount").innerHTML = "Click to return!";
       if(times <= 1) {
        setTimeout(()=>{
          loadCounter();
        },1000*10);
       }
     }
   });
 }
}
window.addEventListener('DOMContentLoaded',()=>{
    loadCounter();
    setTimeout(()=>{
      loadChecking();
      setInterval(()=>{
        loadChecking();
      },10000)
    },2500)
});
/**
 * Navigates the image carousel by changing active class.
 * @param {HTMLElement} carouselElement - The carousel div.
 * @param {number} direction - -1 for previous, 1 for next.
 */
function navigateCarousel(carouselElement, direction) {
    const images = carouselElement.querySelectorAll('.carousel-image');
    let activeImage = carouselElement.querySelector('.carousel-image.active');
    let currentIndex = Array.from(images).indexOf(activeImage);
    // Remove active class from current image
    if (activeImage) {
        activeImage.classList.remove('active');
    }
    let nextIndex = currentIndex + direction;
    if (nextIndex >= images.length) {
        nextIndex = 0;
    } else if (nextIndex < 0) {
        nextIndex = images.length - 1;
    }
    // Add active class to next image
    if (images[nextIndex]) {
        images[nextIndex].classList.add('active');
    }
}
// --- Data for Content Sections ---
const pluginsData = {
  alonsotags: {
    name: "AlonsoTags",
    description: "A highly customizable tag plugin for your network.",
    images: [
      "https://i.imgur.com/rYpPZop.png", //NEW FORMAT
      "https://i.gyazo.com/b42cd63c43df39a37aa2f723a50b01e5.png",
      "https://i.gyazo.com/5ecbb6efe5aa1f1030487da804c18393.png"
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","alonso-series"],
    image: "./assets/plugins/alonsotags_logo.png",
    link: "https://alonsoaliaga.com/AlonsoTags",
    github: "https://github.com/AlonsoAliaga/AlonsoTags"
  },
  alonsotagspro: {
    name: "AlonsoTagsPro",
    description: "A highly customizable tag plugin for your network.",
    images: [
      "https://i.imgur.com/561752U.png", //NEW FORMAT
      "https://i.gyazo.com/9eebc8b27b8181de53e457c4a1c08b27.png",
      "https://i.gyazo.com/5ecbb6efe5aa1f1030487da804c18393.png",
      "https://i.gyazo.com/3ef3e1f4432fe0bd5420afaca6ea6bf9.png",
      "https://i.gyazo.com/c691cdaeb91b687757f38cba5306bd86.gif",
      "https://i.imgur.com/y6DwM1w.png",
      "https://i.imgur.com/1LjMyhI.png"
    ],
    price: 9.99,
    priceColor: "#bd0606", 
    badge: { text: "PREMIUM", color: "amber" },
    tags: ["premium","alonso-series"],
    image: "./assets/plugins/alonsotagspro_logo.png",
    link: "https://alonsoaliaga.com/AlonsoTagsPro",
    github: "https://github.com/AlonsoAliaga/AlonsoTags"
  },
  alonsoplus: {
    name: "AlonsoPlus",
    description: "Create a ranking system for your players.",
    images: [
      "https://i.imgur.com/7WRQPHE.png", //NEW FORMAT
      "https://i.gyazo.com/7e6cf7910f37dd3a613e75d9bc9b31d6.png",
      "https://i.imgur.com/A7AZa7o.png",
      "https://i.imgur.com/59TsUyN.png",
      "https://i.imgur.com/jYtMNE3.png",
      "https://i.imgur.com/J3HyEq7.png", 
      "https://i.imgur.com/7isKqHN.gif", 
    ],
    price: 9.99,
    priceColor: "#06339c", 
    badge: { text: "PREMIUM", color: "amber" },
    tags: ["premium","alonso-series"],
    image: "./assets/plugins/alonsoplus_logo.png",
    link: "https://alonsoaliaga.com/AlonsoPlus",
    github: "https://github.com/AlonsoAliaga/AlonsoPlus"
  },
  alonsolevels: {
    name: "AlonsoLevels",
    description: "A highly customizable level system for your network that actually works.",
    images: [
      "https://i.imgur.com/ZZlHK7n.png",
      "https://i.gyazo.com/faff4e76933887277fe694fe28f81fd1.png",
      "https://i.gyazo.com/56f21d413ef63b78e123bcdb195b8232.png",
      "https://i.gyazo.com/8157ca77f761e554058cc422ad0256c9.png",
      "https://i.gyazo.com/228d4f5301b0a7af74123e9a72731662.png",
      "https://i.badlion.net/pEs8amQbMy5Ph2EZrX3mJB.png",
      "https://i.gyazo.com/43e40751d5dc4ab0914efe2507f939ee.png"
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","alonso-series"],
    image: "./assets/plugins/alonsolevels_logo.png",
    link: "https://alonsoaliaga.com/AlonsoLevels",
    github: "https://github.com/AlonsoAliaga/AlonsoLevels"
  },
  alonsolevelspro: {
    name: "AlonsoLevelsPro",
    description: "A highly customizable level system for your network that actually works.",
    images: [
      "https://i.imgur.com/ZUnVTf4.png",
      "https://i.gyazo.com/02f5df6c089b82fb3988c24ade0b1714.png",
      "https://i.gyazo.com/d38136f5e105e69119314bff003d24c3.png",
      "https://i.gyazo.com/a6c00814533ff7ccda8bd81f9ad53770.gif",
      "https://i.imgur.com/anrjdQR.gif",
      "https://i.gyazo.com/faff4e76933887277fe694fe28f81fd1.png",
      "https://i.gyazo.com/56f21d413ef63b78e123bcdb195b8232.png",
      "https://i.gyazo.com/8157ca77f761e554058cc422ad0256c9.png",
      "https://i.gyazo.com/228d4f5301b0a7af74123e9a72731662.png",
      "https://i.badlion.net/pEs8amQbMy5Ph2EZrX3mJB.png",
      "https://i.gyazo.com/43e40751d5dc4ab0914efe2507f939ee.png",
      ""
    ],
    price: 9.99,
    priceColor: "#e3c712", 
    badge: { text: "PREMIUM", color: "amber" },
    tags: ["premium","alonso-series"],
    image: "./assets/plugins/alonsolevelspro_logo.png",
    link: "https://alonsoaliaga.com/AlonsoLevelsPro",
    github: "https://github.com/AlonsoAliaga/AlonsoLevels"
  },
  alonsorunfromthebeast: {
    name: "AlonsoRunFromTheBeast",
    description: "Run, get to loot and kill the Beast!",
    icon: "paw-claws",
    images: [
      "https://i.imgur.com/0u1mwol.png",
      "https://i.imgur.com/9Cl4sob.gif",
      "https://i.imgur.com/ijwMVCc.png",
      "https://i.imgur.com/QrYwSG5.png",
      "https://i.imgur.com/Nxe9Pvb.png"
    ],
    price: 14.99,
    priceColor: "#4e097d", 
    badge: { text: "PREMIUM", color: "amber" },
    tags: ["premium","alonso-series"],
    image: "./assets/plugins/alonsorftb_logo.png",
    link: "https://alonsoaliaga.com/AlonsoRFTB",
    github: "https://github.com/AlonsoAliaga/AlonsoRFTB"
  },
  betterbackpacks: {
    name: "BetterBackpacks",
    description: "Backpacks with custom textures and unique features!",
    images: [
      "https://i.imgur.com/kk5ppIh.png",
      "https://i.gyazo.com/e108cc5a75a10f0894dd5e1f68e0eac0.png",
      "https://i.gyazo.com/92d959160eacb302b8c79d9c06cbcc36.png",
      "https://i.gyazo.com/ebe9e50f19f2a07af16771032e008209.gif",
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","better-series"],
    image: "./assets/plugins/betterbackpacks_logo.png",
    link: "https://alonsoaliaga.com/BetterBackpacks",
    github: "https://github.com/AlonsoAliaga/BetterBackpacks"
  },
  betterbackpackspro: {
    name: "BetterBackpacksPro",
    description: "Backpacks with custom textures and unique features, skins and upgrades!",
    images: [
      "https://i.imgur.com/kk5ppIh.png",
      "https://i.imgur.com/WuujleM.png",
      "https://i.gyazo.com/4fdc788867151d38ca6d0110cd40195d.png",
      "https://i.imgur.com/3z1iFYC.png",
      "https://i.gyazo.com/e7f70486f29fcec0d51f98edcdff7172.gif",
      "https://i.gyazo.com/a126934961ab8c35b67db44b4d32e691.png",
      "https://i.gyazo.com/e108cc5a75a10f0894dd5e1f68e0eac0.png",
      "https://i.gyazo.com/92d959160eacb302b8c79d9c06cbcc36.png",
      "https://i.gyazo.com/ebe9e50f19f2a07af16771032e008209.gif",
    ],
    price: 9.99,
    priceColor: "#15a31a", 
    badge: { text: "PREMIUM", color: "amber" },
    tags: ["premium","better-series"],
    image: "./assets/plugins/betterbackpackspro_logo.png",
    link: "https://alonsoaliaga.com/BetterBackpacksPro",
    github: "https://github.com/AlonsoAliaga/BetterBackpacks"
  },
  alonsochat: {
    name: "AlonsoChat",
    description: "The free chat alternative for your server.",
    icon: "comment",
    images: [
      "https://i.imgur.com/HBdF94t.png",
      "https://i.imgur.com/dRjYDHH.png",
      "https://i.imgur.com/EGrJotN.gif"
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","alonso-series"],
    image: "./assets/plugins/alonsochat_logo.png",
    link: "https://alonsoaliaga.com/AlonsoChat",
    github: "https://github.com/AlonsoAliaga/AlonsoChat"
  },
  alonsojoin: {
    name: "AlonsoJoin",
    description: "Join message & quit message! Announce your players and staff members correctly.",
    icon: "right-to-bracket",
    images: [
      "https://i.imgur.com/eie4iu4.png",
      "https://i.imgur.com/YIsJiXT.png",
      "https://i.imgur.com/PlzxDEn.png"
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","alonso-series"],
    image: "./assets/plugins/alonsojoin_logo.png",
    link: "https://alonsoaliaga.com/AlonsoJoin",
    github: "https://github.com/AlonsoAliaga/AlonsoJoin"
  },
  alonsobungee: {
    name: "AlonsoBungee",
    description: "Addon for Bungee proxy for some of our plugins to execute certain actions.",
    images: [
      "https://i.imgur.com/jxFhLpU.png"
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","alonso-series"],
    image: "./assets/plugins/alonsobungee_logo.png",
    link: "https://alonsoaliaga.com/AlonsoBungee",
    github: "https://github.com/AlonsoAliaga/AlonsoBungee"
  },
  alonsolib: {
    name: "AlonsoLib",
    description: "Library required for some of our plugins that adds new features.",
    images: [
      "https://i.imgur.com/Ovka2nF.png"
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","alonso-series"],
    image: "./assets/plugins/alonsolib_logo.png",
    link: "https://alonsoaliaga.com/AlonsoLib",
    github: "https://github.com/AlonsoAliaga/AlonsoLib"
  },
  alonsogg: {
    name: "AlonsoGG",
    description: "Reward your players for being good players.",
    images: [
      "https://i.imgur.com/NOPqJDT.png",
      "https://i.imgur.com/EgOSQk7.png"
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","alonso-series"],
    image: "./assets/plugins/alonsogg_logo.png",
    link: "https://alonsoaliaga.com/AlonsoGG",
    github: "https://github.com/AlonsoAliaga/AlonsoGG"
  },
  betterrevive: {
    name: "BetterRevive",
    description: "Give your players a second chance to live.",
    images: [
      "https://i.imgur.com/f2LU8lq.png",
      "https://imgur.com/YBZjZsQ.gif",
      "https://imgur.com/MhLeuQt.gif",
      "https://imgur.com/lT6GmuY.gif"
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","better-series"],
    image: "./assets/plugins/betterrevive_logo.png",
    link: "https://alonsoaliaga.com/BetterRevive",
    github: "https://github.com/AlonsoAliaga/BetterRevive"
  },
  alonsoleagues: {
    name: "AlonsoLeagues",
    description: "A highly customizable level system for your network that actually works.",
    images: [
      "https://i.imgur.com/QihGqxC.png",
      "https://i.gyazo.com/e22f6cc1a17c4f05ae35b37b32799562.png",
      "https://i.gyazo.com/4dd77940ef18c6077aedd33e7a6fb5c9.gif",
      "https://i.gyazo.com/dfabb58fc3622e280ec164b52b517064.png",
      "https://i.gyazo.com/ff881d71b286fab661d4d540af064b8f.png",
      "https://imgur.com/diS2auk.gif",
      "https://i.badlion.net/t4RtBjARizJH2xzzoT3GGV.png"
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","alonso-series"],
    image: "./assets/plugins/alonsoleagues_logo.png",
    link: "https://alonsoaliaga.com/AlonsoLeagues",
    github: "https://github.com/AlonsoAliaga/AlonsoLeagues"
  },
  bettereggs: {
    name: "BetterEggs",
    description: "Make your players walk to hatch mystery eggs.",
    images: [
      "https://i.imgur.com/AOG807f.png",
      "https://i.imgur.com/MfNMMsr.gif",
      "https://i.imgur.com/u4pW4R9.gif",
      "https://i.gyazo.com/88556f9ed6dd507d700a0d47e66523d4.png",
      "https://i.gyazo.com/d7bbc344dddd338f5aaf129a2424519c.png"
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","better-series"],
    image: "./assets/plugins/bettereggs_logo.png",
    link: "https://alonsoaliaga.com/BetterEggs",
    github: "https://github.com/AlonsoAliaga/BetterEggs"
  },
  betterheads: {
    name: "BetterHeads",
    description: "Give your players/builders access to amazing heads for a price.",
    images: [
      "https://i.imgur.com/Gm8W7C2.png",
      "https://i.gyazo.com/57b54178d6d2a34e11440ac2908a2e9d.png",
      "https://imgur.com/n1NkgDr.gif",
      "https://imgur.com/TbXLUsa.gif",
      "https://i.badlion.net/EcyQauneTGhRcrMRXmcuoF.png",
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","alonso-series"],
    image: "./assets/plugins/betterheads_logo.png",
    link: "https://alonsoaliaga.com/BetterHeads",
    github: "https://github.com/AlonsoAliaga/BetterHeads"
  },
  alonsoleaderboards: {
    name: "AlonsoLeaderboards",
    description: "Highly customizable leaderboards plugin for your server.",
    images: [
      "https://i.imgur.com/7JMkmfc.png",
      "https://i.badlion.net/rZGasceUmZS2wRbUxK3Xv3.png",
      "https://i.badlion.net/X2hnRBa7aMmJiRcwgvpSMo.png",
      "https://i.badlion.net/UbJBxjkpNiAUBZgCNmoNT6.png",
      "https://i.badlion.net/nV7qAqBsYeRd55byYmqApN.png",
      "https://i.badlion.net/WxkCpEmGYSJheLRudwtgAh.png",
      "https://i.gyazo.com/40370bb9f4b17841f76745985947f2b6.gif",
      "https://i.gyazo.com/352a908db7bb0f5403283b6227ce0087.gif",
      "https://i.gyazo.com/6985ef2ec9fcd1ad15b3c2b84d5f8cd0.gif",
      "https://i.imgur.com/qguRNrV.png",
      "https://i.gyazo.com/f7bb8e1318e3d711bfac04cc1cd7c88f.png",
      "https://i.imgur.com/VKdEDBL.gif",
      "https://i.gyazo.com/97aabdc07b4908b012beda9f137225d7.gif",
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","alonso-series"],
    image: "./assets/plugins/alonsoleaderboards_logo.png",
    link: "https://alonsoaliaga.com/AlonsoLeaderboards",
    github: "https://github.com/AlonsoAliaga/AlonsoLeaderboards"
  },
  alonsopvp: {
    name: "AlonsoPvP",
    description: "Customizable and nice-looking FFA for your server.",
    images: [
      "https://i.imgur.com/TvTPjzV.png",
      "https://imgur.com/pPdWrua.gif",
      "https://imgur.com/fhuYJpT.gif",
      "https://i.gyazo.com/605ce5c98ecc5e5ec1b84a66599a7c30.png",
      "https://i.gyazo.com/67bfbc1ade30455e1966dc20e573f542.png",
      "https://i.gyazo.com/fd4121593f142db2642cf95e5f5c840a.png",
      "https://i.gyazo.com/0f92613638c8ed4992664068129d8cc4.png",
      "https://i.gyazo.com/31cd3198d7369500974ced073c4e9b73.png",
      "https://i.gyazo.com/0e926d13c8ee959f93beba16a9bf4f67.png",
      "https://imgur.com/oeQs2tB.gif",
      "https://imgur.com/WKrMXNZ.gif",
      "https://imgur.com/Jy9Htjf.gif",
      "https://i.gyazo.com/86c0553c1a86484605014d3b3a0c9e0d.png",
      "https://imgur.com/AY1DSyv.gif",
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","alonso-series"],
    image: "./assets/plugins/alonsopvp_logo.png",
    link: "https://alonsoaliaga.com/AlonsoPvP",
    github: "https://github.com/AlonsoAliaga/AlonsoPvP"
  },
  betterballs: {
    name: "BetterBalls",
    description: "Balls with custom texture to take your pets everywhere.",
    images: [
      "https://i.imgur.com/DvD8S4W.png",
      "https://i.imgur.com/USoBVdp.png",
      "https://i.imgur.com/61rhjeC.png",
      "https://imgur.com/geg9DhA.gif",
      "https://i.gyazo.com/a6e2541cb8a01ff356eaa8c2afb83b9c.gif",
      "https://imgur.com/YmvXYE6.gif",
      "https://imgur.com/7Juhpzz.gif",
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","better-series"],
    image: "./assets/plugins/betterballs_logo.png",
    link: "https://alonsoaliaga.com/BetterBalls",
    github: "https://github.com/AlonsoAliaga/BetterBalls"
  },
  betterbees: {
    name: "BetterBees",
    description: "Enhance experience with bees in your server.",
    images: [
      "https://i.imgur.com/AbcAFyd.png",
      "https://i.imgur.com/mdWKmhf.png",
      "https://i.imgur.com/Mbaw4xd.png",
      "https://i.badlion.net/9BkBTbyHtyuHmMD7dh9u98.png",
      "https://i.badlion.net/shBN8LeQMrupchmDGuPSta.png",
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","better-series"],
    image: "./assets/plugins/betterbees_logo.png",
    link: "https://alonsoaliaga.com/BetterBees",
    github: "https://github.com/AlonsoAliaga/BetterBees"
  },
  bettercaptcha: {
    name: "BetterCaptcha",
    description: "A highly customizable captcha system for your server.",
    images: [
      "https://imgur.com/v3pqHLq.png",
      "https://i.gyazo.com/a6e111bf642a467d6eaa49ed1aa66eca.gif",
      "https://i.gyazo.com/443edf3ed6d8b0723576d2d416428528.gif",
      "https://i.gyazo.com/ed9d269a77e2a0f06e3952a0f21d51e5.png",
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","better-series"],
    image: "./assets/plugins/bettercaptcha_logo.png",
    link: "https://alonsoaliaga.com/BetterCaptcha",
    github: "https://github.com/AlonsoAliaga/BetterCaptcha"
  },
  bettereconomy: {
    name: "BetterEconomy",
    description: "Convert money to items you can store and viceversa! (RPG friendly)",
    images: [
      "https://imgur.com/5AuWioo.png",
      "https://i.gyazo.com/f79defe2e36b9fc6707d43f6a815c5cc.png",
      "https://i.gyazo.com/1f40db9c2c1ca0537e624ba478cff3f7.png",
      "https://i.gyazo.com/6eba1dc6be233acdb3991c087cd60706.gif",
      "https://i.gyazo.com/fea27ef760d75243a4192cba8ccacd87.gif",
      "https://i.gyazo.com/da2cb48533767dd094d56a4657a98224.png",
      "https://i.gyazo.com/6ddf67b872e62465a9d0d5426f7d9470.gif",
      "https://i.imgur.com/6gvqS0C.png",
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","better-series"],
    image: "./assets/plugins/bettereconomy_logo.png",
    link: "https://alonsoaliaga.com/BetterEconomy",
    github: "https://github.com/AlonsoAliaga/BetterEconomy"
  },
  betterpets: {
    name: "BetterPets",
    description: "Pets living in your inventory ready to help you!",
    images: [
      "https://i.imgur.com/13LNajj.png",
      "https://i.imgur.com/hj6djna.png",
      "https://i.gyazo.com/9520993e279ee60015868c3b2c279e2b.png",
      "https://i.gyazo.com/e005ea386a1328188bc890a15dec11cc.png",
      "https://i.gyazo.com/c8534a7fe54d1373ca1d25a79aa2542d.png",
      "https://imgur.com/hgtagkq.gif",
      "https://imgur.com/Wy6ruP8.gif",
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","better-series"],
    image: "./assets/plugins/betterpets_logo.png",
    link: "https://alonsoaliaga.com/BetterPets",
    github: "https://github.com/AlonsoAliaga/BetterPets"
  },
  betterprofiles: {
    name: "BetterProfiles",
    description: "An amazing way to display players profiles to others.",
    images: [
      "https://imgur.com/6s0WTUS.png",
      "https://imgur.com/mkvWwHw.gif",
      "https://i.gyazo.com/c9ae9fe81cb37e1d9977919fe252b920.png",
      "https://i.gyazo.com/12106583be0450c9936e468ed1fed07d.png",
      "https://i.gyazo.com/ddd798875cbc0c5748144c11e1483af9.png",
      "https://i.gyazo.com/d8456581556df657b0b9a3bf47001b44.png",
      "https://i.gyazo.com/7a4a8e70f62071f4124b20213e32e5fc.png",
      "https://i.gyazo.com/c12238e0c7fb02c0795949d94051aed9.png",
      "https://i.gyazo.com/ebf1270421a2702fb4ac7a31f546bf51.gif",
      "https://i.gyazo.com/069ccaa073e635be11d16e2419f7baf4.gif",
      "https://imgur.com/2J8wDtr.gif",
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","better-series"],
    image: "./assets/plugins/betterprofiles_logo.png",
    link: "https://alonsoaliaga.com/BetterProfiles",
    github: "https://github.com/AlonsoAliaga/BetterProfiles"
  },
  betterprofilespro: {
    disable: true,
    name: "BetterProfilesPro",
    description: "An amazing way to display players profiles to others.",
    images: [
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    badge: { text: "PREMIUM", color: "amber" },
    tags: ["premium","better-series"],
    image: "./assets/plugins/betterprofilespro_logo.png",
    link: "https://alonsoaliaga.com/BetterProfilesPro",
    github: "https://github.com/AlonsoAliaga/BetterProfiles"
  },
  bettertalisman: {
    name: "BetterTalisman",
    description: "Create talismans with boosts for your players.",
    images: [
      "https://i.imgur.com/g46r0Y0.png",
      "https://i.imgur.com/qXbGvLh.png",
      "https://i.imgur.com/aZyaBJF.png",
      "https://i.gyazo.com/837b114a632c645a3ef00e6390de22b2.png",
      "https://i.gyazo.com/b85cb1beee49a316b808da6ee1eb7647.png",
      "https://i.gyazo.com/244b0075848517f03573a0866c1685c1.png",
      "https://i.gyazo.com/4e159bb42a3b9a04505aab4efe651ace.png",
      "https://i.imgur.com/xVOoNnV.gif",
      "https://i.imgur.com/icj806H.gif",
      "https://i.imgur.com/pRGZ4mt.gif",
      "https://i.imgur.com/cL0vZZR.gif",
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","better-series"],
    image: "./assets/plugins/bettertalisman_logo.png",
    link: "https://alonsoaliaga.com/BetterTalisman",
    github: "https://github.com/AlonsoAliaga/BetterTalisman"
  },
  punchstaff: {
    name: "PunchStaff",
    description: 'Let your donors "thank" your staff members.',
    images: [
      "https://i.imgur.com/YpwE8RB.png",
      "https://imgur.com/RXfCgQU.gif",
      "https://i.gyazo.com/7ba6e71da16538f794ac596a5b718025.png",
      "https://i.gyazo.com/a55000a9f79b750994b85dc2c5cdfff1.png",
      "https://imgur.com/G0m4SbA.gif",
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","others"],
    image: "./assets/plugins/punchstaff_logo.png",
    link: "https://alonsoaliaga.com/PunchStaff",
    github: "https://github.com/AlonsoAliaga/PunchStaff"
  },
  betterwaypoints: {
    name: "BetterWaypoints",
    description: "Give your players a new way to save waypoints easily!",
    images: [
      "https://i.imgur.com/P5SEJSE.png",
      "https://i.gyazo.com/d3091e898102a64bd75ceee2f1238766.png",
      "https://i.gyazo.com/56764c6b064c47590e0e4f935c67e0c8.png",
      "https://i.imgur.com/ShmDxLe.gif",
      "https://i.imgur.com/qZWj29k.gif",
      "https://i.imgur.com/w5Ypt4r.gif",
      "https://i.imgur.com/IBjydgV.gif",
      "https://i.imgur.com/fywdTql.gif",
      "https://i.imgur.com/TfUoiAS.gif",
      "https://i.imgur.com/zXO2gG9.gif",
      "https://i.imgur.com/VsttJYz.png"
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","better-series"],
    image: "./assets/plugins/betterwaypoints_logo.png",
    link: "https://alonsoaliaga.com/BetterWaypoints",
    github: "https://github.com/AlonsoAliaga/BetterWaypoints"
  },
  bettersocial: {
    name: "BetterSocial",
    description: "Enhance your community by letting your players share their social media.",
    images: [
      "https://i.imgur.com/qqtjaFr.png",
      "https://i.gyazo.com/c55ba9b07dedfe63fee8ad3be3a7721a.png",
      "https://i.gyazo.com/885fb6ecd4a554038ee946209e4558e2.png",
      "https://i.gyazo.com/6b912f6bbb1518332363447b7aa26369.png",
      "https://i.gyazo.com/985c24589d56f487c6e0c496097663dc.png",
      "https://i.gyazo.com/cf09c2282fafe8dfe74450f45fdb2e70.png",
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","better-series"],
    image: "./assets/plugins/bettersocial_logo.png",
    link: "https://alonsoaliaga.com/BetterSocial",
    github: "https://github.com/AlonsoAliaga/BetterSocial"
  },
  TOEDIT: {
    name: "TOEDIT",
    description: "TOEDIT",
    images: [
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    badge: { text: "FREE", color: "green" },
    tags: ["free","alonso-series"],
    image: "./assets/plugins/TOEDIT.png",
    link: "https://alonsoaliaga.com/TOEDIT",
    github: "https://github.com/AlonsoAliaga/TOEDIT"
  },
}
const pluginsData2 = [
    {
        name: "Advanced Economy Plugin",
        description: "A comprehensive economy solution for your server, featuring trading, banking, and currency management.",
        images: [
            "https://placehold.co/400x225/4A0080/FFFFFF?text=Plugin+Eco+Screenshot",
            "https://placehold.co/400x225/8A2BE2/FFFFFF?text=Economy+UI"
        ],
        price: 19.99,
        priceColor: "#FFD700", // Gold color for price
        resourceLink: "https://yourwebsite.com/plugins/advanced-economy"
    },
    {
        name: "Custom Minigames Suite",
        description: "Create fun and engaging minigames with ease using this versatile plugin suite.",
        images: [
            "https://placehold.co/400x225/001A4A/FFFFFF?text=Minigame+Arena",
            "https://placehold.co/400x225/6A00FF/FFFFFF?text=Minigame+Lobby"
        ],
        price: 0,
        resourceLink: "https://yourwebsite.com/plugins/minigames-suite"
    },
    {
        name: "Dynamic Weather System",
        description: "Adds realistic and dynamic weather patterns to your game world.",
        images: [
            "https://placehold.co/400x225/5A0090/FFFFFF?text=Weather+Rain",
            "https://placehold.co/400x225/2B0055/FFFFFF?text=Weather+Snow"
        ],
        price: 9.99,
        priceColor: "#ADD8E6", // Light Blue for price
        resourceLink: "https://yourwebsite.com/plugins/dynamic-weather"
    },
    {
        name: "Anti-Grief Guard",
        description: "Powerful anti-grief plugin to protect your server builds from malicious players.",
        images: [
            "https://placehold.co/400x225/B22222/FFFFFF?text=AntiGrief+Shield"
        ],
        price: 14.50,
        resourceLink: "https://yourwebsite.com/plugins/antigrief-guard"
    }
];
const packsData = [
    {
        //name: "Coming soon..",
        //description: "Minecraft rank textures and more!",
        //description: "A high-resolution texture pack perfect for immersive RPG adventures.",
        images: [
            "https://i.imgur.com/ENqCcMB.png",
            "https://i.imgur.com/Yp0b0La.png"
        ],
        //price: 0.00,
        //link: "https://alonsoaliaga.com/builtbybit"
    }
];
let toolsData = [
    {
        name: "Loading",
        description: "Loading tools for you.",
        logo: "https://placehold.co/120x120/2B0055/FFFFFF?text=Loading..",
        price: 0, // All tools are free
        priceColor: "#32CD32", // Custom lime green for FREE label
        link: "https://alonsoaliaga.com/site"
    }
];
/**
 * Renders the items into a specific grid container.
 * @param {string} containerId - The ID of the HTML element where items should be appended.
 * @param {Array<Object>} itemsData - An array of item objects.
 */
async function renderItems(containerId, itemsData) {
    const container = document.getElementById(containerId);
    if (container) {
        // Clear existing content if re-rendering
        container.innerHTML = '';
        if(containerId == "tools-grid") {
          itemsData.forEach(async item => {
              await wait(1000);
              container.appendChild(createToolItemCard(item, containerId)); // Pass containerId to createItemCard
          });
        }else{
            Object.keys(itemsData).forEach(itemId => {
                if(itemId != "TOEDIT" && !itemsData[itemId].disable)
                    container.appendChild(createStandardItemCard(itemsData[itemId], containerId)); // Pass containerId to createItemCard
            });
        }
    }
}
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Render all sections on page load
document.addEventListener('DOMContentLoaded', () => {
    renderItems('plugins-grid', pluginsData);
    renderItems('packs-grid', packsData);
    loadTools();
    async function loadTools() {
      fetch('https://raw.githubusercontent.com/AlonsoAliaga/AlonsoAliagaAPI/refs/heads/main/api/tools/tools-list.json')
          .then(res => res.json())
          .then(content => {
              toolsData = content;
              renderItems('tools-grid', toolsData);
          });
    };
});