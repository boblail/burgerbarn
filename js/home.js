if(Prototype.Browser.WebKit) {
  var viewport_element = $$("body").first();
} else {
  var viewport_element = $$("html").first();
}

window.debug = function(s) {
  if(window.console && window.console.log) {
    window.console.log(s);
  }
}

var Story = {
  transitions: [
    {transition:   0, rest: 2500}, // Page  1: Logo
    {transition: 1.8, rest: 2000}, // Page  2: BB claims to serve over 1 million hamburgers
    {transition: 2.0, rest: 3600}, // Page  3: How many different toppings?
    {transition: 0.8, rest: 2000}, // Page  4: 20 (formula)
    {transition: 1.0, rest:  300}, // Page  5: That's not very impressive
    {transition: 1.0, rest:  500}, // Page  6: We could do better
    {transition: 1.2, rest: 2000}, // Page  7: Logo
    {transition: 0.6, rest:  100}, // Page  8: April 15
    {transition: 0.6, rest:  100}, // Page  9: 30 toppings
    {transition: 0.6, rest:  500}, // Page 10: 1 billion possibilities
    {transition: 1.0, rest:    0}, // Page 11: directions
  ],
  scroll_to_top: function() {
    Story.scroll_to_chapter(1);
  },
  scroll_to_chapter: function(chapter, duration, callback) {
    var id = 'page-' + chapter;
    viewport_element.scrollTo($(id).cumulativeOffset().top, {
      duration: duration,
      transition: 'easeFromTo',
      after: callback
    });
  },
  tell: function() {
    var transitions = Story.transitions.clone();
    var chapter = 0;
    function go() {
      var transition = transitions.shift();
      chapter = chapter + 1;
      if(transition) {
        Story.scroll_to_chapter(chapter, transition.transition, function() {
          window.setTimeout(go, transition.rest);
        });
      }
    }
    go();
  }
}

var FixedRibbon = {
  initialize: function() {
    $('start').observe('click', Story.tell);
    Story.tell();
    // window.setTimeout(Story.tell, 2500);
  }
}

FixedRibbon.initialize();