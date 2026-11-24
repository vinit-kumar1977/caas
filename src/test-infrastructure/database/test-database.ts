export function isDatabaseAvailable(): boolean {
  return Boolean(
    process.env.DB_HOST &&
    process.env.DB_NAME &&
    process.env.DB_USER,
  );
}
