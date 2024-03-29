import React, { Component } from 'react';
import axios from "axios";
import { Consumer } from "../../context";

class Search extends Component {
    state={
        trackTitle:''
    }
    handleChange= e =>{
        const {name, value, type, checked} = e.target
        type === "checkbox"? this.setState({[name]: checked}): this.setState({[name]:value})
    }
    findTrack=(dispatch, e)=>{
        e.preventDefault();
        axios.get(`${process.env.REACT_APP_MUSIC_API_URL}/track.search?q_track=${this.state.trackTitle}&page-size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MUSIC_APP_KEY}`)
        .then(res => {
            //? What's going on here?
            dispatch({
                type: 'SEARCH_TRACK',
                payload: res.data.message.body.track_list
            })
        })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <Consumer>
                {(value)=>{
                    const {dispatch} = value
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="text-center display-4">
                                <i className="fas fa-music"></i> Search for a Song
                            </h1>
                            <p className="lead text-center">Get the lyrics for any song</p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Song title..." 
                                        name="trackTitle" 
                                        value={this.state.trackTitle}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Search</button>
                            </form>
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}

export default Search;