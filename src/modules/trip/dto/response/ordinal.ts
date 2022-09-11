export const ordinal = (element: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = element % 100;
  return element + (s[(v - 20) % 10] || s[v] || s[0]);
};
