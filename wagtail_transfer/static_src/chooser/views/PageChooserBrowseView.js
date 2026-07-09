import React from 'react';
import PropTypes from 'prop-types';

import PageChooserResultSet from '../PageChooserResultSet';

const propTypes = {
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  parentPage: PropTypes.object,
  items: PropTypes.array,
  pageTypes: PropTypes.object,
  restrictPageTypes: PropTypes.array,
  onPageChosen: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired
};

const defaultProps = {
  parentPage: null
};

class PageChooserBrowseView extends React.Component {
  renderBreadcrumb() {
    const { parentPage, onNavigate } = this.props;

    if (!parentPage || !parentPage.meta.ancestors.length) {
      return null;
    }

    const ancestorPages = parentPage.meta.ancestors;

    const breadcrumbItems = ancestorPages.map(ancestorPage => {
      const onClickNavigate = e => {
        onNavigate(ancestorPage);
        e.preventDefault();
      };

      if (ancestorPage.id === 1) {
        return (
          <li key={ancestorPage.id} className="w-h-full w-flex w-items-center">
            <a
              href="#"
              onClick={onClickNavigate}
              className="w-flex w-items-center w-text-text-label"
            >
              <svg className="icon icon-home default w-mr-1" aria-hidden="true">
                <use href="#icon-home"></use>
              </svg>
              Home
            </a>
          </li>
        );
      }

      return (
        <li key={ancestorPage.id} className="w-h-full w-flex w-items-center">
          <a href="#" className="navigate-pages w-flex w-items-center w-text-text-label" onClick={onClickNavigate}>
            <svg className="icon icon-arrow-right default w-mr-1" aria-hidden="true"><use href="#icon-arrow-right"></use></svg>
            {ancestorPage.title}
          </a>
        </li>
      );
    });

    return (
      <div className="w-breadcrumbs w-flex w-flex-row w-items-center w-overflow-x-auto w-overflow-y-hidden w-pl-3">
        <nav className="w-flex w-items-center w-flex-row w-h-full" aria-label="Breadcrumb">
          <ol className="w-flex w-flex-row w-justify-start w-items-center w-h-full w-pl-0 w-my-0 w-gap-2">
            {breadcrumbItems}
            {/*
              Wagtail 7 renders a lone crumb (li:only-child) as an oversized
              bold mini-heading, meant for editor-view page titles. :only-child
              is a structural check that ignores visibility, so a hidden empty
              li defeats the match and keeps a single "Home" crumb the same
              size as every other crumb, with no font-size guessing needed.
            */}
            {breadcrumbItems.length === 1 && <li key="only-child-guard" hidden />}
          </ol>
        </nav>
      </div>
    );
  }
  render() {
    const {
      pageNumber,
      totalPages,
      parentPage,
      items,
      pageTypes,
      restrictPageTypes,
      onPageChosen,
      onNavigate,
      onChangePage
    } = this.props;

    return (
      <div className="nice-padding">
        <h2>Explorer</h2>
        {this.renderBreadcrumb()}
        <PageChooserResultSet
          pageNumber={pageNumber}
          totalPages={totalPages}
          parentPage={parentPage}
          items={items}
          pageTypes={pageTypes}
          restrictPageTypes={restrictPageTypes}
          displayChildNavigation={true}
          onPageChosen={onPageChosen}
          onNavigate={onNavigate}
          onChangePage={onChangePage}
        />
      </div>
    );
  }
}

PageChooserBrowseView.propTypes = propTypes;
PageChooserBrowseView.defaultProps = defaultProps;

export default PageChooserBrowseView;
