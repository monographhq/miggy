
const randomInt = (min = 2, max = 5) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function (i, date) {
  const COLORS = ["#D96EE9", "#41EAD4", "#3182FB", "#FDBD2F", "#5541EA"];
  const PHASES = ["SD", "DD", "CD", "BID", "CA"];

  const setDate = () => {
    const ourDate = new Date();

    const pastDate = ourDate.getDate() - 21 - i * 3;
    ourDate.setDate(pastDate);

    return ourDate;
  };

  const spendMoney = (i) => {
    const probability = randomInt(1, 6);
    if (probability > 4 || i > 2) return randomInt(50, 100);
    return 100;
  };


  const createPhase = (i) => {
    return {
      abbr: PHASES[i],
      width: randomInt(120, 600),
      money: spendMoney(i),
    };
  };

  const setPhases = () => {
    return Array.from({ length: randomInt() }, (x, i) => createPhase(i));
  };

  return {
    date: setDate(),
    color: COLORS[i],
    left: (5 - i) * 200 - randomInt(5, 50),
    phases: setPhases(),
  };
}
