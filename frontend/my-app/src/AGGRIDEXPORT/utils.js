export const defaultColDef = {
  flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  editable: false,
  suppressMenu: false,
  suppressMovable: false,
  suppressSorting: false,
  suppressFilter: false,
};

export const gridOptions = {
  pagination: true,
  paginationPageSize: 10,
  sideBar: {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        minWidth: 225,
        maxWidth: 225,
        width: 225,
      },
      {
        id: "filters",
        labelDefault: "Filters",
        labelKey: "filters",
        iconKey: "filter",
        toolPanel: "agFiltersToolPanel",
        minWidth: 180,
        maxWidth: 400,
        width: 250,
      },
    ],
    position: "left",
    defaultToolPanel: "filters",
  },
};
