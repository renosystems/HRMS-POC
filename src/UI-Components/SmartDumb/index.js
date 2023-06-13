import { useEffect, useState } from "react";
import Dumb from "./Dumb";

/**
 * @returns
 */
const Smart = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      setLoading(false);
      setUser({ name: "shehab", age: 25 });
    });
  }, []);

  return <Dumb user={user} loading={loading} />;
};
export default Smart;
