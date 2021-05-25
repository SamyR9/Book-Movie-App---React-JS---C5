import { GridList, GridListTile, GridListTileBar, Typography, withStyles } from "@material-ui/core";
import YouTube from "react-youtube";
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../common/header/Header"
import "./Details.css";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const useStyles = theme => ({
    root: {
      display: "flex",
      flexDirection: "column",
  
      "& > * + *": {
        //marginTop: theme.spacing(1)
      }
    },
    emptyStar: {
      color: "white"
    }
  });

const Details = (props) => {

    let dataMovie = null;

    const [selectedMovie,setSelectedMovie] = useState({
        genres: [],
        trailer_url : "",
    });

    function loadSelectedMovieData(){
        fetch(props.baseURL + "movies/" + props.match.params.id , {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            //   "Cache-Control": "no-cache",
            },
            body: dataMovie,
          })  
          .then((response) => response.json())
          .then((response) => {
            setSelectedMovie(response);
        });
    }

    useEffect(() => {
        loadSelectedMovieData();
    },[]);

    const opts = {
        height: '350',
        width: '740',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

    const directToArtistWikiHandler = (url) => {
        window.location = url;
    }
      
    const classes = useStyles();

    return(
        <div>
            <Header isDetailsPage="true"/>
            <div className="backToHome">
                <Typography>
                    <Link to="/" underline="hover" className="backLink">&lt; Back to Home</Link>
                </Typography>
            </div>

            <div className="flex-container">
                <div className="left-container1">
                    <img src={selectedMovie.poster_url} title={selectedMovie.title}/>
                </div>

                <div className="middle-container">
                    
                    <Typography variant="h5" component="h2">{selectedMovie.title} </Typography>
                    <br/>
                    <Typography>
                        <span className="tagStyle">Genres: </span> {selectedMovie.genres.join(",")}
                    </Typography>
                    <Typography>
                        <span className="tagStyle">Duration:</span> {selectedMovie.duration} 
                    </Typography>
                    <Typography>
                        <span className="tagStyle">Release Date:</span> {new Date(selectedMovie.release_date).toDateString()} 
                    </Typography>
                    <Typography>
                        <span className="tagStyle"> Rating:</span> {selectedMovie.critics_rating}  
                    </Typography>
                    <div className="marginStyle">
                        <Typography>
                            <span className="tagStyle">Plot:</span> <a href={selectedMovie.wiki_url}>(Wiki Link)</a> {selectedMovie.storyline} 
                        </Typography>
                    </div>

                    <div className="marginStyle">
                        <Typography>
                            <span className="tagStyle">Trailer:</span>
                        </Typography>
                        <YouTube videoId={selectedMovie.trailer_url.split("?v=")[1]}
                            opts={opts} onReady={props._onReady}/>
                    </div>
                </div>

                <div className="right-container1">
                    <Typography>
                        <span className="tagStyle">Rate this movie: </span>
                    </Typography>

                    <div className={classes.root}>
                        <Rating
                        name="rating"
                        defaultValue={0}
                        precision={1}
                        onChange={(_, value) => {
                            setRating(value);
                          }}
                        emptyIcon={<StarBorderIcon fontSize="inherit" style={{pointerEvents: 'none'}} />}
                        />
                    </div>

                    <div className="marginStyle1">
                        <Typography>
                            <span className="tagStyle">Artists:</span>
                        </Typography>
                    </div>

                    <GridList cellHeight={180} cols={2}>
                        {selectedMovie.artists != null && selectedMovie.artists.map(art => (
                            <GridListTile
                                className="gridTile"
                                onClick={() => directToArtistWikiHandler(art.wiki_url)}
                                key={art.id}>
                                <img src={art.profile_url} alt={art.first_name + " " + art.last_name} />
                                <GridListTileBar title={art.first_name + " " + art.last_name}/>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>

            </div>
        </div>
    )
}

export default withStyles(useStyles)(Details);