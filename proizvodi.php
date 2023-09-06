<!DOCTYPE html>
<html>
    <head>

    
        <?php 
        $keywords="zima, leto, muskarci, zene, deca, duks, jakna, majca";
        
        $title="OKTAGON - Proizvodi"; ?>

        <?php include("head.php")?>

    </head>
    <body>
        <?php include("header.php")?>


    <main class="py-2">
    <section>
        <img src="assets/img/about-us-page-heading.jpg" class="w-100" alt="Slika izloga prodavnice oktagon"/>
        <h1 class="text-center my-3">Proizvodi:</h1>
    </section>
    <section class="d-lg-flex mb-5">
        <div id="pretraga" class="d-flex offset-lg-3 col-8 col-lg-4 mt-4">
            <input class="form-control w-75 mx-auto" type="text"  id="pretrazi" onkeyup="pretrazi('pretrazi')"  placeholder="Pretrazite sve artikle po nazivu"/>
        </div>
        <div id="sortiranje" class="d-flex col-12 offset-lg-1 col-lg-4 mt-4">
            <select id="sort" onchange="sortiranje('sort')" class="w-50 mx-auto" >
                <option value = "0">Sortirajte po:</option>
                <option value = "1">Ceni - rastuce</option>
                <option value="2">Ceni - opadajuce</option>
                <option value="3">Oceni - rastuce</option>
                <option value="4">Oceni - opadajuce</option>
                <option value="5">Nazivu A-Z</option>
                <option value="6">Nazivu Z-A</option>
            </select>
        </div>
    </section>
    <div class="my-4 px-2">Kolicina prikazanih proizvoda: <span id="kolicinaPrikazanihProizvoda">-</span></div>
    <section class="d-lg-flex ">
        <div id="ikonicaZaFiltriranje" class="mb-4"><i class="fas fa-filter"></i><p class="mb-0 respon-font-14">Filtriraj</p></div>
        <div id="divZaFiltriranje" class="col-12 col-lg-4">
            <div  class="mx-2 pb-5">
                <button id="filtrirajDugme" onclick="PrimeniFiltere()">Filtriraj</button>
            </div>
            <div id="odaberitePol"  class="mx-2 pb-3">
                <h3>Odaberite Pol:</h3>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="m" value="m" checked/>
                    <label class="form-check-label" for="m">Muskarci</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="z" value="z" checked/>
                    <label class="form-check-label" for="z">Zene</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="k" value="k" checked/>
                    <label class="form-check-label" for="k">Deca</label>
                </div>
            </div>
            <div id="odaberiteSezonu"  class="mx-2 pb-3">
                <h3>Odaberite Sezonu:</h3>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="zima" value="zima" checked/>
                    <label class="form-check-label" for="zima">Zima</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="leto" value="leto" checked/>
                    <label class="form-check-label" for="leto">Leto</label>
                </div>
                
            </div>
            <div id="odaberitePopust" class="mx-2 pb-3">
                <h3>Odaberite Popust:</h3>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="popust" id="saPopsutom" value="da"/>
                    <label class="form-check-label" for="saPopustom">Na popustu</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="popust" id="bezPopusta" value="ne"/>
                    <label class="form-check-label" for="bezPopusta">Bez popusta</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="popust" id="oba" value="oba" checked/>
                    <label class="form-check-label" for="oba">Oba</label>
                </div>
            </div>
            <div id="odaberiteKategorije" class="mx-2 pb-3">
                <h3>Odaberite Kategorije:</h3>
                <!--DINAMICKI ISPIS CHECKBOX-OVA ZA KATEGORIJE-->

            </div>
            <div id="odaberiteBrendove" class="mx-2 pb-3">
                <h3>Odaberite Brendove:</h3>
                <!--DINAMICKI ISPIS CHECKBOX-OVA ZA BRENDOVAE-->
            </div>
            <div id="odaberiteCenu" class="mx-2 pb-5">
                <input type="range" id="range" value="100" class="w-75" onchange="document.querySelector('#odabranaCena').innerHTML=document.querySelector('#range').value*200">            
                <div><span>0 - </span><span id="odabranaCena">20000</span></div>
            </div>
        </div>
        <div id="divZaProizvode" class="col-12 col-lg-8 d-flex flex-wrap"></div>
    </section>



    </main>

        <?php include ("footer.php")?>
<?php 
    # PHP KOD KOJIM SE FILTRITAJU PROIZVODI U ZAVINOSTI NA KOJI LINK JE KORISNIK KLIKNUO
    echo ("<script>
        function filtrianjePoUcitavanjuStrane(){
    ");
    $link =  basename($_SERVER['PHP_SELF']);
    
    if($link != "proizvodi.php"){
        try{
            $filter1 = $_GET["filter"];
            $vrednost1 = $_GET["vrednost"];

            $filter2 = $_GET["filter2"];
            $vrednost2= $_GET["vrednost2"];
        }catch(Exception $ex){
            $filter1 = null;
            $vrednost1 = null;

            $filter2 = null;
            $vrednost2= null;
        }
        

        if($filter1){
            echo ("

            
            var filter1='#'+ $filter1.getAttribute('id')
            var vrednost1 = '$vrednost1', kriterijum = Array.from(document.querySelectorAll(filter1+' [type=checkbox]'));
            kriterijum.forEach(element => {
                element.checked=false;     
                if(element.value == vrednost1){
                    element.checked=true;

                }

            })

                ");
        if($filter2!='null'){
                echo ("
                var filter2='#'+ $filter2.getAttribute('id')
                var vrednost2 = $vrednost2, kriterijum = Array.from(document.querySelectorAll(filter2+' [type=checkbox]'));
                kriterijum.forEach(element => {
                    element.checked=false;     
                if(element.value == vrednost2.value){
                    element.checked=true;
        
                    }
        
                });
                    ");
            }
        }
    }
    echo ("
        setTimeout(function(){
            PrimeniFiltere();
        },350)
        } </script>")
    
?>
    </body>
</html>