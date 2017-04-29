import React from "react";
import { Link } from "react-router-dom";

import { SayingVM } from "../../shared/domain/dtos/saying";

interface Props {
  saying: SayingVM;
}

const Saying: React.SFC<Props> = ({ saying }) =>
  <blockquote>
    <p><Link to={`/saying/detail/${saying.id}`}>{saying.text}</Link></p>
    <footer>{saying.sageName}</footer>
  </blockquote>;

export default Saying;
