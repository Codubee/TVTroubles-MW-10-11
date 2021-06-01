import React from "react";
import MatchResults from "../components/MatchResults";
import { matchesData } from '../data/matchesData'
import Description from '../components/Description';
import { Container, Button } from 'reactstrap'
import '../styles/Swipe.css'
import axios from 'axios'

class Swipe extends React.Component {

    submit(){
        alert('hello world')
    }

    constructor(props) {
        super(props);
        this.state = { 
            data: {},
            userId:0
        };
        this.noButtonApi = this.noButtonApi.bind(this);
        this.yesButtonApi = this.yesButtonApi.bind(this);
        this.getMovie = this.getMovie.bind(this);
    }

    componentDidMount() {
        this.setState({userId: Math.floor(Math.random()*500)})
        axios.get('/getDescription')
        .then((response) => {
            console.log(response);
            this.setState({
                data: response.data
            })
        })
    }

    noButtonApi() {
        this.getMovie();
    }

    yesButtonApi() {
        
        var body = {
            id: this.state.userId,
            record: this.state.data
        }

        axios.post('/addUserMovie', body)
        .then((response) => {
            console.log(response);
        })
        .then(()=>{
            this.getMovie();
        })
    }

    getMovie(){
        axios.get('/getDescription')
        .then((response) => {
            console.log(response);
            this.setState({
                data: response.data
            })
        })
    }


    render() {
        return (
            <Container>
                <Description title={this.state.data.title} description={this.state.data.description} rating={this.state.data.rating} />
                <div className="text-center">
                    <Button color="success" onClick={this.yesButtonApi} >Yes</Button>
                    <Button color="danger" onClick={this.noButtonApi} className="ml-sm">No</Button>
                </div>
                <MatchResults data={matchesData} />
            </Container>
        )
    }
}

export default Swipe;