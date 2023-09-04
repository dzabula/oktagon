<!DOCTYPE html>
<html>
    <head>
        
        <?php
            $title="OKTAGON - Korpa";
            include("head.php");
        ?>
    </head>
    <body id="bootstrap-overrides" class="py-2">

        <?php include("header.php");?>

        <main>
            <section id="wrap" class="container">
                <div id="tableChart" class="mb-2">
                    <table class="table table-striped table-hover respon-font-14">

                        <thead>
                            <tr>
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
                        <tbody>

                            <!--DINAMICKO ISPISIVANJE PROIZVODA IZ LOCAL STORAGE-A-->
                           
                        </tbody>
                        
                    </table>
                </div>
             
            </section>


        </main>
        <br/>
        <br/>

        <!--FOOTER-->


     <?php include("footer.php")?>
    </body>
</html>