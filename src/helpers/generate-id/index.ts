export function generateId(i?: number) {
  const rand = Math.floor(
    Math.random() * Math.floor(Math.random() * Date.now())
  );
  return i ? i + "-" + rand : rand;
}
