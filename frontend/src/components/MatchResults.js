import React, { Component } from 'react';
import { Card, CardBody, Container, CardHeader, Row, Col, Collapse, Button } from 'reactstrap';
import { AiFillStar } from 'react-icons/ai'
import '../styles/MatchResults.css';
import axios from 'axios';

class MatchResults extends Component 
{

    constructor(props) 
    {
        super(props);

        this.state = { isOpen: false, matches: [],error:{} };

        this.toggle = this.toggle.bind(this);
        this.getMatches = this.getMatches.bind(this);
    }

    toggle()
    {
        this.setState({
            isOpen: !this.state.isOpen
        })

        if(this.state.isOpen)
        {
            this.getMatches();
        }
    }

    getMatches()
    {
        var UID = sessionStorage.getItem("UID");

        this.setState({
            error: {}
        });

        axios.get(`/getMatches?id=${UID}`)
        .then((response) => {
            this.setState({
                matches: response.data
            });
        })
        .catch((err)=> {
            console.log(err.response.data)
            this.setState({
                error: err.response.data
            });
        })
    }

    componentDidMount() 
    {
        this.getMatches();
    }

    render() 
    {
        return (
            <Container className="matchResults">
                <div className="text-center">
                    <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>View Matches</Button>
                    <Collapse isOpen={this.state.isOpen}>
                        <Row>
                            {
                                this.state.matches > 0 &&
                                this.state.matches.map((item, val) => 
                                {
                                    val += 1;
                                    return (
                                        <Col sm="12" md="6" lg="4">
                                            <Card key={val} className="match-results-card">
                                                <CardHeader>
                                                    <div>
                                                        {item.name}
                                                    </div>
                                                    <span>
                                                        <AiFillStar />
                                                        {item.rating}
                                                    </span>
                                                </CardHeader>
                                                <CardBody>
                                                    {item.description}
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                            {
                                this.state.error.msg != {} &&
                                <h5 className="text-center">{this.state.error.msg}</h5>
                            }
                    </Collapse>
                </div>
            </Container>
        )
    }
}

export default MatchResults;