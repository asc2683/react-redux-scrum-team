import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TeamColumns from "../components/TeamColumns";
import { deleteTeam, deleteTeamMember } from "../actions";

const mapStateToProps = (state, ownProps) => {
  let teams = state.teams.map(item => ({ ...item }))
  let teamMembers = state.teamMembers.map(item => ({ ...item }))

  teamMembers.map((teamMember) => {
    let team = teams.find((team) => team._id === teamMember.team);

    if (team) {
      team.teamMembers = team.teamMembers || [];
      team.teamMembers.push(teamMember);
    }
  });

  return {
    teams,
    teamMembers
  };
};

const mapDispatchToProps = (dispatch) =>
bindActionCreators({ deleteTeam, deleteTeamMember }, dispatch);

const TeamColumnsContainer = connect(mapStateToProps, mapDispatchToProps)(TeamColumns);

export default TeamColumnsContainer;