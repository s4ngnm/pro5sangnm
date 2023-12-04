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
// Function to add a new proxy using modal
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
        openModal();
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
        openModal();
        // Fetch proxy details and pre-fill the form
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

    // Function to save proxy from modal
    window.saveProxy = function() {
        var id = ''; // You may need to include the ID if it's an edit operation
        var fullFormat = document.getElementById('fullFormat').value;
        var dateCreated = document.getElementById('dateCreated').value;
        var dateExpired = document.getElementById('dateExpired').value;
        var note = document.getElementById('note').value;

        // Determine if it's an add or edit operation
        var action = id === '' ? 'addProxy' : 'editProxy';

        // Send data to the server using AJAX
        $.post('api.php', {
            [action]: true,
            id: id,
            fullFormat: fullFormat,
            dateCreated: dateCreated,
            dateExpired: dateExpired,
            note: note
        }, function() {
            reloadTable();
            closeModal(); // Close the modal after saving
        });
    };

    // ... (Phần JavaScript trước đó)

    // Function to open modal for adding/editing proxy
    window.openModal = function() {
        document.getElementById('proxyModal').style.display = 'block';
    };

    // Function to close modal
    window.closeModal = function() {
        document.getElementById('proxyModal').style.display = 'none';
    };

// ... (Phần JavaScript tiếp theo)


});
