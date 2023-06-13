/**
 * @param {Object} user
 * @param {Boolean} loading
 * @returns
 */
const Dumb = ({ user, loading }) => {
  if (loading) return <div class="loading">Loading...</div>;
  else {
    return (
      <div>
        <p class="name">name: {user.name}</p>
        <p class="age">age: {user.age}</p>
      </div>
    );
  }
};
export default Dumb;
