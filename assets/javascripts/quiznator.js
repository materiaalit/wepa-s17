import TmcClient from 'tmc-client-js';
import Spyware from 'tmc-analytics';

const client = new TmcClient();

const spywares = {};

function onFieldChange(e) {
  const DELETE_KEY = 8;

  const user = client.getUser();
  const keyCode = e.which || e.keyCode;
  const action = keyCode === DELETE_KEY ? 'text_remove' : 'text_insert';
  const content = e.target.value;
  const elemNode = $(e.target);
  const pluginElem = elemNode.closest('.quiznator-plugin');
  const quizId = pluginElem.data('quiz-id');
  const exerciseName = `quiznator-${quizId}`;

  const quiznatorSpyware = spywares[quizId]
    ? spywares[quizId]
    : new Spyware(user.username, user.accessToken, 'ohpe-s17', exerciseName, 'https://hy.spyware.testmycode.net');

  quiznatorSpyware.spyEvent(exerciseName, content, action);
}

function initSnapshotListeners() {
  $('.quiznator-plugin').on('keyup', 'textarea', onFieldChange);
  $('.quiznator-plugin').on('keyup', 'input[type="text"]', onFieldChange);
}

function init() {
  const user = client.getUser();

  window.Quiznator.setUser({
    id: user.username,
    accessToken: user.accessToken
  });

  window.Quiznator.refreshAgreement({
    userId: user.username,
    quizId: '59f605c6271b380004a262f5'
  });

  initSnapshotListeners();
}

function initQuiznator() {
  if(!window._QUIZNATOR_ENABLED) {
    return;
  }

  if(window.Quiznator) {
    init();
  } else {
    document.addEventListener('quiznatorLoaded', init);
  }
}

export default initQuiznator;
