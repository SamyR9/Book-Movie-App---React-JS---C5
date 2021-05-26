import { GridList, GridListTile, GridListTileBar, Typography, withStyles } from "@material-ui/core";
import YouTube from "react-youtube";
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../common/header/Header"
import "./Details.css";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const Details = (props) => {

    let dataMovie = null;
    const [rating,setRating] = useState(0); //for star border icon
    
    const [selectedMovie,setSelectedMovie] = useState({
        genres: [],
        trailer_url : "",
    });

    //fetch movie data on click of released movie card
    function loadSelectedMovieData(){
        fetch(props.baseUrl + "movies/" + props.match.params.id , {
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

    //youtube parameters
    const opts = {
        height: '350',
        width: '740',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

    //open wikipedia for selected artist
    const directToArtistWikiHandler = (url) => {
        window.location = url;
    }

    return(
        <div>
            {/* Header */}
            <Header isDetailsPage="true" id={selectedMovie.id} baseUrl={props.baseUrl}/>
            
            {/* Back to home link */}
            <div className="backToHome">
                <Typography className="backToHome" >
                    <Link to="/" underline="hover" className="backLink">&lt; Back to Home</Link>
                </Typography>
            </div>

            {/* flex container - page divided 20-60-20 */}
            <div className="flex-container">

                {/* 20% left - selected movie img*/}
                <div className="left-container1">
                    <img src={selectedMovie.poster_url} title={selectedMovie.title}/>
                </div>

                {/* 60% middle - movie details and trailer */}

                <div className="middle-container">
                    {/* h5 corresponds to headline as per new mapping for installed package */}
                    <Typography variant="h5" component="h2">{selectedMovie.title} </Typography>
                    <br/>
                    <Typography>
                        <span className="tagStyle">Genre: </span> {selectedMovie.genres.join(", ")}
                    </Typography>
                    <Typography>
                        <span className="tagStyle">Duration:</span> {selectedMovie.duration} 
                    </Typography>
                    <Typography>
                        <span className="tagStyle">Release Date:</span> {new Date(selectedMovie.release_date).toDateString()} 
                    </Typography>
                    <Typography>
                        <span className="tagStyle">Rating:</span> {selectedMovie.rating}  
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

                {/* 20% right - rating and artist details */}
                <div className="right-container1">
                    <Typography>
                        <span className="tagStyle">Rate this movie: </span>
                    </Typography>
                    <div>
                    {[...Array(5)].map((star, index) => { 
                         index += 1;      
                            return (         
                            <StarBorderIcon key={index} className={index <= rating ? "colorStar" : "colorStarB"}
                            onClick={() => setRating(index)}/>        
                            );
                        })}
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

export default Details;