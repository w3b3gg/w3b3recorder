if (!ct.hasOwnProperty('w3b3')) ct.w3b3 = {}
ct.w3b3.recorder = {}
ct.w3b3.recorder.initialize = (_game) => {
  const _mediaRecorder = new MediaRecorder(_game.captureStream())
  const _frames = []

  ct.w3b3.recorder.readyToDownload = false
  ct.w3b3.recorder.downloadWhenRecordingStops = false
  ct.w3b3.recorder.downloadLink = window.document.createElement('a')
  ct.w3b3.recorder.start = () => {
    ct.w3b3.recorder.readyToDownload = false
    _mediaRecorder.start()
  }
  ct.w3b3.recorder.stop = () => _mediaRecorder.stop()
  ct.w3b3.recorder.download = () =>  {
    if (ct.w3b3.recorder.readyToDownload) {
      ct.w3b3.recorder.downloadLink.click()
    }
  }
  
  _mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) _frames.push(event.data)
  }
  
  _mediaRecorder.onstop = () => {
    ct.w3b3.recorder.videoBlob = new window.Blob(_frames, {type: 'video/webm'})
    ct.w3b3.recorder.blobFile = new window.File([ct.w3b3.recorder.videoBlob], 'video.webm', {type: 'video/webm'})
    ct.w3b3.recorder.videoURL = window.URL.createObjectURL(ct.w3b3.recorder.videoBlob)
  
    ct.w3b3.recorder.downloadLink.href = ct.w3b3.recorder.videoURL
    ct.w3b3.recorder.downloadLink.download = ct.w3b3.recorder.blobFile.name
    ct.w3b3.recorder.downloadLink.textContent = 'Download video'

    document.body.appendChild(ct.w3b3.recorder.downloadLink)
    ct.w3b3.recorder.readyToDownload = true

    if (ct.w3b3.recorder.downloadWhenRecordingStops) ct.w3b3.recorder.download()
  }
}