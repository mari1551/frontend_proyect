/*  ------------MENU------------- */

        // funcion autoejecutable
((d)=>{
    //d = document

    const $btnMenu = d.querySelector('.menu_btn');
    const $menu=d.querySelector('.menu');
    //const $dropdown = d.querySelector('.dropdown');

    $btnMenu.addEventListener("click",e=>{
        $btnMenu.firstElementChild.classList.toggle("none");
        $btnMenu.lastElementChild.classList.toggle("none");
        $menu.classList.toggle('is-active');
    })
    // $dropdown.addEventListener("click", e => {
    //     e.stopPropagation(); // Evita que el evento se propague al contenedor de menú
    // });

    d.addEventListener("click",e=>{
        if(!e.target.matches(".menu a")) return false;
        $btnMenu.firstElementChild.classList.remove("none");
        $btnMenu.lastElementChild.classList.add("none");
        $menu.classList.remove('is-active');
    })

})(document)