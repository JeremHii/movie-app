# ⚠️ Attention ⚠️
> Lors de l'éxecution de `npm install` dans le dossier `movie-front` il est possible que sur **MacOS** il y est un problème à cause de la librairie `canvas`. 
> Le problème peut être réglé simplement en exécutant d'abord `brew install pkg-config cairo pango libpng jpeg giflib librsvg` puis `npm install`.

# Installation
> Veuillez suivre le README des 2 dossiers.
> - [Movie - Front](movie-front/)
> - [Movie - API](movie-api/)

# Remplir la base données
> Lorsque vous lancerez le projet pour la première fois, vous devriez avoir une base de données vide.
> C'est pourquoi vous aurez un bouton sur le site vous permettant de la remplir avec des films. ![populate_db.png](assets/populate_db.png)
> 
> En cliquant dessus, vous serez invité à choisir un nombre de films à charger en base de données (de 20 à 300).
>
> Une fois confirmée, cette action pourra prendre jusqu'à 5 minutes selon le nombre choisit.
> Quand celle-ci sera terminée vous serez redirigé vers la page d'accueil qui devrait désormais afficher une liste de films.

> Les films sont récupérés auprès de l'API [TMDB](https://developer.themoviedb.org/docs).
> Ce sont les films les plus populaires en ce moment. [Voir cet endpoint pour plus de détails.](https://developer.themoviedb.org/reference/movie-popular-list)