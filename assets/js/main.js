 
 
 //#region AJAX => CALLBACK AJAX
function AjaxCallBack(fileName,HendlerError,result,asinhron){
    $.ajax({
    url:"assets/data/"+fileName,
    method:"get",
    dataType:"JSON",
    success:result,
    error:function(xhr,error,status){
        HendlerError(xhr)
    },
    async: true
    });
}

function HendlerError(xhr){
    //PrikazModala(xhr)
}

function SetLocalStorage(key,value){
    localStorage.setItem(key,JSON.stringify(value))
}

function GetLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}
//#endregion

//promenljiva koja proverava na kojoj rezoluciji je ucitana stranica
var media577px = window.matchMedia("(max-width: 577px)")
var url=window.location.pathname;


    // pomocne globalne promenljiva radi kontrole broja proizvoda u korpi
    if(GetLocalStorage("numberProductsInChart")==undefined || GetLocalStorage("numberProductsInChart").lenght==0 || GetLocalStorage("numberProductsInChart")== null){
        var numberProductsInChart=0
        var productsInChart=[];
        SetLocalStorage("numberProductsInChart",numberProductsInChart);
        SetLocalStorage("productsInChart",productsInChart);
    }
    else{
        var numberProductsInChart = GetLocalStorage("numberProductsInChart");
    }

window.onload= function(){


    // KONTROLA PRIAZA HEDERA
    ControleHeader();

    //#region DINAMICKO KREIRANJE NAVIGACIONOG MENIA */

    AjaxCallBack("links.json",HendlerError,function(result){
        writeLinks(result,"navHeader");
        writeLinks(result,"miniNav");
        writeLinks(result,"navFooter");

    },true)


    let hamburger=1
    $("#hamburger").click(function(){
        if(hamburger){
            
            $("#miniNav").show("slow")
            hamburger=0;
        }
        else{
            $("#miniNav").hide("slow")
            hamburger=1
        }
    }

    )
 
    //#endregion


    UkupanBrojiArtikalaUKorpi(numberProductsInChart);


    //#region DINAMICKO ISPISIVANJE ELEMENATA SLAJDERA
    if(url=="/sajtWp/" || url=="/sajtWp/index.php"){
        AjaxCallBack("products.json",HendlerError,function(result){ WriteProductsInSlider(result,"SlajderMen","m","okvirSlajderaMen")},false)
        AjaxCallBack("products.json",HendlerError,function(result){ WriteProductsInSlider(result,"SlajderWomen","z","okvirSlajderaWomen")},false)
        AjaxCallBack("products.json",HendlerError,function(result){ WriteProductsInSlider(result,"SlajderKids","k","okvirSlajderaKids"); SetLocalStorage("sviProizvodi", result);},false)
    
    }
    //#endregion

    //#region *Dodavanje broja proizvoda u korpu i dodavanje istih proizvoda u localstorage */

    $("#korpaIco").on("click",function(){

        $("#vecaKorpa").removeClass("d-none")
        if(GetLocalStorage("productsInChart").length==0 || GetLocalStorage("productsInChart")==null){

            document.querySelector("#proizvodiUKopri").innerHTML+="<p class='text-center'>Vasa korpa je jos uvek prazna</p>";
        }
        else{
            let div = document.getElementById("proizvodiUKopri") 
            div.innerHTML=" "
            ispisElemenataUKorpu(GetLocalStorage("productsInChart"))
            RemoveFromChartEvent(GetLocalStorage("productsInChart"))
        }
    })

    $("#korpaHidden").on("click",function(){$("#vecaKorpa").addClass("d-none")})

    //#endregion
    
    MainEvent(); //klikom na main tad(bilo koji deo povrsine sajta) svi ekspandirajuci blokovi se skrivaju

    if (url=="/sajtWp/proizvodi.php"){

        AjaxCallBack("kategories.json",HendlerError(),   function(result){ WriteCategories(result,"#odaberiteKategorije")},false)
        AjaxCallBack("brends.json",HendlerError(),   function(result){ WriteBrends(result,"#odaberiteBrendove")},false)
        SetLocalStorage("filtriraniProizvodi", []);
        AjaxCallBack("products.json",HendlerError(),function(result){
            SetLocalStorage("sviProizvodi", result);  WriteAll(result); 
            //poziva se funkcija koja moze u sebi sadrzati odredjene filtere ako su oni prosledjeni kroz url, ona poziva opet WriteAll
            //ukoliko nisu prosledjeni filteri kroz url, telo funckicje filtriranjePoUcitavanju... je prazno i nista ne izvrsava
        },false);


    }

    // PRIKAZIVANJE I SAKRIVANJE BLOKA SA FILTERIMA - PROIZVODI.PHP
    $("#ikonicaZaFiltriranje").click(function(){
        $("#divZaFiltriranje").toggle('slow')
        $("#divZaFiltriranje").css("display","block")

    })

    // ispis tabele proizvoda
    if(url=='/sajtWp/korpa.php'){
        IspisTabele(GetLocalStorage('productsInChart'),"tableChart");
        
        
    }


}


// Dogadjaj onScroll
function ControleHeader(){
    let header = $("header")
    window.onscroll = function(){
        if(window.pageYOffset > 400){

            header.css("position","fixed")


           }
           else{
               header.css("position","relative")
           }
    }

}



//Dodavanje dogadjaja za dodavanje elemenata u korpu
function AddToChartEvent(id){
        let element
        GetLocalStorage('sviProizvodi').forEach(  item => {
            item.kolicina=1;
            if(item.id==id){
                element=item
            }
        })
        
        var items = GetLocalStorage("productsInChart")
        
                if(items.length>0 && items != null){
                    items.forEach(item => {
                        if(item.id == id){
                            element=item
                        }
                    });
                    if(items.filter(x=> x.id == element.id).length>=1){

                        if(element.kolicina >= 10){
                            alert("Maksimalna kolicina proizvoda je deset")
                        }
                       else {
                           items.forEach(item => {
                               if( element.id==item.id){
                                   item.kolicina++;
                                   //ispisKolicineUKorpu(item) 


                               }                           
                           });
                            popUpChart()
                        }
                    }
                    else{
                        numberProductsInChart++;
                        SetLocalStorage("numberProductsInChart",numberProductsInChart);
                        UkupanBrojiArtikalaUKorpi(numberProductsInChart);
                        items.push(element);
                        popUpChart();
                    }
                }
                else{   
                    items.push(element)
                    popUpChart()
                    numberProductsInChart++;
                    SetLocalStorage("numberProductsInChart",numberProductsInChart);
                    UkupanBrojiArtikalaUKorpi(numberProductsInChart);
                }

                SetLocalStorage("productsInChart",items);


}

function popUpChart(){
    $("#uspesnoDodatProizvod").fadeIn(300);
        setTimeout(function(){
         $("#uspesnoDodatProizvod").fadeOut(1000)
        },2000)
                    
}      
// Dogadjaj koji brise proizvod iz korpe i LocalStorage-a
function RemoveFromChartEvent(niz){

            for(let i in niz){
                
                try{
                    let div= document.querySelector("#korpaIksic"+niz[i].id)
                    div.addEventListener("click", function(){
                        var korpa = document.getElementById("proizvodiUKopri");
                        let div2= $("#proizvodiUKopri").children()
                        div2=Array.from(div2)
                        div2.forEach(value => {
                            if(value.id=="korpa"+niz[i].id){
                                korpa.removeChild(value)
                                value.kolicina=0;
                                let items = GetLocalStorage("productsInChart")

                                items=items.filter(x=> "korpa"+x.id!=value.id)
                                SetLocalStorage("productsInChart",items)
                            }
                        });
                        niz[i].kolicina=0
                        numberProductsInChart--;
                        UkupanBrojiArtikalaUKorpi(numberProductsInChart);
                        SetLocalStorage("numberProductsInChart",numberProductsInChart)

                   })
                }
                catch {
                    PrikazModala("Greska u brisanju elemenata iz korpe")
                }

            }
}

// Element se dodaje u korpu preko LocalStorage-a
function ispisElemenataUKorpu(niz){
            html=""
            let div = document.getElementById("proizvodiUKopri")   
                niz.forEach(element => { 
                    html+=`
                            <div id="korpa${element.id}" class="col-12 p-2 d-flex">
                                <div class="col-4">
                                    <img src="${element.slika}" class="img-fluid" alt="${element.naziv}"/>
                                </div>
                                <div class="col-7 offset-1 d-flex align-items-center relative">
                                    <div class="opisStavkeUKorpi w-100">
                                        <div>${element.naziv}</div>
                                        <div class=" ispisOcenaUKorpi">${IspisOcene(element.ocena)}</div>
                                        <div>Kolicina:<span id="kolicina${element.id}">${element.kolicina}</span></div>
                                        <div><span class="text-decoration-line-through">${element.cena.staraCena}</span></div>
                                        <div><span class="fw-bolder">${element.cena.aktuelnaCena} RSD - kom.</span></div>
                                        <div id="korpaIksic${element.id}"class="korpaIksic"><i class="fas fa-times-circle"></i></div>
                                    </div>
                                </div>
                            </div>

                    
                    `
                });  

                div.innerHTML+=html
            
}   

function UkupanBrojiArtikalaUKorpi(br){
    if(br>=0){
        let div  = $("#brProizvoda");
        div.text(br)
    }
}


// Ispis Linkova u navigacionim sekcijama
function writeLinks(links, navId){
    var ul = document.createElement("ul");
    links.forEach(element => {
      
        let li = document.createElement("li"), a= document.createElement("a")
        li.setAttribute("id", element.id);
        li.classList.add("mx-3","pointer")
        if(navId=="miniNav"){
            li.classList.add("pb-3")
            ul.classList.add("mt-4")
        };

        a.innerHTML=element.txt
        li.appendChild(a)
        ul.appendChild(li)

        $("#"+element.id).addClass("relative")
        if((element.id=="men" || element.id=="women")&&(navId!="navFooter"&&navId!="miniNav")){
                a.innerHTML+=' <i class="fas fa-sort-down"></i>'
               li.appendChild(writeAditionalLinks(element));

        }
        else a.setAttribute("href",element.link);
        $("#"+navId).html()
    });
    
    $("#"+navId).append(ul);
    eventForAditional();

    
}

// Ispis pod linkova u navigacionim sekcijama
function writeAditionalLinks(link){   
    var div = document.createElement("div"), ul=document.createElement("ul")
    div.classList.add("d-none")
    div.setAttribute("id",link.aditionalLink.id)
    ul.classList.add("d-block");
    var li, a;
    for(let i=0;i<link.aditionalLink.naziv.length;i++){
      
        li=document.createElement("li"),a=document.createElement("a")
        a.setAttribute("href",link.aditionalLink.podLink[i])
        a.innerHTML= link.aditionalLink.naziv[i];
        li.append(a)
        ul.append(li);
    }
    div.appendChild(ul)
    return div
    
}

// Dodavanje dogadjaja kako bi se prikazali pod linkovi
function eventForAditional(){
        var menWomen=[]
        menWomen[0] = document.getElementById("aditionalMen")
        menWomen[1]=document.getElementById("aditionalWomen")
        let menWomenParents=["men","women"]
        for(let i=0;i<menWomen.length;i++){
        menWomen[i].style.backgroundColor="#e6e8eb"
        document.getElementById(menWomenParents[i]).addEventListener("click",function(){
            if(!menWomen[i].hasAttribute("watch")){
                for(let k=0;k<menWomen.length;k++){
                    if(menWomen[k].hasAttribute("watch")){
                        menWomen[k].removeAttribute("watch")
                        menWomen[k].classList.add("d-none")
                    }
                }
                menWomen[i].classList.remove("d-none")
                menWomen[i].setAttribute("watch","watch")
            }
            else{
                menWomen[i].classList.add("d-none")
                menWomen[i].removeAttribute("watch");
            }
        
        })
        }

    
}

// Ispisivanje proizvoda u slajder
function WriteProductsInSlider(niz,idSlajdera,pol,idOkviraSlajdera){
    niz.forEach(element => {
        element['kolicina']=1;
    });
    SetLocalStorage("sviProizvodi",niz)
    var filtriraniNiz= GetLocalStorage("sviProizvodi").filter(x=> x.pol==pol)
    filtriraniNiz=filtriraniNiz.filter(x=> x.najProdavaniji)
    var sekcija=document.getElementById(idSlajdera);
    var html=""
    html+=` 
    <div class="row ">
        <div class="col-1 relative"><i class="fas fa-chevron-left arrow-left col-1"></i></div>
        <div class="col-10 d-flex" id="${idOkviraSlajdera}">
            ${IspisKartica(filtriraniNiz)}
        </div>
        <div class="col-1 relative"> <i class="fas fa-chevron-right arrow-right col-1"></i></div>
    </div>`
    sekcija.innerHTML+=html


    filtriraniNiz.forEach(element => {
        
        AjaxCallBack("kategories.json",HendlerError,function(result){IspisKategorije(result,element,"spanKartica"+element.id)},false)
        AjaxCallBack("brends.json",HendlerError,function(result){IspisBrenda(result,element,"spanKartica"+element.id)},false)
    });

    ArrowEventHelp(idOkviraSlajdera);



   

    
}

// Pod funkcija funkcije WriteProductsINSlider, ispisuje karticu(jedan proizvod u slajderu)
function IspisKartica(filtriraniNiz){
    //PRILIKOM SMANJIVANJA REZOLUCIJU U PREGLEDACU POTREBNO JE OSVEZITI STRANICU KAKO BI SE UCITAO SADRZAJ PRILAGODJEN ZA TU REZOLUCIJU!!!
    var html=""
    dNone=""
        for(let i=0;i<filtriraniNiz.length;i++){
            //if(i<=y){
            html+=`<div id="${filtriraniNiz[i].id}" class="col-12 col-sm-4 col-lg-4 p-3 kartica kartice-${filtriraniNiz[i].pol}">
            <div class="relative d-flex justify-content-center mb-2"><img src="${filtriraniNiz[i].slika}" class="img-fluid kartice-hover" alt="${filtriraniNiz[i].naziv}"/>
            <div class="col-12 p-2 divKorpeKartice"><button id="btn${filtriraniNiz[i].id}" onclick="AddToChartEvent('${filtriraniNiz[i].id}')" class="btn dugmeKorpeKartice"><i class="fas fa-cart-arrow-down text-white"></i></button></div>
            </div>
            <div class="d-flex justify-content-between"><span class="respon-font-12" id="spanKartica${filtriraniNiz[i].id}" ></span></div>
            <div class="d-flex justify-content-between"><h4 class="respon-font-13">${filtriraniNiz[i].naziv}</h4></div>
            <div><span>${IspisOcene(filtriraniNiz[i].ocena)}</span></div>
            <div class="d-flex justify-content-between"><span class="text-decoration-line-through">${filtriraniNiz[i].cena.staraCena}</span><span class="fw-bolder">${filtriraniNiz[i].cena.aktuelnaCena} RSD</span></div>
            </div>
            `
        }
    
    
        return html;
}   

// Ispisivanje Kategorije za zadati element
function IspisKategorije(kategories,element,divID){
        var niz = []
        var html=``
        try{
            kategories.forEach(kat => {
                element.kategorijaId.forEach(elemKat => {
                    if(kat.id==elemKat){
                        niz.push(kat.naziv)
                    }
                });
            });
            niz.forEach(item => {
                if(html.length>0)html+=", "+item;
                else html+=item
            });
            html+=`> `
            document.querySelector("#"+divID).innerHTML=html
        }
        catch{
            let i=1;
        }
        

}

//Ispisivanje brenda za zadati element za
function IspisBrenda(brends,element,divID){
    try{
        var niz, html=``
        niz= brends.filter(x=> x.id == element.brendId);
        html+=niz[0].naziv
        document.querySelector("#"+ divID).innerHTML+=html
    }catch{
        let i=1;
    }
        

}

//Ispisivanje ocene za zadati element
function IspisOcene(number){
        var  html="<ul class='mb-0'>"
        for(let i =0 ; i<5;i++){
            if(i<number){
            html+=`
                <li class="inline"><i class="fas fa-star"></i></li>
            `
            }
            else html+=`<li class="inline"><i class="far fa-star"></i></li>`
        }
        html+="</ul>"
        return html;
        
}

function ArrowEventHelp(idOkviraSlajdera){
   
    if(idOkviraSlajdera == "okvirSlajderaMen"){
        ArrowEvent(idOkviraSlajdera,0,0);
    }
    else if(idOkviraSlajdera == "okvirSlajderaWomen"){
        ArrowEvent(idOkviraSlajdera,1,1);

    }
    else{
        ArrowEvent(idOkviraSlajdera,2,2);
        
    }

} 

// Funkcija koja ispusje dodatne proizvode slajdera i vrti ih u krug
function ArrowEvent(idOkviraSlajdera,levaStrelica,desnaStrelica){

    var x = $(".arrow-right")[desnaStrelica]
    if(x == undefined) {
        setTimeout(function(){
            ArrowEvent(idOkviraSlajdera,levaStrelica,desnaStrelica);
        },200)
    }
    else{
        var x = document.querySelectorAll(".arrow-right")[desnaStrelica]
        x.addEventListener("click",function(){
            var width = document.querySelectorAll("#"+idOkviraSlajdera+" div")[0].offsetWidth
            document.getElementById(idOkviraSlajdera).scrollLeft += width;

        }) 

        var y = document.querySelectorAll(".arrow-left")[levaStrelica]
        y.addEventListener("click",function(){
            var width = document.querySelectorAll("#"+idOkviraSlajdera+" div")[0].offsetWidth
            document.getElementById(idOkviraSlajdera).scrollLeft -= width;
        }) 
    }
}

//Dodavanje dogadjaja na Main radi zatvaranja svi iskacucih blokova

function MainEvent(){
    $("main").click(function(){
        //Zatvaranje dodatnih linkova
        var menWomen=[]
        menWomen[0] = document.getElementById("aditionalMen")
        menWomen[1]=document.getElementById("aditionalWomen")
        menWomen.forEach(element => {
            element.classList.add("d-none")
            element.removeAttribute("watch");
            
        });
        //Zatvaranje korpe
        $("#vecaKorpa").addClass("d-none");

    })
}


//#region STRANICA PROIZVODI



function WriteCategories(niz,idDiv){
    let div = document.querySelector(idDiv)
    let html=""
    niz.forEach(element => {
    html+=` <div class="form-check">
                    <input class="form-check-input check" type="checkbox" value="${element.id}" id="${element.naziv}" checked/>
                    <label class="form-check-label" for="${element.naziv}">
                        ${element.naziv}
                    </label>
                </div>`
            });
    div.innerHTML+=html
}



function WriteBrends(niz,idDiv){
    let div = document.querySelector(idDiv)
    let html=""
    niz.forEach(element => {
    html+=`   <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="${element.naziv}" id="${element.naziv}" value="${element.id}" checked/>
                    <label class="form-check-label" for="${element.naziv}">${element.naziv}</label>
                </div>`
            });
    div.innerHTML+=html

}



//F-JA ZA ISPISIVANNJE SVIH PROIZVODA NA STRANI PROIZVODI.PHP
var prvoUcitavanje =true;   // pomocna promenljiva - opisuje da li je stranica tek ucitana ili se proizvodi ispuju po jos neki put od kako je ucitana stranica proizvodi.php


function WriteAll(niz){
    niz.forEach(element => {
        element.kolicina=1;
    });
    SetLocalStorage("filtriraniNiz",niz)
    let div = document.querySelector("#divZaProizvode");
    let html=""
    niz.forEach(element => {
        html+=`
        <div id="${element.id}" class="col-12 col-sm-6 col-lg-4 p-3 kartica kartice-${element.pol}">
            <div class="relative d-flex justify-content-center mb-3 w-100"><img src="${element.slika}" class="img-fluid kartice-hover" alt="${element.naziv}"/>
                <div class="col-12 p-2 divKorpeKartice"><button id="btn${element.id}" onclick="AddToChartEvent('${element.id}')" class="btn dugmeKorpeKartice"><i class="fas fa-cart-arrow-down text-white"></i></button></div>
            </div>
            <div class="d-flex justify-content-between"><span class="respon-font-13" id="spanKartica${element.id}" > </span></div>
            <div class="d-flex justify-content-between"><h4 class="respon-font-14">${element.naziv}</h4></div>
            <div><span>${IspisOcene(element.ocena)}</span></div>
            <div class="d-flex justify-content-between"><span class="text-decoration-line-through"> ${element.cena.staraCena.length<2 ? "" :element.cena.staraCena + "RSD"}</span><span class="fw-bolder">${element.cena.aktuelnaCena} RSD</span></div>
        </div>
        `
    });
    if(html.length==0){
        html=` <div class="col-12 mt-5">
                    <div class="alert alert-danger offset-lg-1 col-lg-8 offset-1 col-10">Nazalost nemamo trazene proizvode.</div>
                </div>`
    }
    div.innerHTML=html

    niz.forEach(element => {

            AjaxCallBack("kategories.json",HendlerError,function(result){IspisKategorije(result,element,"spanKartica"+element.id)},false)
            AjaxCallBack("brends.json",HendlerError,function(result){IspisBrenda(result,element,"spanKartica"+element.id)},false)
        
    });
    
    if(prvoUcitavanje){
        prvoUcitavanje = false;
        filtrianjePoUcitavanjuStrane();
    }

    KolicinaPrikazanihProizvoda(niz.length); // Upisivanje koliko je prikazano proizvoda zbog filtriranja
}   

function KolicinaPrikazanihProizvoda(number){
    $("#kolicinaPrikazanihProizvoda").text(number);

}
// FILTRIRANJE

function PrimeniFiltere(){
    var niz;
    niz=GetLocalStorage("sviProizvodi")
    niz = FilterSezona(niz); 
    niz = FilterPol(niz)
    niz = FilterPopust(niz)
    niz = FilterKategorija(niz)
    niz = FilterBrendova(niz)
    niz = FilterCena(niz);
    WriteAll(niz)
    SetLocalStorage("filtriraniNiz",niz)
    
    if(niz.lenght==0){
        var write= `
        <div class="alert alert-danger" role="alert">
            Nazalost trenutno nemamo trazene proizvode.
        </div>`
        document.querySelector("#divZaProizvode").innerHTML=write
    }


}


function FilterSezona(niz){
    var kriterijum = Array.from(document.querySelectorAll('#odaberiteSezonu [type=checkbox]'))
    var niz2=[]

    kriterijum=kriterijum.filter(x=>x.checked==true)
    
    for(let  i = 0;i<kriterijum.length ;i++){

        niz.forEach(element => {

            if(element.sezona.naziv===kriterijum[i].value){
                niz2.push(element)
            }
        });

    };
    return niz2;

 }

 function FilterPol(niz){

    var kriterijum= Array.from(document.querySelectorAll("#odaberitePol [type=checkbox]"))
    var niz2=[];

    kriterijum=kriterijum.filter( x  => x.checked == true)

    for(let  i = 0;i<kriterijum.length ;i++){

        niz.forEach(element => {

            if(element.pol===kriterijum[i].value){
                niz2.push(element)
            }
        });

    };
    return niz2;

 }

 function FilterPopust(niz){

    var kriterijum= Array.from(document.querySelectorAll("#odaberitePopust [type=radio]"))
    var niz2=[];

    kriterijum=kriterijum.filter( x  => x.checked === true)
    if(kriterijum[0].value=="da"){

        niz.forEach(element => {

            if(typeof element.cena.staraCena=="number"){
                niz2.push(element)
            }
        });
    }
    else if(kriterijum[0].value=="oba"){
        niz2=niz
    }
    else if(kriterijum[0].value=="ne"){
        niz.forEach(element => {

            if(element.cena.staraCena.length<2){
                niz2.push(element)
            }
        });
    }
    return niz2;
 }

function FilterKategorija(niz){
    var kriterijum= Array.from(document.querySelectorAll("#odaberiteKategorije [type=checkbox]"))
    var niz2=[];

    kriterijum=kriterijum.filter( x  => x.checked === true)

    for(let  i = 0;i<kriterijum.length ;i++){

        niz.forEach(element => {
            let x = element.kategorijaId.filter(x => x == kriterijum[i].value);
            if(x.length>0){
                let y = niz2.filter(x=> x.id == element.id)
                if(y.length == 0){
                    niz2.push(element)
                }
            }

        });

    };
    return niz2;


}

 function FilterBrendova(niz){
    var kriterijum= Array.from(document.querySelectorAll("#odaberiteBrendove [type=checkbox]"))
    var niz2=[];

    kriterijum=kriterijum.filter( x  => x.checked == true)
 
    for(let  i = 0;i<kriterijum.length ;i++){
        niz.forEach(element => {

            if(element.brendId==kriterijum[i].value){


                niz2.push(element)
            }
        });

    };
    return niz2;
}

 function FilterCena(niz){
     
    var kriterijum = document.querySelector("#odabranaCena");
    var niz2=[];
        niz.forEach(element => {

            if(element.cena.aktuelnaCena<parseInt(kriterijum.innerHTML)){
                niz2.push(element)
            }
        });

    
    return niz2;
}

// SORTIRANJE

function sortiranje(id){
    let niz= GetLocalStorage("filtriraniNiz") ;
    
    let lista = $("#"+id);
    
    let vrednost = lista.val();



    if(vrednost==1){ // RASTUCI PO CENI
        niz.sort(function(el1,el2){
            if(el1.cena.aktuelnaCena>el2.cena.aktuelnaCena){
                return 1;
            }
            else if(el1.cena.aktuelnaCena<el2.cena.aktuelnaCena){
                return -1;
            }
            else{
                return 0;
            }

        })
    }
    else if(vrednost==2){ // OPADAJUCI PO CENI
        niz.sort(function(el1,el2){
            if(el1.cena.aktuelnaCena<el2.cena.aktuelnaCena){
                return 1;
            }
            else if(el1.cena.aktuelnaCena>el2.cena.aktuelnaCena){
                return -1;
            }
            else{
                return 0;
            }

        })
    }
    else if(vrednost==3){// RASTUCI PO OCENI
        niz.sort(function(el1,el2){
            if(el1.ocena>el2.ocena){
                return 1;
            }
            else if(el1.ocena<el2.ocena){
                return -1;
            }
            else{
                return 0;
            }

        })
    }
    else if(vrednost==4){ // OPADAJUCI PO OCENI
        niz.sort(function(el1,el2){
            if(el1.ocena<el2.ocena){
                return 1;
            }
            else if(el1.ocena>el2.ocena){
                return -1;
            }
            else{
                return 0;
            }

        })
    }
    else if(vrednost==5){ //RASTUCI PO NAZIVU
        niz.sort(function(el1,el2){
            if(el1.naziv.toUpperCase()>el2.naziv.toUpperCase()){
                return 1;
            }
            else if(el1.naziv.toUpperCase()<el2.naziv.toUpperCase()){
                return -1;
            }
            else{
                return 0;
            }

        })
    }
    else if(vrednost==6){ //OPADAJUCI PO NAZIVU
        niz.sort(function(el1,el2){
            if(el1.naziv.toUpperCase()<el2.naziv.toUpperCase()){
                return 1;
            }
            else if(el1.naziv.toUpperCase()>el2.naziv.toUpperCase()){
                return -1;
            }
            else{
                return 0;
            }

        })
    }
    WriteAll(niz)
}

// PRETRAGA
function pretrazi(id){
    let vrednost = $("#"+id).val();
    let niz= GetLocalStorage("sviProizvodi")
    let niz2=[]
    niz.forEach(element => {
        if(element.naziv.toUpperCase().indexOf(vrednost.toUpperCase())!=-1){
            niz2.push(element)
        }
    });
    WriteAll(niz2)
}

//#region STRANICA KORPA.PHP
    
//DINAMICKO ISPISIVANJE TABELE SA ARTIKLIMA
function IspisTabele(niz,id){
    let html=``;
    if(niz.length>0){

        html+=`
            <div id="tabela">
                <table class="table table-striped table-hover respon-font-14">
                    <thead>
                        <tr class="respon-font-13">
                            <td>#</td>
                            <td>Naziv Prozivoda</td>
                            <td>Proizvod</td>
                            <td>Pocetna Cena</td>
                            <td>Trenutna Cena</td>
                            <td>Kolicina</td>
                            <td>Ukupan iznos</td>
                            <td>Ukloni</td>
                        </tr>
                    </thead>
                    <tbody>`
        for(let i=0;i<niz.length;i++){
            html+=`
            <tr id="${niz[i].id}" class="respon-font-13">
                <td>${i+1}</td>
                <td>${niz[i].naziv}</td>
                <td><img src="${niz[i].slika}" alt="${niz[i].naziv}" class="col-12 col-lg-8 col-md-10"/></td>`
                if(niz[i].cena.staraCena){
                    html+=`<td><del>${niz[i].cena.staraCena}</del> Rsd</td>`
                }
                else{
                    html+=`<td>${niz[i].cena.aktuelnaCena}Rsd</td>`
                }
                html+=`<td><b>${niz[i].cena.aktuelnaCena} Rsd</b></td>
                <td>
                    <div>
                        <div class="manje" onclick="PovecanjeKolicineTabele(${niz[i].id})"><i class="fas fa-caret-up respon-font-14"></i></div><span> ${niz[i].kolicina} </span> <div class="vise" onclick="SmanjenjeKolicineTabele(${niz[i].id})"><i class="fas fa-caret-down respon-font-14"></i></div>
                    </div>
                </td> 
                <td id="celokupnaCena${niz[i].id}">${niz[i].cena.aktuelnaCena * niz[i].kolicina}</td>
                <td><button class="btn btn-danger" onclick="RemoveFromTable(${niz[i].id})">Ukloni</button></td>
            </tr>
            `
        };
        html+=`</tbody>
            </table>
            </div>
                <div class="d-flex justify-content-end"><button class="btn-light" onclick="OcistiKorpu()">Ocisti korpu</button></div>
                
                <div id="propertiesChart" class="mb-5 px-1">
                <div>
                    <p class="mb-1">Odaberite kurirsku sluzbu</p>
                    <div class="form-check form-check-inline mb-2">
                        <input class="form-check-input" type="radio" name="posta" id="bex" onchange="IspisUkupneCene('ukupnaCenaNarudzbe')" value="450" checked/>
                        <label class="form-check-label" for="bex">BEX(450 din)</label>
                    </div>
                    <div class="form-check form-check-inline mb-2">
                        <input class="form-check-input" type="radio" name="posta" onchange="IspisUkupneCene('ukupnaCenaNarudzbe')" id="dhl" value="1280"/>
                        <label class="form-check-label" for="dhl">DHL(1280 din)</label>
                    </div>
                </div>
                <div class="col-12 mb-2">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" onchange="IspisUkupneCene('ukupnaCenaNarudzbe')" id="hitno" value="1.1">
                            <label class="form-check-label" for="hitno">
                                Hitna isporuka (10%)
                            </label>
                        </div>
                    </div>
                <div>
                    <span>Ukupna cena je:</span><span id="ukupnaCenaNarudzbe"></span>
                    
                </div>
            </div>
            <div id="forma" class="px-1">
                <form class="row g-3">
                    <div class="col-12 col-md-5">
                        <label for="imePrezime" class="form-label">Ime i prezime <i class="fas fa-asterisk"></i></label>
                        <input type="text" class="form-control" id="imePrezime" onblur="autoPopunjavanje()"/>
                        <p class="text-danger"></p>

                    </div>
                    <div class="col-12 col-md-5 offset-md-2">
                        <label for="email" class="form-label">E-adresa<i class="fas fa-asterisk"></i></label>
                        <input type="email" class="form-control" id="email" placeholder="Npr: markodasic**@gmail.com">
                        <p class="text-danger"></p>

                    </div>
                    <div class="col-12">
                        <label for="brojiTelefona" class="form-label">Broji telefona <i class="fas fa-asterisk"></i></label>
                        <input type="text" class="form-control" id="brojiTelefona" placeholder="Npr: +381 61 1111 111"/>
                        <p class="text-danger"></p>

                    </div>
                    <div class="col-12 col-md-5">
                        <label for="grad" class="form-label"> <i class="fas fa-asterisk"></i></label>
                        <select id="grad" class="form-select">
                            <option value="0"selected>Odaberite grad <i class="fas fa-asterisk"></i> </option>
                            <option value="bg">Beograd</option>
                            <option value="ns">Novi Sad</option>
                            <option value="nis">Nis</option>
                        </select>
                        <p class="text-danger"></p>

                    </div>
                    <div class="col-6 col-md-3 offset-md-1">
                        <label for="opstina" class="form-label">Opstina <i class="fas fa-asterisk"></i></label>
                            <input type="text" class="form-control" id="opstina" placeholder="Npr: Stari Grad"/>
                        <p class="text-danger"></p>

                    </div>
                    <div class="col-5 col-md-2 offset-1">
                        <label for="zip" class="form-label">Zip <i class="fas fa-asterisk"></i></label>
                        <input type="text" class="form-control" id="zip" placeholder="Npr: 11892"/>
                        <p class="text-danger"></p>

                    </div>
                    <div class="col-12">
                        <label for="adresa" class="form-label">Adresa<i class="fas fa-asterisk"></i></label>
                        <input type="text" class="form-control" id="adresa" placeholder="Npr: Knez Mihailova 15a"/>
                        <p class="text-danger"></p>
                    </div>
                    <div class="col-12">
                        <p>Uslovi koriscenja:</p>
                        <p>Svi vasi uneti podaci ostaju na sajtu i njima ne moze pristupiti trece lice. Kupac ima rok od 14 dana da prijavi da je roba, koja mu je isporucena, ostecena. Sve posle tog rok se smatra ne validnim.</p>
                        <p>Povracaj novca se vrsi samo u gore pomenutoj situaciji. Kupac je duzan da po prijemu robe potpise priznanicu da je robu primio.</p>
                    </div>
                    <div class="col-12">
                        <div class="form-check">
                            <p class="text-danger"></p>
                            <input class="form-check-input" type="checkbox" id="uslovi" value="on">
                            <label class="form-check-label" for="uslovi">
                                Prihvatam uslove<i class="fas fa-asterisk"></i>
                            </label>
                        </div>
                    </div>
                    <div class="col-12">
                        <button type="button" onclick="provera()" class="btn btn-primary">Naruci</button>
                    </div>
                </form>

            </div>`
    }
    else{
        html+=`
        <div class="alert alert-secondary" role="alert">
             Vasa korpa je prazna!
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        `
    }
    $("#"+id).html(html)
    IspisUkupneCene("ukupnaCenaNarudzbe");
}


//Pritiskom na strelicu povecava se kolicina zadatog proizvod u korpi

function PovecanjeKolicineTabele(id){
    let niz = GetLocalStorage("productsInChart")
    let el
    niz.forEach(element => {
        if(element.id==id && element.kolicina<10){
            element.kolicina++;
            el=element
            $(`#${id} .vise`).prev().html(el.kolicina)
            $("#celokupnaCena"+id).text(el.kolicina * el.cena.aktuelnaCena);
        }
    });
    SetLocalStorage('productsInChart',niz);
    IspisUkupneCene("ukupnaCenaNarudzbe");
    

}

//Pritiskom na strelicu smanju je kolicina zadatog proizvod u korpi
function SmanjenjeKolicineTabele(id){
    let niz = GetLocalStorage("productsInChart")
    let el
    niz.forEach(element => {
        if(element.id==id && element.kolicina>1){
            element.kolicina--;
            el=element
            $(`#${id} .manje`).next().html(el.kolicina)
            $("#celokupnaCena"+id).text(el.kolicina * el.cena.aktuelnaCena);
        }
    });
    SetLocalStorage('productsInChart',niz);
    IspisUkupneCene("ukupnaCenaNarudzbe");

    
}

//Pritiskom na dugme brise se jedan red u tabeli
function RemoveFromTable(id){
    let div = $("#"+id);
    let niz = GetLocalStorage('productsInChart')

    niz = niz.filter(x=> x.id != id)
    numberProductsInChart--;
    UkupanBrojiArtikalaUKorpi(numberProductsInChart);
    SetLocalStorage("productsInChart",niz)
    SetLocalStorage("numberProductsInChart",numberProductsInChart)
    IspisTabele(niz,'tableChart')

    IspisUkupneCene("ukupnaCenaNarudzbe");



}

//Pritiskom na dugme brise se sav sadrzaj korpe
function OcistiKorpu(){
    let niz = []
    numberProductsInChart=0
    SetLocalStorage("productsInChart",niz)
    UkupanBrojiArtikalaUKorpi(numberProductsInChart);
    SetLocalStorage("numberProductsInChart",numberProductsInChart)
    IspisTabele(niz,'tableChart')
}

//Ispisivanje ukupne cene za sve stavke u korpi
function IspisUkupneCene(id){
    let niz = GetLocalStorage("productsInChart");
    if(niz.length!=0){
        let br=0;
        niz.forEach(element => {
            br+=Number(element.cena.aktuelnaCena * element.kolicina);
        });
        if(document.querySelector("#bex").checked==true){

            br+=Number($("#bex").val());

        }
        if(document.querySelector("#dhl").checked==true){
            br+=Number($("#dhl").val());
        }
        if(document.querySelector("#hitno").checked==true){
            br*=Number($("#hitno").val());
        }

        br=Math.round(br)
        $("#"+id).text(br)
    }
}

//Provera unetih podataka u formu
function provera(){
    var regImeOpstina, regEmail, regAdresa, regZip, regTelefon
        regImeOpstina = new RegExp("^\s*([A-Za-z]{1,}([\.,] |[-']| ))*[A-Za-z]+\.?\s*$")
        regEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$");
        regAdresa = new RegExp("^\s*([A-Za-z0-9._-]{1,}([\.,] |[-']| ))+[A-Za-z0-9]+\.?\s*$")
        regZip = new RegExp("^[0-9]{3,7}$")
        regTelefon = new RegExp("^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$")
    let x=1
    if(!regImeOpstina.test($("#imePrezime").val())){
        x=0
        $("#imePrezime").next().text("Niste uneli ispravno napisano ime ili prezime, nisu dozvoljeni sprecijalni karakteri ?*/+\=")
    }
    else{
        $("#imePrezime").prev().text("")
    }
    if(!regImeOpstina.test($("#opstina").val())){
        x=0
        $("#opstina").next().text("Niste uneli ispravno naziv opstine, nisu dozvoljeni sprecijalni karakteri ?*/+=")
        
    }
    else{
        $("#opstina").prev().text("")
    }
    if(!regEmail.test($("#email").val())){
        x=0
        $("#email").next().text("Email adresa mora biti u formatu: naprimer@gmail.com")
        
    }
    else{
        $("#email").prev().text("")
    }
    if(!regAdresa.test($("#adresa").val())){
        x=0
        $("#adresa").next().text("Niste uneli ispravan naziv adrese, nisu dozvoljeni sprecijalni karakteri ?*/+=")
    }
    else{
        $("#adresa").prev().text("")
    }
    if(!regZip.test($("#zip").val())){
        x=0
        $("#zip").next().text("Niste uneli postanski broji ispravno! (Npr: 11235)")

    }
    else{
        $("#zip").prev().text("")
    }
    if(!regTelefon.test($("#brojiTelefona").val())){
        x=0
        $("#brojiTelefona").next().text("Niste uneli broji telefona u ispravnom formatu (Npr: +381 611354535)")

    }
    else{
        $("#brojiTelefona").prev().text("")
    }
    if($("#grad").val()==0){
        x=0
        $("#grad").next().text("Morate izbarti grad!")

    }
    else{
        $("#grad").prev().text("")
    }
    if(!document.querySelector("#uslovi").checked){
        x=0
        $("#uslovi").prev().text("Da biste porucili morate se slagati sa uslovima koriscenja!")
    }
    else{
        $("#uslovi").prev().text("")
    }
    if(x==1){
        PrikazModala("Hvala na kupovini",true);
        let obj = {
            "email":$("#email").val(),
            "telefon":$("#brojiTelefona").val(),
            "grad":$("#grad").val(),
            "opstina":$("#opstina").val(),
            "zip":$("#zip").val(),
            "adresa":$("#adresa").val(),
        }
        SetLocalStorage("productsInChart",[]);
        SetLocalStorage($("#imePrezime").val(),obj)
        UkupanBrojiArtikalaUKorpi(0)
        SetLocalStorage("numberProductsInChart",0);
    }
}
function autoPopunjavanje(){
    
    let txt = GetLocalStorage($("#imePrezime").val());
    if(txt){
        $("#email").val(txt.email);
        $("#email").css("background-color","rgb(232, 240, 254)")
        $("#brojiTelefona").val(txt.telefon);
        $("#brojiTelefona").css("background-color","rgb(232, 240, 254)")
        $("#grad").val(txt.grad);
        $("#grad").css("background-color","rgb(232, 240, 254)")
        $("#opstina").val(txt.opstina)
        $("#opstina").css("background-color","rgb(232, 240, 254)")
        $("#zip").val(txt.zip)
        $("#zip").css("background-color","rgb(232, 240, 254)")
        $("#adresa").val(txt.adresa)
        $("#adresa").css("background-color","rgb(232, 240, 254)")
    }
}

function PrikazModala(txt,redirect){
    $("#modal p").text(txt)
    $("#modal").fadeIn("slow");
    $("main").css({"background-color": "#c2c2c2","opacity": "20%"})
    setTimeout(function(){
            $("#modal").fadeOut("slow")
            $("main").css({"background-color": "transparent","opacity": "100%"})
            if(redirect){
                window.location.href = "index.php";
            }
    },3000);


}



//#endregion



















//#endregion
