$(function() {
    var x = {
        "80": 10,
        "79": 9,
        "73": 8,
        "85": 7,
        "89": 6,
        "84": 5,
        "82": 4,
        "69": 3,
        "87": 2,
        "81": 1,
        "186": 10,
        "76": 9,
        "75": 8,
        "74": 7,
        "72": 6,
        "71": 5,
        "70": 4,
        "68": 3,
        "83": 2,
        "65": 1,
        "80": 10,
        "191": 9,
        "190": 8,
        "188": 7,
        "77": 6,
        "78": 5,
        "66": 4,
        "86": 3,
        "67": 2,
        "88": 1,
        "90": 0,
        "16": "s",
    };
    var shiftDownFlag = false,
        shiftPressFlag = false,
        lastPos = 0,
        currentPos = 0,
        sumLength = 0,
        firstKey = 0,
        firstKeyFlag = 0;

    $("#textinput").on("keydown", function(e) {
        var length = $(this).val().length;

        if (x[e.which] === "s" && shiftPressFlag === false) {
            shiftDownFlag = true;
            shiftPressFlag = true;
            // $("#log").append("shift1<br>");
        } else if (shiftPressFlag && x[e.which] != undefined && x[e.which] != "s") {
            e.preventDefault();

            if (firstKeyFlag === 0) {
                firstKey = e.which;
                firstKeyFlag = 1;
            } else if (firstKeyFlag === 1) {
                firstKeyFlag = 2;
            }

            lastPos = currentPos;
            currentPos = x[e.which];
            if (currentPos < lastPos) {
                sumLength += lastPos - currentPos;
            }
            $(this).selectRange(length - sumLength, length);
            shiftDownFlag = false;
            // $("#log").append(currentPos + "<br>");
        }
    });
    $("#textinput").on("keyup", function(e) {
        var length = $(this).val().length;
        if (x[e.which] === "s") {
            if (firstKeyFlag === 1) {
                $(this).val($(this).val() + String.fromCharCode(firstKey));
                // $("#log").append(firstKey + "<br>");
            } else {
                $(this).val($(this).val().slice(0, length - sumLength));
            }
            shiftDownFlag = false;
            shiftPressFlag = false;
            lastPos = 0;
            currentPos = 0;
            sumLength = 0;
            firstKey = 0;
            firstKeyFlag = 0;
        }
    });
});
