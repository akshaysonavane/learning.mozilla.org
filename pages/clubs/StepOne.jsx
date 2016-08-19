var React = require('react');
var ReactDOM = require('react-dom');
var LocationSelector = require('../../components/LocationSelector.jsx');
var Select = require('react-select');

var Formed = require('./Formed.jsx');

var fields = {
  name: {
    type: "text",
    label: "Name",
    placeholder: "Your full name",
  },
  location: {
    type: LocationSelector,
    label: "Location",
    placeholder: "City, Country"    
  },
  occupation: {
    type: "text",
    label: "Occupation",
    placeholder: "Student or professional at ..."
  },
  regionalCoordinator: {
    type: "choiceGroup",
    label: "Are you currently working with a Regional Coordinator?",
    options: [ " Yes", " No" ],
  },
  coordinatorName: {
    type: "text",
    label: "What is your Regional Coordinator's name?",
    placeholder: "Name",
    hidden: true,
    controller: {
      name: "regionalCoordinator",
      value: " Yes"
    },
    // this field does not count towards progress
    metered: false
  },
  hostReason: {
    type: "text",
    label: "Why do you want to host a Mozilla Club?",
    placeholder: "Describe what you want to achieve and what your goals are. Minimum length 50 words."
  },
  howDidYouHear: {
    type: Select,
    label: "How did you hear about Mozilla Clubs?",
    options: [
      { value: 'from a friend', label: 'from a friend' },
      { value: 'from an event', label: 'from an event' },
      { value: 'Mozilla website', label: 'Mozilla website' },
      { value: 'Social media', label: 'Social media' },
      { value: 'other', label: 'other' }
    ],
    other: {
      type: "text",
      placeholder: "Let us know how  you heard about becoming a club captain"
    }
  }
};

var validators = {
  name: {
    error: "You must provide a name for your club."
  },
  location: {
    error: "You must provide a location for your club."
  },
  occupation: {
    error: "Please let us know what your occupation is."
  },
  regionalCoordinator: {
    error: "You must say whether or not you're working with a regional coordinator."
  },
  coordinatorName: {
    error: "If you work with a Regional Coordinator, you must indicate who they are."
  },
  hostReason: [
    {
      error: "You must explain the reason for applying."
    },
    {
      validate: function(value) {
        if (!value) return false;
        var count = value.trim().split(' ').length;
        return count < 45;
      },
      error: "Please explain the reason for applying using 45 words or more."
    }
  ],
  howDidYouHear: {
    error: "Please tell us how you heard about this program."
  }
};

var StepOne = React.createClass({
  render: function() {
    return <Formed {...{ fields, validators, onChange: this.props.onChange, onProgress: this.props.onProgress }} />;
  }
});

module.exports = StepOne;
