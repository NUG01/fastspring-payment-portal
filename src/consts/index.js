export const fsSecretKey = () => {
  const combined =
    import.meta.env.VITE_FS_USERNAME_SECRET +
    ":" +
    import.meta.env.VITE_FS_PASSWORD_SECRET;

  const base64Encoded = btoa(combined);

  return "Basic " + base64Encoded;
};
