export const useDocumentTile = ({ title }) => {
  const dynamicTitle = (document.title = title || "");
  return dynamicTitle;
};
