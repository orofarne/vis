(function(Vis) {

Vis.blocks['b-chart'] = Vis.extend(Vis.blocks['i-chart'], {
    init: function(params) {
        params = params || {};

        this.$object = params.$object;

        this.__base.init(params);

        this.renderObjects();
    },

    renderYAxes: function(pos, layout, method) {
        var _this = this,
            content = _this.content,
            yAxes = content.yAxes;

        var $tr = $('<tr>');
        for (var i = 0, l = yAxes.length; i < l; ++i) {
            var yAxis = yAxes[i];
            if (yAxis.pos !== pos) {
                continue;
            }

            var c = Vis.render({
                tag: 'td',
                cls: 'b-layout__cell',
                content: {
                    attrs: { style: 'width: 60px; height: 200px' },
                    cls: 'b-axis'
                }
            });
            var $c = $(c);
            $tr[method]($c);

            yAxis.$object = $('.b-axis', $c);
            yAxis.visObject = Vis(yAxis.$object, 'b-axis').update(pos, [
                { offset: 0, label: '0' },
                { offset: 100, label: '100' },
                { offset: 200, label: '200' },
                { offset: 300, label: '300' },
                { offset: 400, label: '400' },
                { offset: 500, label: '500' }
            ]);
        }
        layout.empty().append($tr);
    },

    renderObjects: function() {
        this.$object.html(Vis.render([
            {
                cls: 'b-chart__header',
                content: 'Header'
            },
            {
                tag: 'table',
                cls: 'b-9',
                content: [
                    {
                        tag: 'tr',
                        content: [
                            { tag: 'td', cls: 'b-9__tl', content: 'tl' },
                            { tag: 'td', cls: 'b-9__tc', content: 'tc' },
                            { tag: 'td', cls: 'b-9__tr', content: 'tr' }
                        ]
                    },
                    {
                        tag: 'tr',
                        content: [
                            {
                                tag: 'td',
                                cls: 'b-9__ml',
                                content: { tag: 'table', cls: 'b-layout' }
                            },
                            { tag: 'td', cls: 'b-9__mc', content: 'mc' },
                            {
                                tag: 'td',
                                cls: 'b-9__mr',
                                content: { tag: 'table', cls: 'b-layout' }
                            }
                        ]
                    },
                    {
                        tag: 'tr',
                        content: [
                            { tag: 'td', cls: 'b-9__bl', content: 'bl' },
                            { tag: 'td', cls: 'b-9__bc', content: 'bc' },
                            { tag: 'td', cls: 'b-9__br', content: 'br' }
                        ]
                    }
                ]
            }
        ]));

        this.renderYAxes('left', $('.b-9__ml .b-layout', this.$object), 'prepend');
        this.renderYAxes('right', $('.b-9__mr .b-layout', this.$object), 'append');
    }
});

})(Vis);
