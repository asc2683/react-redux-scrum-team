import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";
import { deleteTeamMember } from "../actions/index";
import { Link } from "react-router-dom";
import { truncateString } from "../util/stringHelpers";

const TeamMember = ({ id, name, teamLead, role, deleteTeamMember, navigate }) => {
  let teamLeadText = teamLead ? <p>Team Lead</p> : "";
  let dragStart = (e) => {
    e.dataTransfer.setData("tmId", id);
  };

  let className = `team-member btn btn-default ${teamLead ? "team-lead" : "" }`;

  return (
    <button
      className={className}
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData("tmId", id);
      }}>
      <div className="team-member-header">
        <p>{truncateString(name, 23)}</p>
        <FontAwesome name="trash" className="delete-team-member-btn" tabIndex="1" onClick={() => deleteTeamMember(id)} />
      </div>
      <Link to={`/member/${id}`}>
        <Row>
          <Col
            xs={4}
            className="user-img">
              <FontAwesome name="user-circle" />
          </Col>
          <Col
            xs={8}
            className="details">
            {teamLeadText}
            <p>{role}</p>
          </Col>
        </Row>
      </Link>
    </button>
  );
};

TeamMember.propTypes = {
  role: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  teamLead: PropTypes.bool,
  deleteTeamMember: PropTypes.func
};

export default TeamMember;