<!DOCTYPE html>
<html>
    <head>
        
        <?php
            $keywords="povoljna garderoba, muskarci, zene, jakne, majce,duksevi";
            $title="OKTAGON - pocetna";
            include("head.php");
        ?>
    </head>
    <body id="bootstrap-overrides">
        <?php include("header.php");?>

        <main class="py-2">

        <section id="side">
            <ul id="soc">
                <li><a href="https://www.instagram.com/?hl=en"><i class="fab fa-instagram-square text-danger"></i></a></li>
                <li><a href="https://www.facebook.com/"><i class="fab fa-facebook-square text-primary text-info"></i></a></li>
                <li><a href="https://twitter.com/?lang=en"><i class="fab fa-twitter-square text-info"></i></a></li>
            </ul>
        </section>


        <section id="welcome" class="px-2 mt-5 d-flex pb-5 responsiveD-block">
            <article id="welcomeFirstArticle"class="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                <div id="dummy"></div>
               
                <div id="dummy2" class="d-flex  align-items-center justify-content-center">
                    <div>
                        <div class="d-flex align-items-center"><h1>Mi smo OKTAGON</h1></div>
                        <div class="d-flex align-items-center"><h3>Stil i Elegancija</h3></div>
                        <div class="d-flex align-items-center">
                            <a href="proizvodi.php">Pocni kupovinu!</a>
                        </div>
                    </div>
                </div>
            </article>
            <article id="welcomeSecondArticle" class="col-12 col-lg-5 mx-auto">
                <div class="d-flex w-100">
                    <div id="welcomeWomen" class="col-12 col-sm-5 col-lg-6 d-flex align-items-center justify-content-center welcomeContent">
                        <div id="welcomeWomenFirstDiv">
                            <h2 class="text-center respon-font-14">Zene</h2>
                            <h4 class="text-center respon-font-13">Najbolja odeca za zene</h4>
                        </div>
                        <div id="welcomeWomenSecondDiv" class="d-flex w-100 align-items-center justify-content-center d-none">
                            <h2 class="text-center">Zene</h2>
                            <p class="text-center">Pogledajte nasu kolekciju za zene</p>
                            <div class="d-flex justify-content-center"><a href="proizvodi.php?filter=odaberitePol&vrednost=z&filter2=null&vrednost2=null" class="text-light p-2 border-light text-center">Pogledaj proizvode</a></div>
                        </div>
                    </div>
                    <div id="welcomeMen" class="col-12 col-sm-5 offset-sm-2 offset-lg-0  col-lg-6 d-flex align-items-center justify-content-center welcomeContent relative">
                        <div id="welcomeMenFirstDiv" class="">
                            <h2 class="text-center respon-font-14">Muskarci</h2>
                            <h4 class="text-center respon-font-13">Najbolja odeca za muskarce</h4>
                        </div>
                        <div id="welcomeMenSecondDiv" class="d-flex w-100 align-items-center justify-content-center d-none">
                            <h2 class="text-center">Muskarci</h2>
                            <p class="text-center">Pogledajte nasu kolekciju  za Muskarce</p>
                            <div class="d-flex justify-content-center"><a href="proizvodi.php?filter=odaberitePol&vrednost=m&filter2=null&vrednost2=null" class="text-light p-2 border-light text-center">Pogledaj proizvode</a></div>
                        </div>
                    </div>
                </div>
                <div class="d-flex">
                    <div id="welcomeKids"  class="col-12 col-sm-5  col-lg-6 d-flex align-items-center justify-content-center welcomeContent relative">
                        <div id="welcomeKidsFirstDiv" class=" text-center">
                            <h2 class="respon-font-14">Deca</h2>
                            <h4 class="respon-font-13">Najbolja odeca za Decu</h4>
                        </div>
                        <div id="welcomeKidsSecondDiv" class="d-flex text-center w-100 align-items-center justify-content-center d-none">
                            <h2>Deca</h2>
                            <p>Nasu najnovija kolekcija za decu</p>
                            <div class="d-flex justify-content-center"><a href="proizvodi.php?filter=odaberitePol&vrednost=k&filter2=null&vrednost2=null" class="text-light p-2 border-light text-center">Pogledaj proizvode</a></div>
                        </div>
                    </div>
                    
                    <div id="welcomeAccessories" class="col-12 col-sm-5 offset-sm-2 offset-lg-0 col-lg-6 d-flex align-items-center justify-content-center welcomeContent relative">
                        <div id="welcomeAccessoriesFirstDiv" class=" text-center">
                            <h2 class="respon-font-14">Svi Proizvodi</h2>
                            <h4 class="respon-font-14">Najbolja garderoba</h4>
                        </div>
                        <div id="welcomeAccessoriesSecondDiv"  class="d-flex text-center w-100 align-items-center justify-content-center d-none">
                            <h2>Svi Proizvodi</h2>
                            <p>Najbolja garderoba</p>
                            <div class="d-flex justify-content-center"><a href="proizvodi.php" class="text-light p-2 border-light text-center">Pogledaj proizvode</a></div>
                        </div>
                    </div>
                </div>

            </article>
            
        </section>

        <!--SLAJDERI-->
        <div class="Dotted p-1 my-5"/></div>
        <section id="SlajderMen" class="container-lg pt-4">
           <div class="row">
                <div class="col-12 col-sm-11 offset-sm-1">
                    <h3 class="respon-font-13">Muskar kolekcija - najprodavanije</h3>
                    <p class="respon-font-12">Ovo su delovi muske kolekcije koji su najprodavaniji</p>
                </div>
            </div>         
        </section>

        <div class="Dotted p-1 my-5"/></div>
        <section id="SlajderWomen" class="container-lg pt-4">
            <div class="row">
                 <div class="col-12 col-sm-11 offset-sm-1">
                     <h3 class="respon-font-13">Zenska kolekcija - najprodavanije</h3>
                     <p class="respon-font-12">Ovo su delovi zenkse kolekcije koji su najprodavaniji</p>
                 </div>
             </div>
        </section>

        <div class="Dotted p-1 my-5"/></div>
        <section id="SlajderKids" class="container-lg pt-4">
            <div class="row">
                 <div class="col-12 col-sm-11 offset-sm-1">
                     <h3 class="respon-font-13">Decija kolekcija - najprodavanije</h3>
                     <p class="respon-font-12">Ovo su delovi decije kolekcije koji su najprodavaniji</p>
                 </div>
             </div>
        </section>

        <div class="Dotted p-1 my-5"/></div>
        <!--O NAMA-->

        <section class="pt-5">
            <div class="container mt-5 px-3">
                <div class="row">
                    <div class="col-12 col-lg-6 mb-5" id="donjaSekcijaIndex">
                        <h4>Pronadji svoji stil</h4>
                        <p>Ukoliko trazite nesto sto ce obnoviti vas stil ili ukoliko ga zelite u potpunosti obnoviti na pravom ste mestu</p>
                        <p>Nazi proizvodi poticu od najpoznatijih svetskih brendova</p>
                        <p>Kod nas mozete pronaci sve sto vam je potrebno. Od kaputa jakni, dzempera, dukseva pa sve do haljina tuniki, kosulja i naocara za sunce</p>
                        <p>Nasi dostavljaci rade svakog dana, ukljucujuci i vikend, dostava se vrsi u roku od jednog do dva dana. Pogledajte zadnju rec mode!</p>
                        <span class="d-flex justify-content-center"><a href="proizvodi.php" class="text-center">Pogledajte!</a></span>
                    </div>
                    <div class="col-12 col-lg-6 mb-5">
                        <div class="col-12 d-flex">
                            <div ><img src="assets/img/team-member-01.jpg" class="img-fluid" alt="Markirana garderoba najpoznatijih brendova"/></div>
                            <div class="col-6 d-flex align-items-center justify-content-center bg-light">
                                <div>
                                    <h5 class="respon-font-13">Markirana Odeca</h5>
                                    <p class="respon-font-12">Najpoznatijih brendova</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 d-flex">
                            <div class="col-6 d-flex align-items-center justify-content-center bg-light">
                                <div>
                                    <h5 class="respon-font-13 text-center">Kvalitet</h5>
                                    <p class="respon-font-12 text-center">Poznati po kvalitetu</p>
                                </div>
                            </div>
                            <div class="col-6"><img src="assets/img/team-member-02.jpg" class="img-fluid" alt="Najkvalitetnija garderoba"/></div>
                        </div>                        
                    </div>
                </div>

            </div>

        </section>


        <div class="Dotted p-1 my-5"/></div>

        <!--DRUSTVENE MREZE-->
        <section class="pt-5" id="povezimoSe">
            <div class="row">
                <div class="col-12 col-sm-11 offset-sm-1">
                    <h3 class="px-2 respon-font-13">Povezimo se - ne odvajaj se</h3>
                    <p class="px-2 respon-font-12">Zaprati nas na drustvenim mrezama kako bi uvek bio obavesten o novim proizvodima</p>
                </div>
            </div>
            <div class="container-lg px-5">
                <div class="row" id="instagram">
                    <div class="col-4 col-lg-2 m-0">
                        <img src="assets/img/instagram-01.jpg" class="img-fluid" alt="instagram objava Oktagon Shop"/>
                    </div>
                    <div class="col-4 col-lg-2 m-0">
                        <img src="assets/img/instagram-02.jpg" class="img-fluid" alt="instagram objava Oktagon Shop"/>

                    </div>
                    <div class="col-4 col-lg-2">
                        <img src="assets/img/instagram-03.jpg" class="img-fluid" alt="instagram objava Oktagon Shop"/>

                    </div>
                    <div class="col-4 col-lg-2">
                        <img src="assets/img/instagram-04.jpg" class="img-fluid" alt="instagram objava Oktagon Shop"/>
                    </div>
                    <div class="col-4 col-lg-2">
                        <img src="assets/img/instagram-05.jpg" class="img-fluid" alt="instagram objava Oktagon Shop"/>

                    </div>
                    <div class="col-4 col-lg-2">
                        <img src="assets/img/instagram-06.jpg" class="img-fluid" alt="instagram objava Oktagon Shop"/>

                    </div>
                </div>
                <h4 class="text-center mt-3"><a href="https://www.instagram.com/?hl=en" class="text-danger text-decoration-underline">Zaprati nas!</a></h4>
            </div>

        </section>

        <div class="Dotted p-1 my-5 border-none"/></div>


        <!--NEWSLETTER-->
        
        <section class="py-5 px-4" id="newsleterSection">
            <div class="row">
                <div class="col-12 col-lg-7 d-flex align-items-center justify-content-center" >
                    <div class="bg-secondary p-2 rounded-3" >
                        <h5 class="text-white mb-0">Samo jos danas dobijate dodatnih 30 % popusta</h5>
                    </div>
                </div>
                <div class="col-12 col-lg-5 d-block d-lg-flex">
                    <div class="mx-4 d-block d-sm-flex d-lg-block justify-content-between my-4">
                        <div class="mb-2 bg-light col-12 col-sm-3 col-lg-12 mr-2 p-2 bg-opacity-50"><p class="fw-bold text-light">Lokacije trgovina:</p><p>Takovska 18</p></div>
                        <div class="mb-2 bg-light col-12 col-sm-3 col-lg-12 mr-2 p-2 bg-opacity-50"><p class="fw-bold text-light">Telefon:</p><a href="tel:+381611357200">0611357***</a></div>
                        <div class="mb-2 bg-light col-12 col-sm-3 col-lg-12  p-2 bg-opacity-50"><p class="fw-bold text-light">Lokacija kancelarije:</p><p>Kneginje Ljubice 128 A</p></div>
                    </div>
                    <div class="row justify-content-between d-lg-block mt-4">
                        <div class="mb-2 bg-light col-12 col-sm-5 col-lg-12 p-2 bg-opacity-50"><p class="fw-bold text-light">Radno vreme</p><p>09:00 - 22:00 (Pon-Ned)</p></div>
                        <div class="mb-2 bg-light col-12 col-sm-5 col-lg-12 p-2 bg-opacity-50"><p class="fw-bold text-light"> Email:</p><p>markodasic70&comat;gmail.com</p></div>
                    </div>

                </div>
            </div>

        </section>
        </main>
        <!--FOOTER-->

     <?php include("footer.php")?>
    </body>
</html>