// Add or edit movies here. Each genre appears automatically in the menu.
const movies = [
  {
    title: 'Inception',
    year: 2010,
    genre: 'Sci-Fi',
    description: 'A thief who enters people’s dreams takes a job planting an idea inside someone’s mind.'
  },
  {
    title: 'The Dark Knight',
    year: 2008,
    genre: 'Action',
    description: 'Batman faces the Joker as a wave of crime throws Gotham into chaos.'
  },
  {
    title: 'Get Out',
    year: 2017,
    genre: 'Horror',
    description: 'A weekend visit with his girlfriend’s family takes a disturbing turn for a young photographer.'
  },
  {
    title: 'Interstellar',
    year: 2014,
    genre: 'Sci-Fi',
    description: 'An astronaut leaves his family to help search for a new home for humanity.'
  },
  {
    title: 'The Grand Budapest Hotel',
    year: 2014,
    genre: 'Comedy',
    description: 'A hotel concierge and his young lobby boy get caught up in a dispute over a priceless painting.'
  },
  {
    title: 'Black Panther',
    year: 2018,
    genre: 'Action',
    description: 'T’Challa returns to Wakanda to take the throne and faces a challenger with ties to his family.'
  },
  {
    title: 'Mad Max: Fury Road',
    year: 2015,
    genre: 'Action',
    description: 'In a desert wasteland, Max joins Furiosa as she leads a group of women to safety while a warlord’s army pursues them.'
  },
  {
    title: 'School Of Rock',
    year: 2003,
    genre: 'Comedy',
    description: '	A struggling rock musician poses as a substitute teacher and turns his class into a band for a competition.'
  },
  {
    title: 'The Conjuring',
    year: 2013,
    genre: 'Horror',
    description: '	Two paranormal investigators try to help a family experiencing terrifying events in their new farmhouse.'
  },
  {
    title: 'A quiet place',
    year: 2003,
    genre: 'Horror',
    description: '	A family must stay silent to survive in a world where creatures hunt by sound.'
  },
  {
    title: 'Arrival',
    year: 2016,
    genre: 'Sci-Fi',
    description: '	A linguist is called in to communicate with alien visitors before rising tensions lead to war.'
  },
  {
    title: 'Game Night',
    year: 2018,
    genre: 'Comedy',
    description: 'A group of friends signs up for a murder mystery game, then starts to suspect the kidnapping they’re trying to solve is real.'
  }
]

// Each pair sets the two accent colours on a genre’s cards.
const genreColours = {
  Action: ['#ed7558', '#74344a'],
  Comedy: ['#f8c460', '#905458'],
  Horror: ['#b199f6', '#48366d'],
  'Sci-Fi': ['#76cde0', '#284f77']
}

const search = document.querySelector('#search')
const genreSelect = document.querySelector('#genre')
const statusLine = document.querySelector('#status')
const movieList = document.querySelector('#movie-list')
const movieTemplate = document.querySelector('#movie-template')

const genres = [...new Set(movies.map(movie => movie.genre))].sort()

for (const genre of genres) {
  genreSelect.add(new Option(genre, genre))
}

function makeMovieCard(movie) {
  const card = movieTemplate.content.cloneNode(true)
  const art = card.querySelector('.movie-art')
  const [glow, shade] = genreColours[movie.genre] ?? ['#ff917b', '#553044']

  art.style.setProperty('--glow', glow)
  art.style.setProperty('--shade', shade)
  card.querySelector('.movie-meta').textContent = `${movie.genre} · ${movie.year}`
  card.querySelector('.movie-title').textContent = movie.title
  card.querySelector('.movie-description').textContent = movie.description

  return card
}

function showMovies() {
  const query = search.value.trim().toLowerCase()
  const selectedGenre = genreSelect.value

  const matches = movies.filter(movie => {
    const matchesTitle = movie.title.toLowerCase().includes(query)
    const matchesGenre = selectedGenre === '' || movie.genre === selectedGenre
    return matchesTitle && matchesGenre
  })

  movieList.replaceChildren(...matches.map(makeMovieCard))

  const count = matches.length
  const movieText = count === 1 ? 'movie' : 'movies'
  statusLine.textContent = count === 0
    ? 'No movies match. Try another title or genre.'
    : `Showing ${count} ${movieText}`
}

search.addEventListener('input', showMovies)
genreSelect.addEventListener('change', showMovies)
showMovies()