import { useEffect, useRef, useCallback } from "react";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default function InfiniteScrollLoader({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  noPostsText,
}) {
  const observerTarget = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = observerTarget.current;
    const option = { threshold: 1.0 };

    const observer = new IntersectionObserver(handleObserver, option);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  return (
    <div ref={observerTarget} className="h-14 flex justify-center items-center">
      {isFetchingNextPage && <Spinner />}

      {!hasNextPage && (
        <div className="text-center  text-gray-secondary">{noPostsText}</div>
      )}
    </div>
  );
}

InfiniteScrollLoader.propTypes = {
  hasNextPage: PropTypes.bool,
  isFetchingNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func,
  noPostsText: PropTypes.string,
};
