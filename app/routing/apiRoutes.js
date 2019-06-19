var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
      });

    app.post("/api/friends", function(req, res) {
        console.log(req.body.answers);
        // LOOP through user answers
        var user = req.body;
        for (var i = 0; i < user.answers.length; i++) {
            user.answers[i] = parseInt(user.answers[i]);
        }
        //COMPARE user answers to each entry in the friendsArray
        var friendIndex = 0;
        var minDif = 40;

        //DETERMINE which entry in the friendsArray has answers closest to user
        for (var i = 0; i < friends.length; i++) {
            var totalDif = 0;
            for (var j = 0; j < friends[i].answers.length; j++) {
                var difference = Math.abs(user.answers[j] - friends[i].answers[j]);
                totalDif += difference;
            }

            if (totalDif < minDif) {
                friendIndex = i;
                minDif = totalDif;
            }
        }
       
       //PUSH user answers to friendsArray
       friends.push(user);
       //send match back to browser
       res.json(friends[friendIndex]);
    });
}