window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
var getKeyDown = player.getKeyDown;
var keydown = player.keydown;
var keyup = player.keyup;
window.Script5 = function()
{
  // Track unique clicks on flag_1–flag_4 and update FoundCount

// NOTE: Create a Storyline Number variable named FoundCount with initial value 0.

// 1) Init
setVar('FoundCount', 0);

const flags = [
  { name: 'flag_1', obj: object('5dEQN6z8fOv'), key: 'found_flag_1' },
  { name: 'flag_2', obj: object('5fwIloVNKD8'), key: 'found_flag_2' },
  { name: 'flag_3', obj: object('5bwhmAeJuS7'), key: 'found_flag_3' },
  { name: 'flag_4', obj: object('6CpsSAnzmyr'), key: 'found_flag_4' }
];

// Maintain per-slide visited state without adding Storyline variables
window.__spotWarningSigns = window.__spotWarningSigns || {};
const state = window.__spotWarningSigns;

// Ensure keys exist
flags.forEach(f => {
  if (state[f.key] == null) state[f.key] = false;
  // optional affordance
  try { f.obj.style.cursor = 'pointer'; } catch (e) {}
});

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function incrementFoundOnce(flag) {
  if (state[flag.key]) return; // already counted
  state[flag.key] = true;

  const current = Number(getVar('FoundCount')) || 0;
  setVar('FoundCount', clamp(current + 1, 0, 4));
}

// 2) Attach click handlers (do not interfere with existing Storyline triggers)
flags.forEach(flag => {
  flag.obj.click(() => {
    incrementFoundOnce(flag);
  });
});

}

};
