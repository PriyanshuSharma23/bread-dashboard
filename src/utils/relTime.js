const f = new Intl.RelativeTimeFormat("en", { style: "narrow" });

export const relativeTime = (d) => {
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  if (months > 0) {
    return f.format(-months, "month");
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days > 0) {
    return f.format(-days, "day");
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours > 0) {
    return f.format(-hours, "hour");
  }

  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes > 0) {
    return f.format(-minutes, "minute");
  }

  return "just now";
};
