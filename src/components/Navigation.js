// @flow
import React from 'react';
import MoveTo from 'moveto';

const styles = {
  bottomNavigation: {
    backgroundColor: '#FFFFFF',
    left: 0,
    bottom: 0,
    position: 'fixed',
    width: '100vw',
    zIndex: 2,
    // material-ui の bottom navigation をパクった
    boxShadow:
      'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
  },
  navItem: { marginTop: '6px', marginBottom: '6px' },
};

const moveTo = new MoveTo();

function scrollById(id) {
  // https://www.npmjs.com/package/moveto
  moveTo.move(document.getElementById(id));
}

export default () =>
  <div style={styles.bottomNavigation}>
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-offset-2 col-md-8">
          <button
            className="btn btn-danger"
            style={styles.navItem}
            onClick={() => scrollById('list-zero')}
          >
            禁止
          </button>{' '}
          <button
            className="btn btn-warning"
            style={styles.navItem}
            onClick={() => scrollById('list-one')}
          >
            制限
          </button>{' '}
          <button
            className="btn btn-info"
            style={styles.navItem}
            onClick={() => scrollById('list-two')}
          >
            準制限
          </button>{' '}
          <button
            className="btn btn-success"
            style={styles.navItem}
            onClick={() => scrollById('list-three')}
          >
            制限解除
          </button>
        </div>
      </div>
    </div>
  </div>;
