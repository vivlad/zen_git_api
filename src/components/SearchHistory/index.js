import React from 'react';

const SearchHistory = (props) => {
    const items = props.historyItems;
    if ( items && items.length > 0 ) {
        return(
            <div className="historyItemsWrapper">
                <p>Your search history:</p>
                <ul>
                    {items.map( (item, idx) => (
                        <li key={idx} onClick={() => props.historyItemClickHandler(item)}>{item}</li>
                    ))}
                </ul>
                <button onClick={props.clearHistory}>Clear history</button>
                <br/>
                <br/>
            </div>
        );
    } else {
        return null;
    }
}

export default SearchHistory;