import React from "react";

/**
 * @param {Object} logout logout fn
 * @param {Boolean} isLoading loading state indicator
 * @returns
 */
function Header({ logout, isLoading }) {
  return (
    <header>
      <h1>Header</h1>
      <button onClick={logout} disabled={isLoading}>
        Logout
      </button>
    </header>
  );
}

export default Header;
