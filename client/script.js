const socket = io("http://localhost:5000");

const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
const stats = document.getElementById("stats");

let peer;

let bandwidthWindow = []; // QUEUE (Sliding Window)

// 🎯 Fake Bandwidth Generator
function getBandwidth() {
  return Math.floor(Math.random() * 5000) + 500; // kbps
}

// 🎯 Sliding Window Logic
function getAverageBandwidth(bw) {
  bandwidthWindow.push(bw);
  if (bandwidthWindow.length > 5) bandwidthWindow.shift();

  const sum = bandwidthWindow.reduce((a, b) => a + b, 0);
  return Math.floor(sum / bandwidthWindow.length);
}

// 🎯 Greedy Quality Selection
function getQuality(avg) {
  if (avg < 1500) return "LOW (360p)";
  if (avg < 3000) return "MEDIUM (720p)";
  return "HIGH (1080p)";
}

// 🎥 Start Video
async function startVideo() {
  peer = new RTCPeerConnection();

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  });

  localVideo.srcObject = stream;
  stream.getTracks().forEach(track => peer.addTrack(track, stream));

  peer.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };

  peer.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", event.candidate);
    }
  };

  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  socket.emit("offer", offer);
}

// 🔄 Socket events
socket.on("offer", async (offer) => {
  peer = new RTCPeerConnection();
  await peer.setRemoteDescription(offer);

  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = stream;
  stream.getTracks().forEach(track => peer.addTrack(track, stream));

  peer.ontrack = e => remoteVideo.srcObject = e.streams[0];

  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  socket.emit("answer", answer);
});

socket.on("answer", async (answer) => {
  await peer.setRemoteDescription(answer);
});

socket.on("ice-candidate", async (candidate) => {
  await peer.addIceCandidate(candidate);
});

// 📊 Bandwidth Monitoring
const bwEl = document.getElementById("bw");
const avgEl = document.getElementById("avg");
const qualityEl = document.getElementById("quality");

setInterval(() => {
  const bw = getBandwidth();
  const avg = getAverageBandwidth(bw);
  const quality = getVideoQuality(avg);

  bwEl.innerText = `${bw} kbps`;
  avgEl.innerText = `${avg} kbps`;

  qualityEl.innerText = quality;
  qualityEl.className = `badge ${quality.split(" ")[0]}`;
}, 2000);


startVideo();
