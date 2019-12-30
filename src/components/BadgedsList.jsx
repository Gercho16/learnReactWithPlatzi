import React from 'react';
import {Link} from 'react-router-dom';

import Gravatar from '../components/Gravatar';

import './styles/Badge.css';
import Twitter from '../images/twitter.jpg';

function useSearchBadges(badges) {
    const [ query, setQuery] = React.useState('');
    const [ filteredBadges, setFilteredBadges ] = React.useState(badges);
    React.useMemo(() => {
        const result = badges.filter((badge) => {
        return `${badge.firstName} ${badge.lastName}`.toLowerCase().includes(query.toLowerCase());
        })
        setFilteredBadges(result);
    }, [badges, query ]);
    return { query, setQuery, filteredBadges}
}

function BadgedsList(props) {
    const { query, setQuery, filteredBadges} = useSearchBadges(props.badges)
    if(filteredBadges.length === 0) {
        return (
            <div>
                <div className="form-group">
                    <label>Filter Badges</label>
                    <input type="text" className="form-control"
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value)
                        }}
                    />
                </div>
                <h3>No badges were found</h3>
                <Link className="btn btn-primary" to="badges/new">
                    Create new Badge
                </Link>
            </div>
        );
    } 
    return (
        <div className="BadgesList">
            <div className="form-group">
                <label>Filter Badges</label>
                <input type="text" className="form-control"
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value)
                    }}
                />
            </div>
            <ul className="list-unstyled">
                {filteredBadges.map((badge) => {
                    return (
                        <li key={badge.id}>
                            <Link className="text-reset text-decoration-none" to={"/badges/"+badge.id}>
                                <div  className="Badge__section-name">
                                    <Gravatar className="Badge__avatar" email={badge.email} alt="Avatar"/>
                                    <div>
                                        <h5>{badge.firstName} {badge.lastName}</h5>
                                        <img width="30px" src={Twitter} alt="Twitter"/>
                                        @{badge.twitter}
                                        <h6>{badge.jobTitle}</h6>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default BadgedsList;