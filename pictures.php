<?php

    $picToShow = $_GET['id']; // récupère la valeur de la variable id

    $file = 'pictures.xml';

    $dom = new DomDocument;
    $dom->load($file) or die ('<p>Erreur : impossible de charger le document xml.</p>');

    $listPics = $dom->getElementsByTagName("picture");

    $lengthListPics = $listPics->length;


    for($i=0; $i < $lengthListPics; $i++) {

        $picture = $listPics->item($i);
        $pictureId = $picture->getAttribute("id");

        if($pictureId == $picToShow) {
            
            $pictureName = $picture->getElementsByTagName('name')->item(0)->textContent;
            $pictureDescription = $picture->getElementsByTagName('description')->item(0)->textContent;
            $pictureUrl = $picture->getElementsByTagName('url')->item(0)->getAttribute('src');
            $pictureLink = $picture->getElementsByTagName('link')->item(0)->getAttribute('href');

            // Show Result

            echo "<h3>$pictureName</h3>";
            echo "<p>$pictureDescription</p>";
			if ($pictureLink != '') {
            	echo "<a href='$pictureLink' class='online-link' target='_blank'>See online</a>";
            }
            echo "<a><img src='$pictureUrl' alt='' title='Back to the gallery' /></a>";
        }

    }
?>