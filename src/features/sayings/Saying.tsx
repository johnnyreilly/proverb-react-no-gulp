import React from "react";
import { Link } from "react-router-dom";

import { Saying } from "../../shared/domain/dtos/saying";

interface Props {
  saying: Saying;
}

const SayingComponent: React.SFC<Props> = ({ saying }) =>
  <blockquote>
    <p><Link to={`/sage/detail/${saying.sage.id}`} className="thumbnail">{saying.text}</Link></p>
    <footer>{saying.sage.name}</footer>
  </blockquote>;

export default SayingComponent;
