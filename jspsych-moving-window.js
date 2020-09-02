/*
 * Example plugin template
 */

jsPsych.plugins["visual-analog-scale"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "visual-analog-scale",
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT,new_html_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined,
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        default: jsPsych.ALL_KEYS,
        array: true
      },
      labels: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        default: [],
        array: true
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        default: true,
      },
      start: {
        type: jsPsych.plugins.parameterType.INT,
        default: null,
        array: false
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    
    var new_html = "<div id = 'jspsych-html-keyboard-response-stimulus';>" + trial.stimulus + "</div>"
    
    new_html += '<br>';
    new_html += '<br>';
    new_html += '<br>';
    new_html += '<br>';
    new_html += '<br>';
    new_html += '<br>';
    new_html += '<br>';

    new_html += '<div class="lineContainer"><div class="line"></div>'
    new_html += '<div div class="line"></div>'
    new_html += '<div class="line" ></div >'
    new_html += '<div class="line"></div>'
    new_html += '<div class="line"></div>'
    new_html += '<div class="line lineRightEnd"></div>'
    new_html += '<div class="textContainer"><div class="textLeftEnd"></div>'
    new_html += '<div class="text">' + trial.labels[0] + '</div>'
    new_html += '<div class="text">' + trial.labels[1] + '</div>'
    new_html += '<div class="text">' + trial.labels[2] + '</div>'
    new_html += '<div class="text">'+ trial.labels[3] + '</div>'
    new_html += '<div class="text">' + trial.labels[4] + '</div>'
    new_html += '</div></div>'
    // add prompt
    if(trial.prompt !== null){
      new_html += trial.prompt;
    }

    // draw
    display_element.innerHTML = new_html;

    // store response
    var response = {
      rt: null,
      key: null
    };
    
    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
    
      
      

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }
      
      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "stimulus": trial.stimulus,
        "key_press": jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(response.key)
      };
     
      
  
      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-html-keyboard-response-stimulus').className += ' responded';

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }

    // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-keyboard-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

  };

  
  return plugin;
})();
