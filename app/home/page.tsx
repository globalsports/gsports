import HomeCard from "@/components/home/HomeCard";
import IconNavBar from "@/components/home/IconNavBar";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <IconNavBar />
      <div className="flex flex-wrap gap-4 my-10">
        <HomeCard
          price={120}
          host="John Doe"
          images={[
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          ]}
          title="Beautiful Beach House"
        />
        <HomeCard
          price={100}
          host="John Doe"
          images={[
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          ]}
          title="Beautiful Beach House"
        />
      </div>
    </div>
  );
};

export default page;
