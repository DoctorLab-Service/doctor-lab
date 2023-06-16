export default (() => {
    /*
        Set this style into your css
    */
    /* .load */
    // body[data - load= "true"] *
    //     -webkit - transition: none!important
    //     - moz - transition: none!important
    //     - ms - transition: none!important
    //     - o - transition: none!important



    const body = document.querySelector('body')
    body.setAttribute('data-load', 'true')

    setTimeout(() => {
        body.setAttribute('data-load', 'false')
    }, 1000)
})()