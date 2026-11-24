let audioCtx;

function tone(freq, start, duration, type = "sine", volume = 0.25) {
    const t = audioCtx.currentTime + start;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + duration);
}

window.playSound = (name) => {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();

    if (name === "drop") {
        tone(600, 0, 0.1);
        tone(400, 0.1, 0.15, "triangle");
    } else if (name === "win") {
        [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.15, 0.3, "square", 0.15));
    }
};