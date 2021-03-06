export const parseTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.round(time % 60);

  return `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
}

export const parseProcess = (currentTime, duration) => {
  return (currentTime / duration) * 100;
}

export const parseVolumeByClientX = (baseClientX, currentClientX, volumeElementWidth) => {
  const rawVolumeValue = (currentClientX - baseClientX) / volumeElementWidth;

  let volumeValue = Math.min(rawVolumeValue, 1);
  volumeValue = Math.max(0, volumeValue);

  return volumeValue;
}