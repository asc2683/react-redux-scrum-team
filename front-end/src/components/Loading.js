import React from "react";

import FontAwesome from "react-fontawesome";

const Loading = ({ isLoading }) =>
  isLoading &&
    <div className="loading">
      <FontAwesome
        name='refresh'
        size='4x'
        spin />
      <span className="sr-only">Loading...</span>
    </div>;

export default Loading;