# How to start initial setup

<ul>
<li>npm i</li>
<li>windows os: npx json-server .\data\data.json -p 7777</li>
<li>linux os: npx json-server data/data.json -p 7777</li>
<li>npm run dev</li>
</ul>

# API endpoints

<ul>
<li>File: src/helpers/constants.js</li>
<li>Users: http://localhost:7777/users  ->  Constant: API_USERS_URL</li>
<li>Movies: http://localhost:7777/movies  ->  Constant: API_MOVIES_URL</li>
</ul>

# Tailwind styles

<ul>
 <li>Heading (L) -> heading-lg</li>
  <li>Heading (M) -> heading-md</li>
  <li>Heading (S) -> heading-sm</li>
  <li>Heading (XS) -> heading-xs</li>
  <li>Body (M) -> body-md</li>
  <li>Body (S) -> body-sm</li>
<ul>

# Entertainment web app

## The challenge

Your challenge is to build out this entertainment web application and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

We provide the data in a local `data.json` file, so use that to populate the content on the first load.

Your users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Navigate between Home, Movies, TV Series, and Bookmarked Shows pages
- Add/Remove bookmarks from all movies and TV series
- Search for relevant shows on all pages
- Have a sign-up screen design to create users and write them to json file, login to check if user logged in, then redirect to Home page

### Expected Behaviour

- General
  - The navigation menu should be fixed to the left for larger screens. Use the "Desktop - Home" page in the design as a visual reference.
- Home
  - The trending section should scroll sideways to reveal other trending shows
  - Any search input should search through all shows (i.e. all movies and TV series)
- Movies
  - This page should only display shows with the "Movie" category
  - Any search input should search through all movies
- TV Series
  - This page should only display shows with the "TV Series" category
  - Any search input should search through all TV series
- Bookmarked Shows
  - This page should display all bookmarked shows from both categories
  - Any search input should search through all bookmarked shows

**Have fun building!** 🚀
