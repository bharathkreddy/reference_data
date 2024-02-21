const dateFormatter = (params) => {
    return new Date(params.value).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};


document.addEventListener('DOMContentLoaded', function () {
    var columnDefs = [
        { headerName: "User Bank", field: "userbank" },
        { headerName: "Account Number", field: "accountnumber" },
        { headerName: "Active Date", field: "activedate", valueFormatter: dateFormatter },
        { headerName: "Valid To Date", field: "validtodate", valueFormatter: dateFormatter },
        { headerName: "Fund Name", field: "fundname",checkboxSelection: true },
        { headerName: "Multi Manager", field: "multimanager", cellRenderer: params => params.value ? 'Yes' : 'No' },
        { headerName: "Legal Structure", field: "legalstructure" },
        { headerName: "Distribution Date", field: "distributiondate" },
        { headerName: "Performance Fee Rate", field: "performancefeerate" },
        { headerName: "TER", field: "ter" },
        { headerName: "Valuation Point", field: "valuationpoint" },
        { headerName: "Internal SLA", field: "internalsla" },
        { headerName: "External SLA", field: "externalsla" }
    ];

    // Grid options
    var gridOptions = {
        columnDefs: columnDefs,
        defaultColDef: {
            sortable: true,
            filter: true,
            resizable: true
        },
        rowData: fundsData // fundsData will be assigned from the global variable declared in index.ejs
    };

    // Setup the grid after the DOM has finished loading
    var eGridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(eGridDiv, gridOptions);
});
