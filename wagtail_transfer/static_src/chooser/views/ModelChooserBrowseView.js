import React from 'react';
import PropTypes from 'prop-types';

import ModelChooserResultSet from '../ModelChooserResultSet';
import ModelObjectChooserResultSet from '../ModelObjectChooserResultSet';

const propTypes = {
  parentPage: PropTypes.object,
  items: PropTypes.array,
  onObjectChosen: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired
};

const defaultProps = {
  parentPage: null
};

class ModelChooserBrowseView extends React.Component {
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
      parentPage,
      items,
      onObjectChosen,
      onNavigate,
      onChangePage,
      resultType,
      nextPage,
      previousPage
    } = this.props;

    if (resultType == 'model') {
      // Model listing view
      return (
        <div className="nice-padding">
          <h2>Explorer</h2>
          {this.renderBreadcrumb()}
          <ModelChooserResultSet
            parentPage={parentPage}
            items={items}
            displayChildNavigation={true}
            onObjectChosen={onObjectChosen}
            onNavigate={onNavigate}
            onChangePage={onChangePage}
          />
        </div>
      );
    } else {
      // Object result view.
      return (
        <div className="nice-padding">
          <h2>Explorer</h2>
          {this.renderBreadcrumb()}
          <ModelObjectChooserResultSet
            parentPage={parentPage}
            items={items}
            onObjectChosen={onObjectChosen}
            onNavigate={onNavigate}
            onChangePage={onChangePage}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        </div>
      );
    }
  }
}

ModelChooserBrowseView.propTypes = propTypes;
ModelChooserBrowseView.defaultProps = defaultProps;

export default ModelChooserBrowseView;
