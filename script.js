$(document).ready(function() {
    var table = $('#proxyTable').DataTable({
        ajax: {
            url: 'api.php',
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

    function reloadTable() {
        table.ajax.reload();
    }

    window.addProxy = function() {
        var fullFormat = prompt('Enter Proxy (IP:Port:Username:Password)');
        var dateCreated = prompt('Enter Date Created');
        var dateExpired = prompt('Enter Date Expired');
        var note = prompt('Enter Note');

        $.post('api.php', {
            addProxy: true,
            fullFormat: fullFormat,
            dateCreated: dateCreated,
            dateExpired: dateExpired,
            note: note
        }, function() {
            reloadTable();
        });
    };

    window.editProxy = function(id) {
        var fullFormat = prompt('Enter Proxy (IP:Port:Username:Password)');
        var dateCreated = prompt('Enter Date Created');
        var dateExpired = prompt('Enter Date Expired');
        var note = prompt('Enter Note');

        $.post('api.php', {
            editProxy: true,
            id: id,
            fullFormat: fullFormat,
            dateCreated: dateCreated,
            dateExpired: dateExpired,
            note: note
        }, function() {
            reloadTable();
        });
    };

    window.deleteProxy = function(id) {
        var confirmDelete = confirm('Are you sure you want to delete this proxy?');
        
        if (confirmDelete) {
            $.post('api.php', {
                deleteProxy: true,
                id: id
            }, function() {
                reloadTable();
            });
        }
    };
});
