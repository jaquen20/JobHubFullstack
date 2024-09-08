import React from "react";
import Connection from "../MyNetwork/Connection";

const Network = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const handleClick = (data) => {
    setCurrentPage(data);
  };
  return (
    <div>
      <Connection />
    </div>
  );
};

export default Network;
