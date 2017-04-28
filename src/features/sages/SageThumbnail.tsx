import React from "react";
import { SageVM } from "../../shared/domain/dtos/sage";
import { Link } from "react-router-dom";

interface Props {
  sage: SageVM;
}

const SageThumbnail: React.SFC<Props> = ({ sage }) => (
  <div className="col-md-2 col-xs-4">
    <Link to={`/sage/detail/${sage.id}`} className="thumbnail">
      <div className="text-center text-info min-height-120">
        <i className="fa fa-user fa-5x" />
        <h5>{sage.name}</h5>
      </div>
    </Link>
  </div>
);

export default SageThumbnail;
