var CIFSDK = {
    get: function(args) {
        function setHeaders (xhr) {
            xhr.setRequestHeader('Authorization', 'Token token=' + args.token);
            xhr.setRequestHeader('Accept', 'application/vnd.cif.v3+json');
        }
        $.ajax({
            url: args.remote,
            type: 'GET',
            dataType: 'json',
            success: args.success,
            error: args.error,
            beforeSend: setHeaders,
            cache: args.cache || false
        });
    },

    post: function(args) {
        function setHeaders(xhr) {
            xhr.setRequestHeader('Authorization', 'Token token=' + args.token);
            xhr.setRequestHeader('Accept', 'application/vnd.cif.v3+json');
        }

        $.ajax({
            url: args.remote,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            success: args.success,
            error: args.error,
            beforeSend: setHeaders,
            data: JSON.stringify(args.data)
        });
    },

    ping: function(args) {
        args.remote = args.remote + '/ping';
        this.get(args);
    },

    submit: function(args) {
        args.remote = args.remote + '/indicators';
        this.post(args);
    },

    search: function(args) {
        console.log(args)
        args.remote = args.remote + '/indicators?';
        for (var i in args.data) {
               args.remote += i + '=' + args.data[i] + '&';
        }
        args.remote = args.remote.substr(0, args.remote.length - 1);
        console.log(args.remote)
        this.get(args);
    }
};
