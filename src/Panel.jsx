/**
 * Panel
 * ClassNames: panel, panel-[default,primary,success,info,warning,danger], panel-collapse, in, collapse, collapsing, clickable, panel-title, overflow
 * Dependencies: jQuery, Bootstrap(CSS)
 * Props: children :: an array of keyed li elements
 *        type :: a string of one of the following: default, primary, success, info, warning, danger
 *        header :: an element or string
 */
 (function (factory) {
    module.exports = exports = factory(
        require('react')
    );
 }(function (React) {
    var Panel = React.createClass({
        /***********************************
         * DEFINITIONS
         ***********************************/
        getDefaultProps: function () {
          return { header: null, type: 'default'  };
        },

        /***********************************
         * COMPONENT LIFECYCLE
         ***********************************/
        componentDidMount: function () {
          this.rememberHeight();
        },
        componentDidUpdate: function () {
          this.rememberHeight();
        },

        /***********************************
         * EVENT HANDLING
         ***********************************/
        rememberHeight: function () {
          var domPanel = $(this.refs.collapsible.getDOMNode());
          this.props.height = domPanel.height();
        },
        toggle: function () {

            var domPanel = $(this.refs.collapsible.getDOMNode());

            // abort if in transition
            if (domPanel.hasClass('collapsing')) {
                return;
            }

            if (domPanel.hasClass('in')) {
                // collapse panel
                domPanel.css('height', this.props.height + 'px')
                        .removeClass('collapse in')
                        .addClass('collapsing')
                        .attr('aria-expanded', false)['height'](0)
                        .css('height', '0');
                window.setTimeout(function() {
                    domPanel.removeClass('collapsing')
                            .addClass('collapse');
                }, 350);
            } else {
                // expand panel
                domPanel.css('height', '0')
                        .removeClass('collapse')
                        .addClass('collapsing')
                        .attr('aria-expanded', true)['height'](0)
                        .css('height', this.props.height + 'px')
                window.setTimeout(function() {
                    domPanel.removeClass('collapsing')
                            .addClass('collapse in')['height']('')
                            .css('height', null);
                }, 350);
            }
        },

        /***********************************
         * RENDERING
         ***********************************/
        render: function () {
            // props
            var children = this.props.children;
            var type = this.props.type;
            var header = this.props.header;

            return (
                <div className={'panel panel-' + type}>
                    <div className="panel-heading clickable" onClick={this.toggle}>
                        <h4 className="panel-title overflow">
                            {header}
                        </h4>
                    </div>
                    <div ref="collapsible" className="panel-collapse collapse">
                        {children}
                    </div>
                </div>
            );
        }
    });
    return Panel;
}));
