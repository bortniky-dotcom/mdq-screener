(function () {
  var Q1 = ["…you felt so good or so hyper that other people thought you were not your normal self or you were so hyper that you got into trouble?","…you were so irritable that you shouted at people or started fights or arguments?","…you felt much more self-confident than usual?","…you got much less sleep than usual and found you didn’t really miss it?","…you were much more talkative or spoke faster than usual?","…thoughts raced through your head or you couldn’t slow your mind down?","…you were so easily distracted by things around you that you had trouble concentrating or staying on track?","…you had much more energy than usual?","…you were much more active or did many more things than usual?","…you were much more social or outgoing than usual, for example, you telephoned friends in the middle of the night?","…you were much more interested in sex than usual?","…you did things that were unusual for you or that other people might have thought were excessive, foolish, or risky?","…spending money got you or your family in trouble?"];
  var YN = [{ v: 1, l: "Yes", show: false }, { v: 0, l: "No", show: false }];
  window.CFG = {
    slug: "mdq", short: "MDQ", sub: "Mood Disorder Questionnaire",
    intro: "Instructions: Check the answer that best applies to you. Please answer each question as best you can.",
    sections: [
      { id: "s1", title: "1. Has there ever been a period of time when you were not your usual self and…", items: Q1.map(function (t, i) { return { id: "q1_" + (i + 1), num: "1." + String.fromCharCode(97 + i), text: t, opts: YN }; }) },
      { id: "s2", title: "Questions 2 to 5", items: [
        { id: "q2", num: "2.", text: "If you checked YES to more than one of the above, have several of these ever happened during the same period of time? Please check 1 response only.", opts: YN },
        { id: "q3", num: "3.", text: "How much of a problem did any of these cause you — like being able to work; having family, money, or legal troubles; getting into arguments or fights? Please check 1 response only.", opts: [{ v: 0, l: "No problem", show: false }, { v: 1, l: "Minor problem", show: false }, { v: 2, l: "Moderate problem", show: false }, { v: 3, l: "Serious problem", show: false }] },
        { id: "q4", num: "4.", text: "Have any of your blood relatives (ie, children, siblings, parents, grandparents, aunts, uncles) had manic-depressive illness or bipolar disorder?", opts: YN },
        { id: "q5", num: "5.", text: "Has a health professional ever told you that you have manic-depressive illness or bipolar disorder?", opts: YN }
      ] }
    ],
    scoringHint: '<p class="hint">Further medical assessment for bipolar disorder is clearly warranted if patient: answers Yes to 7 or more of the events in question #1 AND answers Yes to question #2 AND answers Moderate problem or Serious problem to question #3. This questionnaire should be used as a starting point. It is not a substitute for a full medical evaluation.</p>',
    footer: "MDQ · Adapted from Hirschfeld et al, Am J Psychiatry 2000 · screening only, not diagnostic",
    score: function (A, H) {
      var ids = H.ids("q1_", 1, 13), yes = H.count(A, ids, function (v) { return v === 1; }), miss = H.missing(A, ids).length;
      var c1 = yes >= 7, c2 = A.q2 === 1, c3 = A.q3 === 2 || A.q3 === 3;
      var unk = (!c1 && yes + miss >= 7) || A.q2 === null || A.q3 === null;
      var pos = c1 && c2 && c3;
      var res = pos ? "POSITIVE: further assessment for bipolar disorder clearly warranted" : (unk ? "Incomplete, not scored (blank answers could change the result)" : "Negative screen");
      return { incomplete: unk && !pos, rows: [["Q1 Yes count (of 13)", yes + (miss ? " (" + miss + " blank)" : "")], ["Q1: 7 or more Yes", c1 ? "met" : "not met"], ["Q2: Yes", A.q2 === null ? "blank" : (c2 ? "met" : "not met")], ["Q3: Moderate or Serious", A.q3 === null ? "blank" : (c3 ? "met" : "not met")], ["Q4 family history", A.q4 === null ? "blank" : (A.q4 ? "Yes" : "No")], ["Q5 prior bipolar diagnosis", A.q5 === null ? "blank" : (A.q5 ? "Yes" : "No")], ["Result", res]] };
    }
  };
})();
