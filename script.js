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
        var fullFormat = $('#fullFormat').val();
        var dateCreated = $('#dateCreated').val();
        var dateExpired = $('#dateExpired').val();
        var note = $('#note').val();

        var action = id === '' ? 'addProxy' : 'editProxy';

        $.ajax({
            type: 'POST',
            url: 'api.php',
            dataType: 'json',
            data: {
                [action]: true,
                id: id,
                fullFormat: fullFormat,
                dateCreated: dateCreated,
                dateExpired: dateExpired,
                note: note
            },
            success: function(response) {
                if (response.success) {
                    reloadTable();
                    closeModal();
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                alert('Error: ' + error);
            }
        });
    };

    window.deleteProxy = function(id) {
        var confirmDelete = confirm('Are you sure you want to delete this proxy?');
        
        if (confirmDelete) {
            $.ajax({
                type: 'POST',
                url: 'api.php',
                dataType: 'json',
                data: {
                    deleteProxy: true,
                    id: id
                },
                success: function(response) {
                    if (response.success) {
                        reloadTable();
                    } else {
                        alert('Error: ' + response.message);
                    }
                },
                error: function(xhr, status, error) {
                    alert('Error: ' + error);
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
