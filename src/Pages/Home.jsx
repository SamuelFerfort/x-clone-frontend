import { useOutletContext } from "react-router-dom";
import Spinner from "../Components/Spinner";

export default function Home() {
  const { posts, isPending, error } = useOutletContext();

  if (isPending) {
    return (
      <div className="flex justify-center pt-20">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center pt-20 text-white">
        Error fetching posts {error.message}
      </div>
    );
  }

  return (
    <div className="flex justify-center pt-20 text-white">
      Hello posts section
    </div>
  );
}
