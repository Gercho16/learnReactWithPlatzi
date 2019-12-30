import React from 'react';

import './styles/BadgeEdit.css';
import header from '../images/platziconf-logo.svg';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import api  from '../api';
import PageLoading from '../components/PageLoading';

class BadgeEdit extends React.Component{
    state = { 
        loading: true,
        error: null,
        form: {
            firstName: '',
            lastName: '',
            email: '',
            jobTitle: '',
            twitter: ''
        }
    };

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async (event) => {
        this.setState({loading: true, error: null})
        try{
            const data = await api.badges.read(
                this.props.match.params.badgeId
            );
            this.setState({loading: false, form: data})
        } catch(error) {
            this.setState({loading: false, error: error})
        }
    }

    handleChange = (event) => {
        // Este es su equivalente a ...this.state.form, esto deja caer los valores anteriores
        // const nextForm = this.state.form;
        // nextForm[event.target.name] = event.target.value;
        this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true, error: null});
        try{
            await api.badges.update(this.props.match.params.badgeId, this.state.form);
            this.setState({loading: false});
            this.props.history.push('/badges');
        } catch(error){
            this.setState({loading: false, error: error});
        }
    }

    render() {
        if(this.state.loading === true) {
            return <PageLoading />
        }
        return (
            <React.Fragment >
                <div className="BadgeEdit__hero">
                    <img className="BadgeEdit__hero-image img-fluid" src={header} alt="logo"/>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            
                            <Badge 
                                firstName={this.state.form.firstName || 'FIRST_NAME'}
                                lastName={this.state.form.lastName || 'LAST_NAME'}
                                twitter={this.state.form.twitter || 'twitter'}
                                jobTitle={this.state.form.jobTitle || 'JOB_TITTLE'}
                                email={this.state.form.email || 'EMAIL'}
                                avatarUrl="https://gitlab.com/uploads/-/system/user/avatar/3546584/avatar.png?width=400"
                            />
                        </div>
                        <div className="col-6">
                            <h1>Edit Attendant</h1>
                            <BadgeForm onChange={this.handleChange}
                                onSubmit={this.handleSubmit} 
                                formValues={this.state.form}
                                error={this.state.error}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BadgeEdit;