# Green Moons Tests

## Practical Test : Cinemo Web

Cinemo is the best way to discover great movie to watch.

1. Login Screen : input username and password, which can hold session of that user
2. Homepage : have menu bar on left side and screen on right side

- For menu bar item

1. Movie Finder : displays the list of movies. The user can click on any item to
   view more information. The movie’s detail screen displays other useful information such
   as movie name, movie image, category and favorite button.
   The user is also able to click on favorite button to keep the selected movie in their
   favorite list.
2. My Favorite : displays the list of favorite movies. The user can also view
   movie’s information from the favorite movie.
3. Logout : user can logout when click on this button.
   In order to get the movie information, you need to perform HTTP GET request to this
   URL https://www.majorcineplex.com/apis/get_movie_avaiable. The response data will be
   in JSON format.
