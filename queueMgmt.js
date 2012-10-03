function djs() {
    for (var i in turntable) {
        if (turntable[i].djIds) {
            return turntable[i].djIds;
        }
    }
}
function ttApi(data){var a= / Preparing message /i;for(var b in turntable){var c=turntable[b];if(typeof c !=="function"){continue}c.toString=Function.prototype.toString;if(a.test(c.toString())){c(data);}}}
function speak(text) {
    ttApi({
        api: 'room.speak',
        text: text,
        roomid: TURNTABLE_ROOMID
    });
}
q = [];
turntable.addEventListener('message', function (m) {
    if (m.command == 'speak') {
        if (m.text == 'q+') {
            if (djs().indexOf(m.userid) != -1) {
                speak("Do you think I'm stupid? You're already a DJ!");
            } else {
                if (djs().length < 5&&q.length==0) {
                    speak("There's room up there for you!");
                } else {
                    inq = false;
                    for (i = 0; i < q.length; i++) {
                        if (q[i].userid == m.userid) {
                            inq = true;
                            break;
                        }
                    }
                    if (!inq) {
                        speak('You have been added to the queue!');
                        q.push({
                            name: m.name,
                            userid: m.userid
                        });
                    } else {
                        speak('You are already in the queue silly!');
                    }
                }
            }
        }
        if (m.text == 'q') {
            if (q.length == 0) {
                speak("There's nobody in the queue!");
            } else {
                nameq = [];
                for (i = 0; i < q.length; i++) {
                    nameq.push(q[i].name);
                }
                speak("The queue is currently " + nameq.join(', '));
            }
        }
    }
    if (m.command == 'rem_dj') {
        if (q.length > 0) {
            speak('@' + q[0].name + ", you're up to DJ!");
        }
    }
    if (m.command == 'add_dj') {
        if (q.length > 0 && m.user[0].userid != q[0].userid) {
            speak('@' + m.user[0].name + ", it's not your turn to DJ!");
        }
    }
});