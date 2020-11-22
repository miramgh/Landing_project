//Defining our global variables 

const ul = document.getElementById("navbar__list");
const sections = document.querySelectorAll('.landing__container');
const secActive =document.querySelectorAll('section');
const fragment = document.createDocumentFragment();
const lis = document.querySelectorAll('li');
const links = document.querySelectorAll('a');



/* CREATING THE DYNAMIC NAV BAR  */
// Loop over the sections and get the data inside the attribute data-nav
// create a list items of the data and give them class menu__link 
// create an anchor tag and give it href to the id of the section 
//append this to the dom 



sections.forEach( (section) => {
   let link_text = section.parentElement.getAttribute('data-nav');
   let id = section.parentElement.getAttribute('id');

   let li = document.createElement('li');
   li.classList.add('menu__link');


   let a = document.createElement('a');
   a.setAttribute('data-link', id);
   a.innerText  = link_text;


   a.addEventListener("click", ()=> {
    section.scrollIntoView({behavior:'smooth'});
  
  });

   li.appendChild(a);

   fragment.appendChild(li);

   
});


ul.appendChild(fragment);

// remove the acitve class from the scrolled up section 

function removeActiveSection() {
  secActive.forEach( (sec) => { 
     sec.classList.remove("your-active-class");
  });
}

// remove the active link from all links to add the class to the link of the active section only

function removeActiveLink() {
  const links = document.querySelectorAll('a');
  links.forEach( (link) => { 
     link.classList.remove("active__link");
  });
}

//pass the active section to the function and figure out what is the link which have the href to the active section
// and give it class active 

function getActiveLink(sec) {
   let dataNav= sec.getAttribute('data-nav');
   const links = document.querySelectorAll('a');
    links.forEach( (link) => { 

      if (dataNav == link.textContent) {
          removeActiveLink(); 
        link.classList.add("active__link");
        return link;
      }
    } );
}


// Check what is active to give them class active 

function checkActive() {
  secActive.forEach( (sec) => { 
    rect = sec.getBoundingClientRect();
    let plus = 1  + rect.bottom - window.innerHeight;  
    if (rect.top >= 0 
      &&  rect.left >= 0 
      && rect.bottom <= (window.innerHeight + plus) 
      && rect.top < 100) 
      {
        getActiveLink(sec)

        removeActiveSection();
        sec.classList.add("your-active-class");
   
    }   
  
  });
}

 
window.addEventListener('scroll', checkActive);