# About the Project

This webpage was developed as an assignment by a team of Techin students. The platform mimics the appearance and partial functionality of an entertainment service offering a limited variety of movies and TV shows.
Upon visiting the homepage, users can get a preview of the platform’s content. If interested, they can create a profile and access additional features, such as bookmarks. Registered users also have the ability to change their account name.

# How to start initial setup

<ul>
<li>Download the project from from Github. Link: AusteId/entertainment-web-app;</li>
<li>Install all the required packages using “npm i“ command in your terminal. </li>
<li>Run the project with "npm run start" command in your terminal. </li>
</ul>
 
# API endpoints
 
<ul>
<li>File: src/helpers/constants.js</li>

Users: http://localhost:7777/users -> Constant: API_USERS_URL</li>
Movies: http://localhost:7777/movies -> Constant: API_MOVIES_URL</li>

</ul>
 
# General information
 
# Users will be able to:
 
<ul>
<li>View the app's layout optimized for their device's screen size.</li>
<li>See hover effects on all interactive elements.</li>
<li>Navigate between the Home, Movies, TV Series, and Bookmarked Shows pages.</li>
<li>Add or remove bookmarks for any movie or TV series.</li>
<li>Search for specific shows across all pages.</li>
<li>Use a sign-up screen to create a user account, which will be saved to a JSON file, and log in to verify their credentials, redirecting them to the Home page upon successful login.</li>
</ul>
 
# Structure:
 
General:
 
<ul>
<li>
The navigation menu is fixed to the left on larger screens.
</li>
<li>The trending section scrolls sideways to reveal other trending shows.</li>
<li>Any search input searches through all shows (i.e. all movies and TV series).</li>
</ul>
 
Home:
 
<ul>
<li>
The trending section scrolls horizontally to display additional trending shows.
Any search input will search across all shows (both movies and TV series).
</li>
</ul>
 
Movies:
 
<ul>
<li>
This page displays only shows categorized as "Movies".
Any search input will filter through all available movies.
</li>
</ul>
 
TV Series:
 
<ul>
<li>
This page displays only shows categorized as "TV Series".
Any search input will filter through all available TV series.
</li>
</ul>
 
Bookmarked Shows:
 
<ul>
<li>
This page displays all shows that have been bookmarked from both categories.
Any search input will filter through all bookmarked shows.
</li>
</ul>
 
# Tools
 
The platform was built on Vite using React framework. Additional tools that were used during the development process:
 
<ul>
<li>json-server for mimicing a back-end database.</li>
<li>React Router routing library.</li>
<li>React icon for icon.</li>
<li>Tailwind CSS framework and CSS for design.</li>
<li>React Hook Form for form validation.</li>
<li>SubtleCrypto functions for password hashing.</li>
<li>swiper for creating a smoothly working "Trending" carousel.</li>
<li>axios for managing http requests.</li>
</ul>
 
# Development team
<ul>
<li>Artūras Dziminavičius</li>
<li>Austė Idaitė</li>
<li>Dominyka Dobužinskaitė</li>
<li>Ernestas Baidinas</li>
<li>Marijus Šmiginas</li>
<li>Tadas Rumšas</li>
</ul>
 
Code testers:
<ul>
<li>Airida Grašytė</li>
</ul>
