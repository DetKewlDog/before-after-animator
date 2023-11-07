function goFullScreen() {
    const el = document.documentElement;
    const func = el.requestFullScreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen;
    func.call(el);
}

function exitFullscreen() {
    const func = document.exitFullscreen
        || document.webkitExitFullscreen
        || document.mozExitFullScreen
        || document.msExitFullscreen;
    func.call(el);
}

function fullScreenEnabled() {
    return document.fullscreen ||
        document.webkitfullscreen ||
        document.mozfullscreen ||
        document.msfullscreen;
}

function resetAnimations() {
    document.getAnimations().forEach(i => {
        i.cancel();
        i.play();
    });
}

function record(duration) {
    const options = {
        video: {
            displaySurface: "browser",
            frameRate: { ideal: 60 },
        },
        audio: false,
        surfaceSwitching: "exclude",
        selfBrowserSurface: "include",
        systemAudio: "exclude",
    };

    navigator.mediaDevices.getDisplayMedia(options)
        .then(async stream => {
            let recorder = new MediaRecorder(stream);

            const fullscreen = fullScreenEnabled();

            recorder.onstart = () => {
                setTimeout(() => recorder.stop(), duration * 750);
            }
            recorder.ondataavailable = e => {
                window.open(URL.createObjectURL(
                    new Blob([e.data], { "type": "video/mp4" })
                ));
                stream.getTracks().forEach(track => track.stop());
                document.body.classList.remove('hide-cursor');
                if (!fullscreen) exitFullscreen();
            }
            document.body.classList.add('hide-cursor');
            if (!fullscreen) goFullScreen();
            resetAnimations();
            recorder.start();
        });
}

export default record;