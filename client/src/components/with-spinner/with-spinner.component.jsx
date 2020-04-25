import React from "react";

import Spinner from "../spinner/spinner.component";

const WithSpinner = (WrapperdComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spinner /> : <WrapperdComponent {...otherProps} />;
};

export default WithSpinner;
