const CurrentPage = location.pathname
const Menuitems = document.querySelectorAll('header .links a')


for(item of Menuitems){
     if(CurrentPage.includes(item.getAttribute("href"))){
          item.classList.add("active")
     }
}

