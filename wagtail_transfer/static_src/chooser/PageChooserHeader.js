import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchEnabled: PropTypes.bool.isRequired,
  searchTitle: PropTypes.string
};

class PageChooserHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
    this.debounceTimeoutRef = null;
    this.DEBOUNCE_DELAY = 300; // 300ms delay
  }

  componentDidUpdate(prevProps, prevState) {
    // Only trigger search when searchValue changes
    if (prevState.searchValue !== this.state.searchValue) {
      this.debounceSearch();
    }
  }


  componentWillUnmount() {
    if (this.debounceTimeoutRef) {
      clearTimeout(this.debounceTimeoutRef);
    }
  }

  debounceSearch = () => {
    // Clear existing timeout
    if (this.debounceTimeoutRef) {
      clearTimeout(this.debounceTimeoutRef);
    }

    // Set new timeout
    this.debounceTimeoutRef = setTimeout(() => {
      this.props.onSearch(this.state.searchValue);
    }, this.state.searchValue.length > 0 ? this.DEBOUNCE_DELAY : 0);
  };

  handleInputChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    const { searchEnabled, searchTitle } = this.props;
    const { searchValue } = this.state;

    return (
      <header className="nice-padding hasform">
        <div className="row">
          <div className="left">
            <div className="col">
              <h1 className="icon icon-doc-empty-inverse">
                {!searchTitle ? 'Choose a page' : searchTitle}
              </h1>
            </div>
            <form className="col search-form" noValidate={true}>
              <ul className="fields">
                <li className="required">
                  <div className="field char_field text_input field-small iconfield">
                    <label htmlFor="id_q">Search term:</label>
                    <div className="field-content">
                      <div>
                        <input
                          onChange={this.handleInputChange}
                          value={searchValue}
                          placeholder="Search"
                          type="text"
                          disabled={!searchEnabled}
                        />
                        <span />
                      </div>
                    </div>
                  </div>
                </li>
                <li className="submit visuallyhidden">
                  <input value="Search" className="button" type="submit" />
                </li>
              </ul>
            </form>
          </div>
          <div className="right" />
        </div>
      </header>
    );
  }
};

PageChooserHeader.propTypes = propTypes;

export default PageChooserHeader;
