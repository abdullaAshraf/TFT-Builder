import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandle/withErrorHandle';
import axios from 'axios';
import Build from '../../components/Build/Build';
import shordid from 'shortid';
import Spinner from '../../components/UI/Spinner/Spinner'

class Builds extends Component {
    state = {
        builds: [],
        synergies: []
    }

    componentDidMount() {
        this.updateBuilds();
        axios.get('/synergy')
            .then(res => this.setState({ synergies: res.data }))
            .catch(err =>
                console.log(err));
    }

    updateBuilds = () => {
        axios.get('/build')
            .then(res => this.setState({ builds: res.data }))
            .catch(err =>
                console.log(err));

    }

    removeBuild = (e, id) => {
        e.stopPropagation();
        axios.delete('/build/' + id)
            .then(res => {
                console.log(res);
                this.updateBuilds();
            })
            .catch(err => console.log(err));
    }

    render() {
        let builds = <Spinner />;
        if (this.state.synergies.length > 0)
            builds = this.state.builds.map(build => <Build key={shordid.generate()} {...build} removeBuild={(e) => this.removeBuild(e, build._id)} synergies={this.state.synergies} />);
        return (
            <div>
                {builds}
            </div>
        );
    }
}

export default withErrorHandler(Builds, axios);