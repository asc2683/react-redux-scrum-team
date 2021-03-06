import React from "react";
import { Form, FormGroup, FormControl, ControlLabel, Button, Checkbox, Radio } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";

import SelectRole from "./SelectRole";
import SelectTeam from "./SelectTeam";
import AddSkills from "./AddSkills";
import CancelButton from "./CancelButton";

import { isEmailValid } from "../../util/stringHelpers"

class TeamMemberForm extends React.Component {
  constructor (props, title, onSubmitAction) {
    super(props);
    this.state = {
      name: props.name || "",
      email: props.email || "",
      team: props.team || "",
      teamLead: props.teamLead || false,
      experience: props.experience || "",
      role: props.role || "",
      skills: props.skills || []
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSkillsChange = this.onSkillsChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onSubmitAction = onSubmitAction;
    this.title = title;
    this.id = props.id;
  }

  onInputChange (e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSkillsChange (skills) {
    this.setState({
      skills
    });
  }

  getValidationState () {
    const nameLength = this.state.name.length;
    const emailValid = isEmailValid(this.state.email);
    const teamSelect = this.state.team;

    if (nameLength > 0 && emailValid && teamSelect !== "Select Team") {
      return "success";
    } else {
      return "error";
    }
  }

  onSubmitForm () {
    const { name, email, team, teamLead, role, skills, experience } = this.state;
    const validationState = this.getValidationState();

    if (validationState === "error") {
      return false;
    } else {
      this.onSubmitAction({ name, email, team, teamLead, role, skills, experience, _id: this.id });
      this.props.history.push("/");
    }
  }

  render () {
    const isDisabled = this.getValidationState() === "error" ? this.state.isDisabled = true : this.state.isDisabled = false;

    return(
      <div className="row">
        <div className="form-section col-md-6 offset-md-3 col-xs-12">
          <div className="panel-heading">
            <h3 className="panel-title">{this.title}</h3>
          </div>
          <hr />
          <Form>
            <ControlLabel>Name<sup><i className="fa fa-asterisk required"></i></sup></ControlLabel>
            <FormGroup controlId="name">
              <FormControl
                type="text"
                name="name"
                placeholder="Enter your name"
                value={this.state.name}
                onChange={this.onInputChange}
                autoFocus
                required />
            </FormGroup>

            <ControlLabel>Email<sup><i className="fa fa-asterisk required"></i></sup></ControlLabel>
            <FormGroup controlId="email">
              <FormControl
                type="email"
                name="email"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={this.onInputChange} />
            </FormGroup>

            <FormGroup controlId="teamLead">
              <span className="right-spacer">Team Lead</span>
              <Checkbox
                name="teamLead"
                value={this.state.teamLead}
                checked={this.state.teamLead ? "checked" : ""}
                onChange={this.onInputChange}
                inline>
              </Checkbox>
            </FormGroup>

            <ControlLabel>Experience</ControlLabel>
            <FormGroup controlId="experience">
              <Radio
                className="right-spacer"
                name="experience"
                value="Senior Level"
                checked={this.state.experience === "Senior Level"}
                onChange={this.onInputChange}
                inline>
                <span className="left-spacer">Senior Level</span>
              </Radio>
              <Radio
                className="right-spacer"
                name="experience"
                value="Mid Level"
                checked={this.state.experience === "Mid Level"}
                onChange={this.onInputChange}
                inline>
                <span className="left-spacer">Mid Level</span>
              </Radio>
              <Radio
                className="right-spacer"
                name="experience"
                value="Junior Level"
                checked={this.state.experience === "Junior Level"}
                onChange={this.onInputChange}
                inline>
                <span className="left-spacer">Junior Level</span>
              </Radio>
              <Radio
                className="right-spacer"
                name="experience"
                value="Level not applicable"
                checked={this.state.experience === "Level not applicable"}
                onChange={this.onInputChange}
                inline>
                <span className="left-spacer">Level not applicable</span>
              </Radio>
            </FormGroup>

            <SelectTeam
              name="team"
              teams={this.props.teams}
              selected={this.state.team}
              onSelect={(e) => {
              this.onInputChange(e); }} />

            <SelectRole
              roles={this.props.roles}
              selected={this.state.role}
              onSelect={(e) => {
              this.onInputChange(e);}} />

            <AddSkills
              id="add-skills"
              onChange={this.onSkillsChange}
              skills={this.state.skills} />

            <p>Please enter one skill at a time</p>
            <Button
              bsStyle="primary"
              disabled={isDisabled}
              onClick={this.onSubmitForm}>
              {this.title}
            </Button>
            <Button type="reset">Reset</Button>
            <CancelButton />
          </Form>
        </div>
      </div>
    );
  }
};

TeamMemberForm.propTypes = {
  createTeamMember: PropTypes.func,
  roles: PropTypes.array,
  teams: PropTypes.array,
  teamMember: PropTypes.object
};

export default TeamMemberForm;