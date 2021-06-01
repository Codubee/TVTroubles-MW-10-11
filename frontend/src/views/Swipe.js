import React from "react";
import MatchResults from "../components/MatchResults";
import { matchesData } from '../data/matchesData'
import Description from '../components/Description';
import { Container, Button } from 'reactstrap'
import '../styles/Swipe.css'

class Swipe extends React.Component {

    submit(){
        alert('hello world')
    }
    render() {
        return (
            <Container>
                <Description />
                <div className="text-center">
                    <Button color="success" onClick={this.submit} >Yes</Button>
                    <Button color="danger" onClick={this.submit} className="ml-sm">No</Button>
                </div>
                <MatchResults data={matchesData} />
            </Container>
        )
    }
}

export default Swipe;