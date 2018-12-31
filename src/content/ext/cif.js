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
        args.remote = args.remote + '/indicators';
        if (args.query) {
            args.remote += '?q=' + args.query
        }
        if (args.filters){
            if(args.query){
                args.remote += '&';
            } else {
                args.remote += '?';
            }
            for (var i in args.filters){
                args.remote += i + '=' + args.filters[i] + '&';
            }
            args.remote = args.remote.substr(0, args.remote.length - 1);
        }
        this.get(args);
    }
};
