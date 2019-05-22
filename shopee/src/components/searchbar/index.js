import React, { Component } from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

import './searchbar.css';

const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Brunei Darussalam' },
];

const mainstyles = {
    searchBox: {
        padding: '.175rem .75rem',
        borderBottom: '1px solid #ced4da',
        borderRadius: '5px',
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px',
    },
    queryText: {
        fontWeight: 400,
        color: '#f5707a'
    },
    remainingText: {
        fontWeight: 'normal'
    },
    resultsHeader: {
        marginTop: '-5px',
        lineHeight: '4',
        marginLeft: '10px'
    },
}

export default class SearchBar extends Component {
    state = {
        searchTerm: '',
        popper: '',
        suggestions: [],
    };

    renderInputComponent = (inputProps) => {
        const { classes, inputRef = () => { }, ref, ...other } = inputProps;
        return (
            <TextField
                fullWidth
                InputProps={{
                    inputRef: node => {
                        ref(node);
                        inputRef(node);
                    },
                }}
                {...other}
                className="search-input"
                style={mainstyles.searchBox}
            />
        );
    }

    getSuggestionValue = (suggestion) => {
        return suggestion.label;
    }

    getSuggestions = (value) => {
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;

        return inputLength === 0
            ? []
            : suggestions.filter(suggestion => {
                const keep =
                    count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

                if (keep) {
                    count += 1;
                }

                return keep;
            });
    }

    getSuggestionValue = (suggestion) => {
        return suggestion.label;
    }

    handleSuggestionsFetchRequested = async ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value),
        });
        // const user = await plusCode6Hex(this.props.user);
        // const index = client.initIndex(`areabaskets_${user}_${DOMAIN}_${keys.REACT_APP_ALGOLIA_ENV}`);
        // const self = this
        // await index.search(value, function (err, content) {
        //     const hits = content.hits
        //     self.setState({
        //         suggestions: hits.slice(0, 6)
        //     })
        // })
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = name => (event, { newValue }) => {
        this.setState({
            [name]: newValue,
        });
    };

    searchQuery = e => {
        const { history } = this.props;
        if (e.keyCode === 13) {
            if (e.target.value.length > 0) {
                const queryString = e.target.value;
                this.setState({ queryString, searchQueryResult: true });
                // history.push(`/product/search/${queryString}`);
            }
        }
    }

    renderSuggestion = (suggestion, { query, isHighlighted }) => {
        const matches = match(suggestion.label, query);
        const wordMatches = parse(suggestion.label, matches);

        return (
            <MenuItem selected={isHighlighted} component="div">
                <div>
                    <span><i className="fas fa-search" id="backdrop-search-icon" /></span>
                    {wordMatches.map((wordMatch, index) =>
                        wordMatch.highlight ? (
                            <span key={String(index)} className="productOptions" style={mainstyles.queryText}>
                                {wordMatch.text}
                            </span>
                        ) : (
                                <strong key={String(index)} style={mainstyles.remainingText}>
                                    {wordMatch.text}
                                </strong>
                            ),
                    )}
                </div>
            </MenuItem>
        );
    }

    render() {
        const { classes } = this.props;

        const styles = {
            suggestionsContainerOpen: {
                position: "absolute",
                zIndex: 1,
                left: 0,
                right: 0,
                borderTopLeftRadius: "2px",
                borderBottomRightRadius: "5px",
                borderBottomLeftRadius: "5px"
            },
            suggestion: {
                display: "block"
            },
            suggestionsList: {
                margin: 0,
                padding: 0,
                fontSize: "1rem",
                listStyleType: "none",
                marginTop: "-10px"
            }
        };

        const autosuggestProps = {
            renderInputComponent: this.renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion: this.renderSuggestion,
        };


        return (
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    placeholder: 'Search here...',
                    value: this.state.searchTerm,
                    onChange: this.handleChange('searchTerm'),
                    onKeyDown: ((e) => { this.searchQuery(e); }),
                }}
                theme={{
                    suggestionsContainerOpen: styles.suggestionsContainerOpen,
                    suggestionsList: styles.suggestionsList,
                    suggestion: styles.suggestion,
                }}
                renderSuggestionsContainer={options => {
                    return <Paper {...options.containerProps} square>
                        {options.children ? (
                            <div>
                                <p style={{ margin: "10px", lineHeight: "2" }}>
                                    <b style={styles.resultsHeader}> Results </b>
                                </p>
                                <Link>
                                    <div>{options.children}</div>
                                </Link>

                            </div>
                        ) : (
                                <div>{options.children}</div>
                            )}
                    </Paper>
                }}
            />
        );
    }
}