# PokeDex

L'application est faite en React native typescript avec expo CLI.

Il y a trois écran: principal, liste de pokemon, detail d'un pokemon.

Dans l'écran principal on trouve un input text pour saisir le nom de l'utilisateur et la liste de traductions.

Le nom d'un utilisateur doit être un text d'au moins trois charactères.

Dans l'écran liste de pokemon, on trouve un input text "search pokemon by name" et la liste de pokemon.

Par default, la liste est initialisée avec 10 pokemon. Au fur et à mesure on scroll vers le bas, la liste de pokemon
charge les 10 pokemon suivants et ainsi en suite.

Chaque pokemon posede un button toggle pour le capturé. Si on le capture, le pokemon est sauvegardé en local.
Si on posede des pokemon capturés, on peut coché l'option "afficher les pokemon capturés".

Si on fait click sur l'image d'un pokemon, on va sur l'écran de détail. Sur cette écran, on affecte dans le model
du pokemon, les propiétés extended du model.

Finalment, pour les traductions, on a choisi l'option de crée un context qui est utilisé dans tout l'application dans chaque composant.

