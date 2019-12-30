import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Badges.css';
import confLogo from '../images/badge-header.svg';
import BadgesList from '../components/BadgedsList';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';

import api from '../api';
import MiniLoader from '../components/MiniLoader';

class Badges extends React.Component{
    
    constructor(props) {
        super(props);
        console.log('1. constructor()');
        this.state = {
            loading: true,
            error: null,
            data: undefined,
        };
    }

    componentDidMount() {
        console.log('3. componentDidMount()');
        this.fetchData();
        this.idInterval = setInterval(this.fetchData, 5000);
    }

    fetchData = async () => {
        this.setState({ loading: true, error: null });
        try{
            const data = await api.badges.list();
            this.setState({ loading: false, data: data});
        } catch (error) {
            this.setState({ loading: false, error: error});
        }
    };

    componentDidUpdate(prevProps, prevState) {
        console.log('5. componentDidUpdate');
        console.log({
            prevProps: prevProps,
            prevState: prevState
        });

        console.log({
            props: this.props,
            state: this.state
        });
    }

    componentWillUnmount() {
        console.log('6. componentWillUnmount');
        clearInterval(this.idInterval);
    }
    
    render(){
        if(this.state.loading === true && this.state.data === undefined) {
            return <PageLoading />;
        }

        if(this.state.error) {
            return <PageError error={this.state.error}/>
        }
        console.log('2/4. render()');
        return (
            <React.Fragment>
                <div className="Badges">
                    <div className="Badges__hero">
                        <div className="Badges__container">
                            <img className="Badges_conf-logo" src={confLogo} alt="Conf logo"/>
                        </div>
                    </div>
                </div>

                <div className="Badges__container">
                    <div className="Badges__buttons">
                        <Link to="/badges/new" className="btn btn-primary">
                            New Badge
                        </Link>
                    </div>

                    <div className="Badges__list">
                        <div className="Badges__container">
                            {this.state.loading && (
                                <MiniLoader />
                            )}
                            <BadgesList badges={this.state.data}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Badges;