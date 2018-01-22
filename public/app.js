$(document).ready(function() {
     // Stuff to do as soon as the DOM is ready

     //get articles
     $("#scrape").on("click", () => {
        $.get("/articles", (articles) =>{
            for (let article of articles){
                
            }
        });
     });
});
