import React from 'react';

import './styles/PageError.css';

// class PageError extends React.Component {
//     render() {
//         return (
//             <div className="PageError">
//                 ❌{this.props.error.message}
//             </div>
//         );
//     }
// }

function PageError(props) {
    return (<div className="PageError">
        ❌{props.error.message}
    </div>);
}

export default PageError;