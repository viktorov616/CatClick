export function secondsToMinutes(seconds) {
  if (!seconds) return null;

  return (
    `${Math.floor(seconds / 60)}${
      seconds % 60 ? `:${seconds % 60}` : ':00'}`
  );
}