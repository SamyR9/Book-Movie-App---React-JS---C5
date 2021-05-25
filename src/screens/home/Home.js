import React, { useLayoutEffect, useState } from "react";
import Header from "../../common/header/Header"
import "./Home.css"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    gridListUpMov: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
      width:'100%'
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    gridListLeftContainer: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    movieFilterCardForm: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
  });
  
const Home = (props) => {
    const {classes} = props;
    const [movies,setUpcomingMoviesList] = useState([]);
    const [relMovies, setReleasedMoviesList] = useState([]);
    const [genresPicklist, setGenresPicklist] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [artistsPicklist, setArtistsPicklist] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    
    let dataUpcomingMovies = null;
    let dataReleasedMovies = null;
    let dataGenresPicklist = null;
    let dataArtistsPicklist = null;
    let dataFilterBox = null;

    const inputMovieNameHandler = event => {
        setMovieName(event.target.value);
    }
    
    const selectGenresHandler = event => {
        setSelectedGenres(event.target.value);
    }
    
    const selectArtistsHandler = event => {
        setSelectedArtists(event.target.value);
    }
    
    const startDateHandler = event => {
        setReleaseDateStart( event.target.value);
    }
    
    const endDateHandler = event => {
        setReleaseDateEnd(event.target.value);
    }
    
    const movieCardClickHandler = (movieId) => {
        props.history.push('/movie/' + movieId);
    }
    
    function loadMoviesData(){
        //upcoming movies get request 
        fetch(props.baseURL + "movies?status=PUBLISHED", {
            method: "GET" ,
            headers: {
                "Cache-Control" : "no-cache",
                'Accept': 'application/json'
            },
            body: dataUpcomingMovies,
        }).then((response) => response.json())
          .then((response) => {setUpcomingMoviesList(response.movies);
        });
       
        //released movies get request
        fetch(props.baseURL + "movies?status=RELEASED", {
            method: "GET" ,
            headers: {
                "Cache-Control" : "no-cache",
                'Accept': 'application/json'
            },
            body: dataReleasedMovies,
        })
        .then((response) => response.json())
        .then((response) => {setReleasedMoviesList(response.movies);
        });
    }

    function loadGenres(){
        fetch(props.baseURL + "genres", {
            method: "GET" ,
            headers: {
                'Cache-Control' : "no-cache",
                'Accept': 'application/json'
            },
            body: dataGenresPicklist,
        })
        .then((response) => response.json())
        .then((response) => {
            setGenresPicklist(response.genres);
        });
    }

    function loadArtists(){

        fetch(props.baseURL + "artists", {
            method: "GET" ,
            headers: {
                "Cache-Control" : "no-cache",
                'Accept': 'application/json'
            },
            body: dataArtistsPicklist,
        })
        .then((response) => response.json())
        .then((response) => {
            setArtistsPicklist(response.artists);
        });

    }

    useLayoutEffect(() => {
        loadMoviesData();
        loadGenres();
        loadArtists();
        //console.log(movies)
    },[])

    function loadFilters(query){
        fetch(props.baseURL +"movies" + encodeURI(query),{
            method: "GET",
            headers: {
                "Cache-Control": "no-cache"
            },
            body: dataFilterBox,
        })
        .then((response) => response.json())
        .then((response) => {
            setReleasedMoviesList(response.movies)});
    }

    const applyFilterButtonHandler = () => {
        let query = "?status=RELEASED";
        if (movieName !== "") {
            query += "&title=" + movieName;
        }
        if (selectedGenres.length > 0) {
            query += "&genres=" + selectedGenres.toString();
        }
        if (selectedArtists.length > 0) {
            query += "&artists=" + selectedArtists.toString();
        }
        if (relStartDate !== "") {
            query += "&start_date=" + relStartDate;
        }
        if (relEndDate !== "") {
            query += "&end_date=" + relEndDate;
        }
        loadFilters(query);
        }
    
    return(
        <div>
            <Header/>
            <div className="upMovHeader">Upcoming Movies</div>
            
            {/* upcoming movies grid list - material ui */}
            <GridList className={classes.gridListUpMov} cols={6} cellHeight={250}>
                {movies.map((mov) => (
                <GridListTile key={mov.id}>
                    <img src={mov.poster_url} alt={mov.title} className="mov-poster"/>
                    <GridListTileBar title={mov.title}/>
                </GridListTile>
                ))}
            </GridList>
           
            {/* flex container with left and right divisions */}
            <div className="flex-container">

                <div className="left-container">
                    <GridList cellHeight={350} cols={4} className={classes.gridListLeftContainer}>
                        {relMovies.map(mov => (
                            <GridListTile onClick={() => movieCardClickHandler(mov.id)} key={mov.id}>
                                <img src={mov.poster_url} className="mov-poster" alt={mov.title} />
                                <GridListTileBar
                                    title={mov.title}
                                    subtitle={<span>Release Date: {new Date(mov.release_date).toDateString()}</span>}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>

                <div className="right-container">
                    <Card>
                        <CardContent>
                            <FormControl className={classes.movieFilterCardForm}>
                                <Typography className={classes.title} color="textSecondary">
                                    FIND MOVIES BY:
                                </Typography>
                            </FormControl>

                            <FormControl className={classes.movieFilterCardForm}>
                                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                <Input id="movieName" onChange={inputMovieNameHandler}/>
                            </FormControl>

                            <FormControl className={classes.movieFilterCardForm}>
                                <InputLabel htmlFor="genres-Picklist">Genres</InputLabel>
                                <Select
                                    multiple
                                    input={<Input id="genres-Picklist" />}
                                    renderValue={selected => selected.join(",")} value={selectedGenres} onChange={selectGenresHandler}>
                                    
                                    {genresPicklist.map(genre => (
                                        <MenuItem key={genre.id} value={genre.genre}>
                                            <Checkbox checked={selectedGenres.indexOf(genre.genre) > -1} />
                                            <ListItemText primary={genre.genre} />
                                        </MenuItem>
                                    ))}
                                </Select> 
                            </FormControl>

                            <FormControl className={classes.movieFilterCardForm}>
                                <InputLabel htmlFor="selectArtists">Artists</InputLabel>
                                <Select multiple input={<Input id="selectArtists" />}
                                    renderValue={selected => selected.join(',')}
                                    value={selectedArtists} onChange={selectArtistsHandler}>
                                    
                                    {artistsPicklist.map(artist => (
                                        <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                            <Checkbox checked={selectedArtists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                            <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className={classes.movieFilterCardForm}>
                                <TextField id="relStartDate" label="Release Date Start" type="date" defaultValue="" 
                                    InputLabelProps={{ shrink: true }} onChange={startDateHandler}/>
                            </FormControl>

                            <FormControl className={classes.movieFilterCardForm}>
                                <TextField id="relEndDate" label="Release Date End"type="date" defaultValue=""
                                    InputLabelProps={{ shrink: true }} onChange={endDateHandler}/>
                            </FormControl>
                            <br/>
                            <br/>
                            <FormControl className={classes.movieFilterCardForm}>
                                <Button onClick={() =>applyFilterButtonHandler()} variant="contained" color="primary">
                                    APPLY
                                </Button>
                            </FormControl>
                        </CardContent>
                    </Card>
                </div>

            </div>

        </div>
    )
}

export default withStyles(useStyles)(Home);