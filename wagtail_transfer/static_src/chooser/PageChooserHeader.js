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
      <header className="w-header w-header--hasform">
        <div className="row">
          <div className="left">
            <div className="col">
              <h1 className="w-header__title" id="header-title">
                <svg className="icon icon-doc-empty-inverse w-header__glyph" aria-hidden="true">
                  <use href="#icon-doc-empty-inverse"></use>
                </svg>
                {!searchTitle ? 'Choose a page' : searchTitle}
              </h1>
            </div>
            <form className="col search-form" role="search" noValidate={true}>
              <div className="w-field__wrapper w-mb-0 -w-mt-2.5" data-field-wrapper>
                <label className="w-field__label w-sr-only" htmlFor="id_q">
                  Search term
                </label>
                <div className="w-field w-field--char_field w-field--text_input" data-field>
                  <div className="w-field__input" data-field-input>
                    <svg className="icon icon-search w-field__icon" aria-hidden="true">
                      <use href="#icon-search"></use>
                    </svg>
                    <input
                      onChange={this.handleInputChange}
                      value={searchValue}
                      placeholder="Search…"
                      type="text"
                      id="id_q"
                      disabled={!searchEnabled}
                    />
                  </div>
                </div>
              </div>
              <div className="w-sr-only">
                <input value="Search" className="button" type="submit" />
              </div>
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
