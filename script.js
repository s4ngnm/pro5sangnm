$(document).ready(function() {
    // Initialize DataTable
    var table = $('#proxyTable').DataTable({
        ajax: {
            url: 'api.php', // Endpoint to fetch data from the server
            dataSrc: ''
        },
        columns: [
            { data: 'fullFormat' },
            { data: 'dateCreated' },
            { data: 'dateExpired' },
            { data: 'note' },
            { 
                data: null,
                render: function(data, type, row) {
                    return '<button onclick="editProxy(\'' + row.id + '\')">Edit</button>' +
                           '<button onclick="deleteProxy(\'' + row.id + '\')">Delete</button>';
                }
            }
        ]
    });

    // Function to reload table data (useful after adding or editing proxy)
    function reloadTable() {
        table.ajax.reload();
    }

    // Function to edit a proxy (you can implement this as needed)
    window.editProxy = function(id) {
        // Implement your edit logic here
        console.log('Edit Proxy ID: ' + id);
    };

    // Function to delete a proxy (you can implement this as needed)
    window.deleteProxy = function(id) {
        // Implement your delete logic here
        console.log('Delete Proxy ID: ' + id);
    };
});
