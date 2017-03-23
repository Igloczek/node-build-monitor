define(['ko', 'moment', 'countdown'], function (ko, moment, countdown) {
    var BuildViewModel = function (build) {
        this.isMenuVisible = ko.observable(false);

        this.id = ko.observable();
        this.isRunning = ko.observable();
        this.project = ko.observable();
        this.definition = ko.observable();
        this.number = ko.observable();
        this.startedAt = ko.observable();
        this.finishedAt = ko.observable();
        this.status = ko.observable(build.status);
        this.statusText = ko.observable();
        this.reason = ko.observable();
        this.requestedFor = ko.observable();
        this.hasWarnings = ko.observable();
        this.hasErrors = ko.observable();
        this.url = ko.observable();
        this.avatar = ko.observable();

        this.update = function (build) {
            this.id(build.id);
            this.isRunning(build.isRunning);
            this.project(build.project);
            this.definition(build.definition);
            this.number(build.number);
            this.startedAt(moment(build.startedAt));
            this.finishedAt(moment(build.finishedAt));
            this.status(build.status);
            this.statusText(build.statusText);
            this.reason(build.reason);
            this.requestedFor(build.requestedFor);
            this.hasWarnings(build.hasWarnings);
            this.hasErrors(build.hasErrors);
            this.url(build.url);
            this.avatar(build.avatar);
        };

        this.update(build);

        this.style = ko.computed(function () {
            if (this.status()) {
                return {
                    'color': 'white',
                    'background-color': this.status().toLowerCase()
                };
            }
        }, this);

        this.time = ko.forcibleComputed(function () {
            return this.isRunning() ?
                'Started ' + moment(this.startedAt()).fromNow() :
                'Finished ' + moment(this.finishedAt()).fromNow();
        }, this);

        this.duration = ko.forcibleComputed(function () {
            return this.isRunning() ?
                'Running for ' + countdown(this.startedAt()).toString() :
                'Ran for ' + countdown(this.startedAt(), this.finishedAt()).toString();
        }, this);

        this.isMenuAvailable = ko.computed(function () {
            return this.url() || false;
        }, this);
    };

    return BuildViewModel;
});
