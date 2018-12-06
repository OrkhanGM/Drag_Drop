var draggedItems = document.querySelectorAll('.draggedItems');
var droppable = document.querySelectorAll('.droppable');
var timer = document.querySelector("#timer");
var start = document.querySelector("#start");
var gamezone = document.querySelector(".gamezone");
var winimage = document.querySelector("body>img");


// ARRAYIN ICINDEKI REQEMLERI QARISDIRAN FUNKSIYA
var myArray = ['1', '2', '3', '4', '5', '6', '7', '8'];
var mixedArray = shuffle(myArray);
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
// --------------------------------------------------------



// DRAG OLUNAN ELEMENTLER UCHUN
var i = -1;
for (var dragItem of draggedItems) {

    // ARRAYDAKI QARISDIRILMIS REQEMLERI DIVLERI _ID VE _TEXTINE ELAVE ETMEK UCHUN
    if (i < mixedArray.length) {
        i++;
    }
    dragItem.id = "div" + mixedArray[i];
    dragItem.innerHTML = mixedArray[i];
    // ---------------------------------------------------------------------------

    //ADD DRAG START EVENT
    dragItem.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("dragElementID", e.target.getAttribute("id"));
        e.target.classList.add("dragging");
    })
    // -----------------------------------------------------------------------------

    //ADD DRAG END EVENT 
    // dragItem.addEventListener("dragend", function(){
    //     console.log('drag just ended');
    // })
    // ---------------------------------------------------

    //ADD WHILE DRAG EVENT 
    // dragItem.addEventListener("drag", function(){
    //     console.log('drag continues');
    // })
    // -----------------------------------------------------
}



// DROP OLUNAN ELEMENTLER UCHUN
var truetaps = 0;
for (var drop of droppable) {

    //ADD DROPOVER ELEMENT
    drop.addEventListener("dragover", function (e) {
        e.preventDefault();
    })
    // -----------------------------------------------

    //ADD DROP EVENT
    drop.addEventListener("drop", function (e) {

        // EGER EVVEL ORAYA DROP OLUNUBSA DROP ETME
        if (e.target.childNodes.length == 0) {
            var dragElementID = e.dataTransfer.getData("dragElementID");
            var dragElemen = document.querySelector("#" + dragElementID);
            dragElemen.classList.remove("dragging");
            e.target.appendChild(dragElemen);

            // DOGRU YERE DROP ETMISENSE +1 ARTIRSIN
            if (e.srcElement.id == "#" + dragElementID) {
                truetaps = truetaps + 1;
            }
            // -------------------------------------------

        }
        // -------------------------------------------------------------

        // WIN OLDUGUNU YOXLAYAN
        if (truetaps == 8) {
            clearInterval(interval);//WIN OLANDA VAXTI SAXLAMAQ UCHUN
            winimage.style.display = "block";
        }
        // ----------------------------------

    })
    // ----------------------------------------------------------------------------------

}
// ----------------------------------------------------------------------------------------------

var saniye = 0;
var deqiqe = 0;
var interval;


// START BUTTONUNA CLICK EDENDE VATIN VE OYUNUN BASLAMASI
start.addEventListener("click", function () {
    gamezone.style.display = "none";
    starttime();
});
// -------------------------------------------------------



// -----------------------------FUNKSIYALAR----------------------------------------
// VAXTI EKRANA YAZDIRAN FUNKSIYA 
function starttime() {
    interval = setInterval(function () {

        saniye++;

        if (saniye > 59) {
            deqiqe++;
            saniye = 0;
        }
        if (deqiqe < 10 && saniye < 10) {
            timer.innerHTML = "Game Time : " + "0" + deqiqe + ":" + "0" + saniye;
        }
        else if (deqiqe <= 9 && saniye > 9) {
            timer.innerHTML = "Game Time : " + "0" + deqiqe + ":" + saniye;
        }
        else if (deqiqe > 9 && saniye > 9) {
            timer.innerHTML = "Game Time : " + deqiqe + ":" + saniye;
        }
    }, 1000);
}
// ------------------------------------------------------------------------------------