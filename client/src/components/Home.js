import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const registerLink = (
    <div>
      <h3
        style={{ color: "orange", textAlign: "center", marginBottom: "0.5rem" }}
      >
        Please Register or Log in to manage items
      </h3>
      <div className="text-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQJTyle1vddAmovQZrcNf075RPZ6tTPtLaRbJRC5U0YVEbUQLH1&usqp=CAU"
          style={{ width: "45%" }}
        />
      </div>
    </div>
  );

  const welcomeLink = (
    <div>
      <h3
        style={{ color: "orange", textAlign: "center", marginBottom: "0.5rem" }}
      >
        {user ? `Welcome ${user.name}, please come to 'Shopping List' tab` : ""}
      </h3>
      <div className="text-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQJTyle1vddAmovQZrcNf075RPZ6tTPtLaRbJRC5U0YVEbUQLH1&usqp=CAU"
          style={{ width: "50%" }}
        />
      </div>
    </div>
  );
  return <div>{isAuthenticated ? welcomeLink : registerLink};</div>;
}
