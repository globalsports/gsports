import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {
  isLoading: boolean;
};

const Title = ({ isLoading }: Props) => {
  return (
    <div className="text-center">
      {isLoading ? (
        <Skeleton className="h-16 w-3/4 mx-auto my-5" />
      ) : (
        <h1>Book Badminton at Emerton Youth Recreation Centre</h1>
      )}
    </div>
  );
};

export default Title;
