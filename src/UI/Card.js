import React from "react";

function Card(props) {
  console.log(props.children);
  return (
    <div className="superuser_bg">
      <div className="superuser_card">{props.children}</div>
    </div>
  );
}

export default Card;
