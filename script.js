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
                    return '<button class="btn btn-warning btn-sm" onclick="editProxy(\'' + row.id + '\')">Edit</button>' +
                           '<button class="btn btn-danger btn-sm" onclick="deleteProxy(\'' + row.id + '\')">Delete</button>';
                }
            }
        ]
    });

    function reloadTable() {
        table.ajax.reload();
    }

    window.addProxy = function() {
        openModal();
    };

    window.editProxy = function(id) {
        openModal();

        $.get('api.php?id=' + id, function(data) {
            if (data.length > 0) {
                var proxy = data[0];
                document.getElementById('fullFormat').value = proxy.fullFormat;
                document.getElementById('dateCreated').value = proxy.dateCreated;
                document.getElementById('dateExpired').value = proxy.dateExpired;
                document.getElementById('note').value = proxy.note;
            }
        });
    };

    window.saveProxy = function() {
        var id = '';
        var fullFormat = document.getElementById('fullFormat').value;
        var dateCreated = document.getElementById('dateCreated').value;
        var dateExpired = document.getElementById('dateExpired').value;
        var note = document.getElementById('note').value;

        var action = id === '' ? 'addProxy' : 'editProxy';

        $.post('api.php', {
            [action]: true,
            id: id,
            fullFormat: fullFormat,
            dateCreated: dateCreated,
            dateExpired: dateExpired,
            note: note
        }, function(response) {
            if (response.success) {
                reloadTable();
                closeModal();
            } else {
                alert('Error: ' + response.message);
            }
        });
    };

    window.deleteProxy = function(id) {
        var confirmDelete = confirm('Are you sure you want to delete this proxy?');
        
        if (confirmDelete) {
            $.post('api.php', {
                deleteProxy: true,
                id: id
            }, function(response) {
                if (response.success) {
                    reloadTable();
                } else {
                    alert('Error: ' + response.message);
                }
            });
        }
    };

    window.openModal = function() {
        document.getElementById('proxyModal').style.display = 'block';
    };

    window.closeModal = function() {
        document.getElementById('proxyModal').style.display = 'none';
    };
});
