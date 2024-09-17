import { useRouteError, isRouteErrorResponse } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      // eslint-disable-next-line react/no-unescaped-entities
      return <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      // eslint-disable-next-line react/no-unescaped-entities
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;
}

export default ErrorBoundary;
