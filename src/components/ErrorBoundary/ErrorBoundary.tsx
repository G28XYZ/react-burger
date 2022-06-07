import React, { useEffect, useState } from "react";

function ErrorBoundary(props: any) {
  const [state, setState] = useState({ hasError: false });

  function getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  useEffect(() => {
    throw new Error("Ошибка");
  }, []);

  if (state.hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return props.children;
}

export default ErrorBoundary;
